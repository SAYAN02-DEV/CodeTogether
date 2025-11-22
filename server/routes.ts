import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ethers } from "ethers";

// In-memory storage for projects (replace with DB in production)
const projects = new Map<string, {
  id: string;
  name: string;
  description?: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  owner?: string;
  ipfsCID?: string;
  collaborators: string[];
}>();

const ipfsProjects = new Map<string, {
  projectName: string;
  cid: string;
  walletAddress: string;
  signature: string;
  message: string;
  fileCount: number;
  createdAt: Date;
}>();

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const { name, description, language } = req.body;

      if (!name || !language) {
        return res.status(400).json({ error: "Name and language are required" });
      }

      const projectId = `proj-${Date.now()}`;
      const project = {
        id: projectId,
        name,
        description,
        language,
        createdAt: new Date(),
        updatedAt: new Date(),
        collaborators: [],
      };

      projects.set(projectId, project);

      res.json({
        success: true,
        project,
      });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const allProjects = Array.from(projects.values());
      res.json({ projects: allProjects });
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = projects.get(id);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ project });
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = projects.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Save project to IPFS
  app.post("/api/projects/ipfs", async (req, res) => {
    try {
      const { projectName, cid, walletAddress, signature, message, fileCount } = req.body;

      if (!projectName || !cid || !walletAddress || !signature || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Verify signature
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      // Store project metadata
      const projectId = `${walletAddress}-${Date.now()}`;
      ipfsProjects.set(projectId, {
        projectName,
        cid,
        walletAddress,
        signature,
        message,
        fileCount,
        createdAt: new Date(),
      });

      res.json({
        success: true,
        projectId,
        cid,
        url: `https://w3s.link/ipfs/${cid}`,
      });
    } catch (error) {
      console.error("Error saving IPFS project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get projects by wallet address
  app.get("/api/projects/wallet/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const projects = Array.from(ipfsProjects.entries())
        .filter(([_, project]) => project.walletAddress.toLowerCase() === address.toLowerCase())
        .map(([id, project]) => ({
          id,
          ...project,
        }));

      res.json({ projects });
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get project by CID
  app.get("/api/projects/ipfs/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const project = Array.from(ipfsProjects.values()).find(p => p.cid === cid);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ project });
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Verify access to project (wallet signature)
  app.post("/api/projects/verify-access", async (req, res) => {
    try {
      const { cid, walletAddress, signature, message } = req.body;

      if (!cid || !walletAddress || !signature || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Verify signature
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      // Check if user has access to this project
      const project = Array.from(ipfsProjects.values()).find(p => p.cid === cid);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // In a real app, you'd check if the wallet is in the allowed list
      const hasAccess = project.walletAddress.toLowerCase() === walletAddress.toLowerCase();

      res.json({
        hasAccess,
        project: hasAccess ? project : null,
      });
    } catch (error) {
      console.error("Error verifying access:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
