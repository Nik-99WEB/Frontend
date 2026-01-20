export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* BRAND */}
        <div className="space-y-3">
          <div className="font-bold text-lg">CA Monk</div>
          <p className="text-muted-foreground">
            Empowering the next generation of financial leaders with tools,
            community, and knowledge.
          </p>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Blog</li>
            <li>Webinars</li>
            <li>Case Studies</li>
          </ul>
        </div>

        {/* PLATFORM */}
        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Job Board</li>
            <li>Practice Tests</li>
            <li>Mentorship</li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center text-xs text-muted-foreground py-4">
        © 2024 CA Monk. All rights reserved.
      </div>
    </footer>
  );
}
