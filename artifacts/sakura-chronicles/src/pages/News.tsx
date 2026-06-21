import { useListNews, getListNewsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function News() {
  const { data: news, isLoading } = useListNews(undefined, { query: { queryKey: getListNewsQueryKey() } });

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest mb-4 text-glow">Noticias</h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl text-center font-subheading text-lg">
            Mantente al día con las últimas actualizaciones, parches y eventos de Sakura Chronicles.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-card/50 h-96 border border-white/5 rounded-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news?.map((article, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                key={article.id} 
                className="bg-card border border-card-border/30 hover:border-secondary/60 flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={article.imageUrl || `/images/screenshot-${(idx % 4) + 1}.png`} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono uppercase tracking-widest text-primary">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(article.publishedAt).toLocaleDateString('es-ES')}</span>
                    <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-secondary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground/80 mb-8 line-clamp-3 flex-1">
                    {article.summary}
                  </p>
                  <Link href={`/noticias/${article.id}`}>
                    <span className="text-xs uppercase font-serif tracking-widest font-bold text-primary group-hover:text-white transition-colors flex items-center gap-2 mt-auto cursor-pointer">
                      Leer Artículo <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
