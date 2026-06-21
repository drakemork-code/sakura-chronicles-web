import { useGetNewsArticle, getGetNewsArticleQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export default function NewsDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  
  const { data: article, isLoading } = useGetNewsArticle(id, { 
    query: { 
      queryKey: getGetNewsArticleQueryKey(id),
      enabled: !!id 
    } 
  });

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24 min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-4xl animate-pulse">
          <div className="h-8 bg-card/50 w-32 mb-8"></div>
          <div className="h-16 bg-card/50 w-3/4 mb-6"></div>
          <div className="h-96 bg-card/50 w-full mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-card/50 w-full"></div>
            <div className="h-4 bg-card/50 w-full"></div>
            <div className="h-4 bg-card/50 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full pt-48 pb-24 min-h-screen bg-background flex flex-col items-center text-center">
        <h1 className="text-4xl font-serif text-white mb-4">Artículo no encontrado</h1>
        <Link href="/noticias">
          <span className="text-primary hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={16} /> Volver a Noticias
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-background relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-background pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <Link href="/noticias">
          <span className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 mb-8 text-sm uppercase tracking-widest font-mono cursor-pointer w-fit">
            <ArrowLeft size={14} /> Todas las noticias
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-xs font-mono uppercase tracking-widest text-primary">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 bg-secondary/20 border border-secondary/30 text-xs font-mono uppercase tracking-widest text-secondary">
                Destacado
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-muted-foreground mb-12 border-y border-white/5 py-4">
            <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {new Date(article.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-2"><User size={14} className="text-secondary" /> {article.author}</span>
          </div>

          {(article.imageUrl || true) && (
            <div className="w-full aspect-[21/9] mb-12 border border-white/10 relative overflow-hidden shadow-2xl">
              <img src={article.imageUrl || "/images/hero-bg.png"} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-p:text-muted-foreground prose-p:font-sans prose-a:text-primary hover:prose-a:text-secondary">
            {/* Si el contenido viene con HTML, usar dangerouslySetInnerHTML. Asumiendo texto plano o markdown simple por ahora */}
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
