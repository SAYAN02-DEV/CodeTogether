import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Code2, Cpu } from "lucide-react";
import bgImage from "@assets/generated_images/dark_abstract_cyberpunk_digital_grid_background_with_neon_accents.png";

export default function Auth() {
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-10" />
        <img 
          src={bgImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-20 w-full max-w-md px-4"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 bg-card/50 backdrop-blur-md px-6 py-3 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Terminal className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              CodeSync
            </span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-card/50 backdrop-blur-sm border border-border">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-display">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access the mainframe.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="dev@codesync.io" className="bg-background/50 border-primary/20 focus-visible:ring-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" className="bg-background/50 border-primary/20 focus-visible:ring-primary/50" />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:scale-[1.02]" 
                    disabled={isLoading}
                  >
                    {isLoading ? <Cpu className="w-4 h-4 animate-spin mr-2" /> : <Code2 className="w-4 h-4 mr-2" />}
                    {isLoading ? "Authenticating..." : "Initialize Session"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-xs text-muted-foreground">System v2.4.0 // Secure Connection</p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-display">New User Protocol</CardTitle>
                <CardDescription>Create an account to join the network.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="neo_dev" className="bg-background/50 border-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" placeholder="dev@codesync.io" className="bg-background/50 border-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password" className="bg-background/50 border-primary/20" />
                  </div>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
