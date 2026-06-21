import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListNews, getListNewsQueryKey, useGetServerStatus, getGetServerStatusQueryKey } from "@workspace/api-client-react";
import { ArrowRight, Download, Monitor, Smartphone, Tablet } from "lucide-react";

export default function Home() {
  const { data: news } = useListNews({ limit: 3 }, { query: { queryKey: getListNewsQueryKey({ limit: 3 }) } });
  const { data: serverStatus } = useGetServerStatus({ query: { queryKey: getGetServerStatusQueryKey() } });

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const screenshots = [
    "/images/screenshot-1.png",
    "/images/screenshot-2.png",
    "/images/screenshot-3.png",
    "/images/screenshot-4.png",
  ];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-0"></div>
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        {/* Floating Server Badge */}
        {serverStatus && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-24 right-4 md:right-8 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-secondary/20 px-4 py-2 rounded-sm"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${serverStatus.online ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest">{serverStatus.region}</span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">{serverStatus.players.toLocaleString()} Jugadores</span>
            </div>
          </motion.div>
        )}

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-serif tracking-widest text-glow bg-gradient-to-br from-white via-white to-secondary/80 bg-clip-text text-transparent drop-shadow-2xl">
              SAKURA
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-[0.4em] text-primary mt-2 drop-shadow-lg">
              CHRONICLES
            </h2>
          </motion.div>

          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl font-subheading text-foreground/90 max-w-3xl mb-12 drop-shadow-lg font-light tracking-wide"
          >
            Farmea, craftea y conquista. Un MMORPG 2D pixel art sin clases ni límites.
          </motion.p>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center"
          >
            <Link href="/descargas">
              <span className="px-10 py-4 bg-primary text-primary-foreground font-serif uppercase tracking-widest text-lg font-bold shadow-[0_0_30px_rgba(232,130,156,0.3)] hover:shadow-[0_0_50px_rgba(232,130,156,0.6)] hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-1 block w-full sm:w-auto text-center cursor-pointer">
                Jugar Ahora
              </span>
            </Link>
            
            <div className="flex gap-3">
              <Link href="/descargas" className="p-4 border border-white/20 bg-black/40 backdrop-blur-sm text-white hover:bg-secondary/20 hover:border-secondary/50 transition-all duration-300 group">
                <Monitor className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="/descargas" className="p-4 border border-white/20 bg-black/40 backdrop-blur-sm text-white hover:bg-secondary/20 hover:border-secondary/50 transition-all duration-300 group">
                <Smartphone className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-xs uppercase tracking-widest font-mono">Descubrir</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* TRAILER SECTION */}
      <section className="py-24 md:py-32 relative bg-background border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-widest mb-4">Míralo en Acción</h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          
          <div className="max-w-5xl mx-auto aspect-video w-full bg-black/80 border border-white/10 p-2 md:p-4 shadow-2xl relative group">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/60"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/60"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/60"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/60"></div>
            
            <div className="w-full h-full relative overflow-hidden bg-muted flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40 blur-sm"></div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
              <button className="relative z-10 w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center pl-2 shadow-[0_0_30px_rgba(232,130,156,0.6)] group-hover:scale-110 transition-transform duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-widest mb-4">Un Mundo Vivo</h2>
              <p className="font-subheading text-muted-foreground text-lg max-w-2xl">
                Farmea recursos, craftea tu propio equipo y grindea jefes con cientos de jugadores en un mundo 2D pixel art sin clases ni misiones. Tu progreso depende de tus decisiones, no de una historia scripted.
              </p>
            </div>
            <Link href="/wiki">
              <span className="flex items-center gap-2 text-secondary hover:text-white uppercase tracking-widest text-sm font-bold font-serif transition-colors">
                Ver el Códice <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {screenshots.map((src, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                key={idx} 
                className="relative aspect-video group cursor-pointer"
              >
                {/* Custom Sakura Petal Frame effect using CSS clip-path simulation or borders */}
                <div className="absolute inset-0 bg-secondary/20 scale-[1.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                <div className="w-full h-full border border-white/10 group-hover:border-secondary/50 transition-colors duration-500 overflow-hidden relative">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                  
                  <img src={src} alt={`Screenshot ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS SECTION */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-widest mb-4">Últimas Crónicas</h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news?.map((article, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                key={article.id} 
                className="bg-card border border-card-border/30 hover:border-secondary/60 flex flex-col group transition-colors duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                  <img 
                    src={article.imageUrl || `/images/screenshot-${(idx % 4) + 1}.png`} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono uppercase tracking-widest text-primary">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <time className="text-xs font-mono text-muted-foreground mb-3">{new Date(article.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground/80 mb-8 line-clamp-3 flex-1">
                    {article.summary}
                  </p>
                  <Link href={`/noticias/${article.id}`}>
                    <span className="text-xs uppercase font-serif tracking-widest font-bold text-primary group-hover:text-white transition-colors flex items-center gap-2 mt-auto">
                      Leer Más <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link href="/noticias">
              <span className="px-8 py-3 border border-white/20 text-white font-serif uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Ver Todas las Noticias
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
