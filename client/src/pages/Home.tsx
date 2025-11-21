import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plus, Clock, Code, Settings, Search, MoreHorizontal, Folder, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const PROJECTS = [
  { id: 1, name: "Neural Network Visualizer", lang: "Python", updated: "2m ago", users: 3 },
  { id: 2, name: "E-commerce Microservices", lang: "TypeScript", updated: "1h ago", users: 5 },
  { id: 3, name: "Smart Contract Auditor", lang: "Solidity", updated: "4h ago", users: 2 },
  { id: 4, name: "Go Routine Scheduler", lang: "Go", updated: "1d ago", users: 1 },
  { id: 5, name: "Rust Game Engine", lang: "Rust", updated: "2d ago", users: 4 },
  { id: 6, name: "GraphQL Apollo Server", lang: "JavaScript", updated: "3d ago", users: 2 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border glass flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-primary font-bold font-display text-xl">
            <Code className="w-6 h-6" />
            <span>CodeSync</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
            <a href="#" className="hover:text-primary transition-colors">Teams</a>
            <a href="#" className="hover:text-primary transition-colors">Activity</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-9 w-64 bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:border-primary/50"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Settings className="w-5 h-5" />
          </Button>
          <Avatar className="h-8 w-8 border border-primary/20 ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your collaborative sessions and projects.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50">
              <Users className="w-4 h-4 mr-2" />
              Join Session
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Link href="/editor">
                <Card className="group cursor-pointer border-border/50 bg-card/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_5px_20px_-5px_rgba(6,182,212,0.15)]">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-md bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Folder className="w-5 h-5" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-lg font-display group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                      Live Session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground border-transparent">
                        {project.lang}
                      </Badge>
                      <span className="flex items-center gap-1 ml-auto text-xs">
                        <Clock className="w-3 h-3" />
                        {project.updated}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex -space-x-2">
                        {[...Array(project.users)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        Open Project →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
          
          {/* Create New Placeholder */}
          <motion.div variants={item}>
            <button className="w-full h-full min-h-[200px] rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">Create New Project</span>
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
