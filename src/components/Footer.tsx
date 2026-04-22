import { Link } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gradient-hero)] text-primary-foreground">
              <Heart className="h-5 w-5" fill="currentColor" />
            </span>
          
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Қайырымдылықты ашық, жылдам және қолжетімді ететін цифрлық платформа.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Платформа</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">Жоба туралы</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Көмек түрлері</Link></li>
            <li><Link to="/map" className="hover:text-primary">Карта</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Қатысу</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/request" className="hover:text-primary">Көмек сұрау</Link></li>
            <li><Link to="/volunteer" className="hover:text-primary">Ерікті болу</Link></li>
            <li><Link to="/requests" className="hover:text-primary">Өтінімдер</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Байланыс</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Байланыс</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Алматы қ., Достық д-лы 124</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +7 (727) 350-00-00</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@charityconnect.kz</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© 2026 Барлық құқықтар қорғалған.</p>
          <p>Қазақстанда жасалған 🇰🇿</p>
        </div>
      </div>
    </footer>
  );
}
