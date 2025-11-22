import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
  onClick?: () => void;
}

export function UserAvatar({ 
  src = "https://github.com/shadcn.png", 
  fallback = "CN",
  className = "h-8 w-8 border border-primary/20 ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer",
  onClick
}: UserAvatarProps) {
  return (
    <Avatar className={className} onClick={onClick}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
