import { useListDownloads, getListDownloadsQueryKey, useGetLatestRelease, getGetLatestReleaseQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Download, Monitor, Smartphone, Apple, ArrowDownToLine, History } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Downloads() {
  const { data: latestRelease } = useGetLatestRelease({ query: { queryKey: getGetLatestReleaseQueryKey() } });
  const { data: allReleases } = useListDownloads({ query: { queryKey: getListDownloadsQueryKey() } });

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest mb-4 text-glow">Descargas</h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl font-subheading text-lg">
            Elige tu plataforma y únete a miles de jugadores en el mundo de Sakura Chronicles.
          </p>
        </div>

        {latestRelease && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto bg-card border border-primary/30 p-8 md:p-12 shadow-[0_0_50px_rgba(232,130,156,0.1)] mb-24 relative"
          >
            {/* Corner decors */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary"></div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-8 border-b border-white/5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-mono uppercase tracking-widest border border-primary/30">
                    Última Versión
                  </span>
                  <span className="text-white font-mono">{latestRelease.version}</span>
                </div>
                <p className="text-sm text-muted-foreground font-sans">
                  Publicado: {new Date(latestRelease.releasedAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex gap-2">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs uppercase font-mono tracking-widest text-green-500">Servidores Activos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={latestRelease.downloadUrlWindows || "#"} className="group bg-background border border-white/10 hover:border-secondary/50 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Monitor className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">PC Windows</h3>
                <p className="text-xs text-muted-foreground font-mono mb-6">{latestRelease.sizeWindows || "12.4 GB"}</p>
                <span className="w-full py-3 bg-secondary/10 text-secondary border border-secondary/30 uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-secondary group-hover:text-black transition-colors">
                  <Download size={14} /> Descargar .exe
                </span>
              </a>

              <a href={latestRelease.downloadUrlAndroid || "#"} className="group bg-background border border-white/10 hover:border-primary/50 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">Android</h3>
                <p className="text-xs text-muted-foreground font-mono mb-6">{latestRelease.sizeAndroid || "3.2 GB"}</p>
                <span className="w-full py-3 bg-primary/10 text-primary border border-primary/30 uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-black transition-colors">
                  <Download size={14} /> Descargar .apk
                </span>
              </a>

              <a href={latestRelease.downloadUrlIos || "#"} className="group bg-background border border-white/10 hover:border-white/50 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">iOS</h3>
                <p className="text-xs text-muted-foreground font-mono mb-6">{latestRelease.sizeIos || "3.1 GB"}</p>
                <span className="w-full py-3 bg-white/5 text-white border border-white/20 uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black transition-colors">
                  <Download size={14} /> App Store
                </span>
              </a>
            </div>
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <History className="text-secondary" />
            <h2 className="text-2xl font-serif text-white uppercase tracking-widest">Historial de Versiones</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {allReleases?.map((release, idx) => (
              <AccordionItem key={release.id} value={`item-${release.id}`} className="border-white/10 bg-card/30 mb-4 px-4 border">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-primary font-bold text-lg">{release.version}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">{new Date(release.releasedAt).toLocaleDateString('es-ES')}</span>
                    {release.isLatest && (
                      <span className="ml-2 px-2 py-0.5 bg-secondary/20 text-secondary text-[10px] font-mono border border-secondary/30 uppercase">Actual</span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="pl-4 border-l border-white/10 ml-2">
                    <h4 className="text-sm text-white uppercase tracking-widest font-serif mb-4">Notas del Parche</h4>
                    <ul className="space-y-2">
                      {release.changelog.map((log, i) => (
                        <li key={i} className="text-muted-foreground text-sm font-sans flex items-start gap-2">
                          <span className="text-primary mt-1 text-xs">◆</span> {log}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
