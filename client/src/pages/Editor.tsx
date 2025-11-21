import { useState } from "react";
import { Link } from "wouter";
import { 
  Code2, 
  Share2, 
  Play, 
  Save, 
  Settings, 
  Menu, 
  FileCode2, 
  FolderOpen, 
  Search, 
  GitBranch, 
  MoreVertical, 
  Terminal as TerminalIcon, 
  X, 
  ChevronRight, 
  ChevronDown,
  Users,
  MessageSquare
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/CodeEditor";

const FILES = [
  { id: "1", name: "src", type: "folder", isOpen: true, children: [
    { id: "2", name: "App.tsx", type: "file", lang: "typescript" },
    { id: "3", name: "index.css", type: "file", lang: "css" },
    { id: "4", name: "main.tsx", type: "file", lang: "typescript" },
    { id: "5", name: "components", type: "folder", isOpen: false, children: [
      { id: "6", name: "Header.tsx", type: "file", lang: "typescript" },
      { id: "7", name: "Footer.tsx", type: "file", lang: "typescript" },
    ]},
  ]},
  { id: "8", name: "package.json", type: "file", lang: "json" },
  { id: "9", name: "vite.config.ts", type: "file", lang: "typescript" },
  { id: "10", name: "README.md", type: "file", lang: "markdown" },
];

const INITIAL_CODE = `import React from 'react';
import { useState } from 'react';

// This is a collaborative snippet
// Changes are synced in real-time via WebSockets

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 rounded-lg bg-card border border-border">
      <h2 className="text-xl font-bold mb-4">Counter: {count}</h2>
      <div className="flex gap-2">
        <button 
          onClick={() => setCount(c => c - 1)}
          className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80"
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
`;

export default function Editor() {
  const [activeFile, setActiveFile] = useState("App.tsx");
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const FileTreeItem = ({ item, depth = 0 }: { item: any, depth?: number }) => {
    const [isOpen, setIsOpen] = useState(item.isOpen || false);
    
    if (item.type === "folder") {
      return (
        <div>
          <div 
            className={`flex items-center gap-1 px-2 py-1 hover:bg-secondary/50 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <FolderOpen className="w-4 h-4 text-blue-400" />
            <span>{item.name}</span>
          </div>
          {isOpen && item.children?.map((child: any) => (
            <FileTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      );
    }

    return (
      <div 
        className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm transition-colors ${activeFile === item.name ? "bg-primary/10 text-primary border-l-2 border-primary" : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground border-l-2 border-transparent"}`}
        style={{ paddingLeft: `${depth * 12 + 20}px` }}
        onClick={() => setActiveFile(item.name)}
      >
        <FileCode2 className="w-4 h-4 opacity-70" />
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-card/50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 text-primary font-bold font-display hover:opacity-80 cursor-pointer transition-opacity">
              <Code2 className="w-5 h-5" />
              <span>CodeSync</span>
            </div>
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>my-awesome-project</span>
            <span className="text-border">/</span>
            <span className="text-foreground">{activeFile}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            <Avatar className="h-7 w-7 border-2 border-background">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-7 w-7 border-2 border-background">
              <AvatarFallback className="bg-purple-600 text-xs text-white">JD</AvatarFallback>
            </Avatar>
            <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground font-bold">
              +3
            </div>
          </div>
          
          <Button size="sm" variant="outline" className="h-8 gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary">
            <Play className="w-3 h-3" />
            Run
          </Button>
          <Button size="sm" className="h-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <Share2 className="w-3 h-3" />
            Share
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
          <Avatar className="h-8 w-8 ml-2 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          
          {/* Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar border-r border-border">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border/50">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Explorer</span>
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </div>
              <ScrollArea className="flex-1 py-2">
                {FILES.map(file => (
                  <FileTreeItem key={file.id} item={file} />
                ))}
              </ScrollArea>
              
              {/* Sidebar Footer */}
              <div className="p-2 border-t border-border/50">
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="sm" className="justify-start gap-2 h-8 text-muted-foreground">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start gap-2 h-8 text-muted-foreground">
                    <GitBranch className="w-4 h-4" />
                    Source Control
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle />

          {/* Editor Area */}
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              
              {/* Code Editor */}
              <ResizablePanel defaultSize={70}>
                <div className="h-full flex flex-col">
                  {/* Tab Bar */}
                  <div className="flex items-center bg-card border-b border-border/50">
                    <div className="flex">
                      <div className="flex items-center gap-2 px-4 py-2 bg-background border-r border-border/50 border-t-2 border-t-primary text-sm font-medium min-w-[120px]">
                        <FileCode2 className="w-4 h-4 text-blue-400" />
                        {activeFile}
                        <X className="w-3 h-3 ml-auto text-muted-foreground hover:text-foreground cursor-pointer" />
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/20 text-sm text-muted-foreground cursor-pointer min-w-[120px] border-r border-border/50">
                        <FileCode2 className="w-4 h-4 text-yellow-400" />
                        index.css
                      </div>
                    </div>
                  </div>
                  
                  {/* Editor Content */}
                  <div className="flex-1 bg-[#0f172a] relative">
                    <CodeEditor initialCode={INITIAL_CODE} language="javascript" />
                    
                    {/* Floating Action Button for Chat/Collab */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-3">
                      <div className="relative group">
                        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Chat with team
                        </div>
                        <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
                          <MessageSquare className="w-5 h-5" />
                        </Button>
                        <span className="absolute top-0 right-0 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Terminal/Bottom Panel */}
              <ResizablePanel defaultSize={30} minSize={10} collapsible={true} collapsedSize={4} onCollapse={() => setIsTerminalOpen(false)} onExpand={() => setIsTerminalOpen(true)}>
                <div className="h-full flex flex-col bg-card border-t border-border">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/50">
                    <div className="flex items-center gap-6">
                      <button className="text-xs font-medium border-b-2 border-primary pb-[10px] -mb-[11px] text-foreground">TERMINAL</button>
                      <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">OUTPUT</button>
                      <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">PROBLEMS</button>
                      <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">DEBUG CONSOLE</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs text-muted-foreground overflow-auto bg-[#0c0a09]">
                    <div className="flex gap-2">
                      <span className="text-green-500">➜</span>
                      <span className="text-blue-400">~/project</span>
                      <span className="text-foreground">npm run dev</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-500">  VITE v5.0.0</span>
                      <span className="text-green-500">  ready in 345 ms</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-foreground">  ➜  </span>
                      <span className="text-foreground font-bold">Local:</span>
                      <span className="text-blue-400">   http://localhost:5173/</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-foreground">  ➜  </span>
                      <span className="text-foreground font-bold">Network:</span>
                      <span className="text-muted-foreground"> use --host to expose</span>
                    </div>
                    <div className="mt-4 flex gap-2 items-center animate-pulse">
                      <span className="text-green-500">➜</span>
                      <span className="text-blue-400">~/project</span>
                      <div className="w-2 h-4 bg-gray-500"></div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      {/* Status Bar */}
      <footer className="h-6 bg-primary text-primary-foreground flex items-center justify-between px-3 text-[10px] select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
          <div className="flex items-center gap-1">
            <X className="w-3 h-3 rounded-full bg-red-500/20 p-[1px]" />
            <span>0 errors</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-200">!</span>
            <span>0 warnings</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 12, Col 34</span>
          <span>UTF-8</span>
          <span>TypeScript React</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
