import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
            CA
          </span>
          <span>CA Monk</span>
        </div>

        {/* CENTER: NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a className="hover:text-foreground cursor-pointer">Tools</a>
          <a className="hover:text-foreground cursor-pointer">Practice</a>
          <a className="hover:text-foreground cursor-pointer">Events</a>
          <a className="hover:text-foreground cursor-pointer">Job Board</a>
          <a className="hover:text-foreground cursor-pointer">Points</a>
        </nav>

        {/* RIGHT: PROFILE */}
        <Button size="sm">Profile</Button>
      </div>
    </header>
  );
}
