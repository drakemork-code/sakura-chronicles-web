import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black/90 border-t border-border/40 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex flex-col mb-6 inline-block w-fit">
              <span className="text-2xl font-bold font-serif tracking-widest text-glow bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                SAKURA
              </span>
              <span className="text-sm font-subheading tracking-[0.3em] text-foreground/80 uppercase -mt-1">
                Chronicles
              </span>
            </Link>
            <p className="text-muted-foreground font-sans text-sm max-w-md leading-relaxed">
              MMORPG 2D pixel art de grindeo libre. Sin clases, sin misiones — solo farmeo, crafteo y la economía que tú y los demás jugadores construyen juntos. Disponible en PC, Android e iOS.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-2 inline-block">Navegación</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li><Link href="/noticias"><span className="text-muted-foreground hover:text-primary transition-colors">Noticias</span></Link></li>
              <li><Link href="/descargas"><span className="text-muted-foreground hover:text-primary transition-colors">Descargas</span></Link></li>
              <li><Link href="/wiki"><span className="text-muted-foreground hover:text-primary transition-colors">Wiki del Juego</span></Link></li>
              <li><Link href="/cuenta"><span className="text-muted-foreground hover:text-primary transition-colors">Gestión de Cuenta</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-2 inline-block">Comunidad</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary/50 rounded-full"></span>Discord Oficial</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary/50 rounded-full"></span>Facebook</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary/50 rounded-full"></span>Términos y Condiciones</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary/50 rounded-full"></span>Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60 font-sans">
            &copy; {new Date().getFullYear()} Sakura Chronicles. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-mono">2D Pixel Art MMORPG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
