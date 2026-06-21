import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Shield, Sword, Gamepad2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetServerStatus, getGetServerStatusQueryKey } from "@workspace/api-client-react";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: serverStatus } = useGetServerStatus({ query: { queryKey: getGetServerStatusQueryKey() } });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/noticias", label: "Noticias" },
    { href: "/descargas", label: "Descargas" },
    { href: "/wiki", label: "Wiki" },
    { href: "/cuenta", label: "Cuenta" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-border/50 shadow-lg shadow-black/20 py-2" : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold font-serif tracking-widest text-glow bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">
                SAKURA
              </span>
              <span className="text-xs md:text-sm font-subheading tracking-[0.3em] text-foreground/80 uppercase -mt-1">
                Chronicles
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`text-sm uppercase tracking-wider font-subheading font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-foreground/80"}`}>
                  {link.label}
                </span>
              </Link>
            ))}
            
            <Link href="/estado">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/40 border border-white/5 cursor-pointer hover:bg-black/60 transition-colors">
                <div className={`w-2 h-2 rounded-full ${serverStatus?.online ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`} />
                <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                  {serverStatus?.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </Link>
            
            <Link href="/descargas" className="hidden lg:block">
              <span className="px-6 py-2.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-serif uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(232,130,156,0.15)] hover:shadow-[0_0_25px_rgba(232,130,156,0.4)] relative overflow-hidden group">
                <span className="relative z-10">Jugar Ahora</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl py-6 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <span className={`text-lg font-serif tracking-widest uppercase block border-b border-white/5 pb-4 ${location === link.href ? "text-primary" : "text-foreground"}`}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/estado" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className={`w-3 h-3 rounded-full ${serverStatus?.online ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`} />
                <span className="font-serif uppercase tracking-widest text-foreground">Estado del Servidor</span>
              </div>
            </Link>
            <Link href="/descargas" onClick={() => setMobileMenuOpen(false)}>
              <span className="w-full py-3 bg-primary text-primary-foreground text-center font-serif uppercase tracking-widest block mt-2">
                Jugar Ahora
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
