import { useListWikiEntries, getListWikiEntriesQueryKey, useGetWikiEntry, getGetWikiEntryQueryKey } from "@workspace/api-client-react";
import { useParams, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, Sword, Hammer, Skull, Mountain, Package } from "lucide-react";

const CATEGORIES = [
  { id: 'weapons', name: 'Armas', icon: Sword, image: '/images/wiki-weapons.png' },
  { id: 'professions', name: 'Profesiones', icon: Hammer, image: '/images/wiki-professions.png' },
  { id: 'bosses', name: 'Jefes', icon: Skull, image: '/images/wiki-bosses.png' },
  { id: 'dungeons', name: 'Zonas', icon: Mountain, image: '/images/wiki-dungeons.png' },
] as const;

export default function Wiki() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const category = params.category as any;
  const slug = params.slug;

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-background relative flex">
      {/* Sidebar Nav */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-white/5 min-h-[calc(100vh-8rem)] pl-4 pr-6">
        <div className="sticky top-32">
          <Link href="/wiki" className="flex items-center gap-3 text-xl font-serif text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
            <BookOpen className="text-secondary" /> El Códice
          </Link>
          <nav className="space-y-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = category === cat.id;
              return (
                <Link key={cat.id} href={`/wiki/${cat.id}`} className={`flex items-center gap-3 p-3 transition-colors ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}>
                  <Icon size={18} />
                  <span className="font-serif uppercase tracking-wider text-sm">{cat.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 px-4 lg:px-12 w-full max-w-5xl">
        {/* Mobile Nav dropdown */}
        <div className="lg:hidden mb-8">
          <select
            className="w-full bg-card border border-white/10 text-white p-3 font-serif uppercase tracking-widest"
            value={category || ""}
            onChange={(e) => setLocation(e.target.value ? `/wiki/${e.target.value}` : '/wiki')}
          >
            <option value="">Categorías del Códice</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <AnimatePresence mode="wait">
          {!category ? (
            <WikiHome key="home" />
          ) : !slug ? (
            <WikiCategoryList key={`cat-${category}`} category={category} />
          ) : (
            <WikiEntryDetail key={`entry-${slug}`} category={category} slug={slug} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function WikiHome() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-4">Códice de Sakura</h1>
      <p className="text-muted-foreground font-subheading text-lg mb-12">
        La guía completa del mundo: armas, profesiones de crafteo, jefes para farmear y zonas de grindeo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <Link key={cat.id} href={`/wiki/${cat.id}`}>
              <div className="group relative h-48 overflow-hidden border border-white/10 cursor-pointer">
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <Icon className="text-secondary" size={24} />
                  <h3 className="text-2xl font-serif text-white uppercase tracking-widest">{cat.name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

function WikiCategoryList({ category }: { category: 'weapons' | 'professions' | 'bosses' | 'dungeons' }) {
  const { data: entries, isLoading } = useListWikiEntries(category, { query: { queryKey: getListWikiEntriesQueryKey(category) } });
  const catInfo = CATEGORIES.find(c => c.id === category);

  if (isLoading) return <div className="animate-pulse h-96 bg-card/50"></div>;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
        <Link href="/wiki"><span className="text-muted-foreground hover:text-white font-mono uppercase text-xs cursor-pointer tracking-widest">Códice</span></Link>
        <ChevronRight size={14} className="text-muted-foreground" />
        <span className="text-primary font-mono uppercase text-xs tracking-widest">{catInfo?.name}</span>
      </div>

      <h1 className="text-4xl font-serif text-white tracking-widest mb-8 uppercase">{catInfo?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries?.map(entry => (
          <Link key={entry.id} href={`/wiki/${category}/${entry.slug}`}>
            <div className="bg-card border border-white/5 hover:border-primary/50 p-4 flex gap-4 cursor-pointer group transition-colors">
              <div className="w-16 h-16 bg-black border border-white/10 shrink-0 overflow-hidden">
                {entry.imageUrl ? (
                  <img src={entry.imageUrl} alt={entry.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/10"><Package size={20} className="text-secondary" /></div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-serif text-white group-hover:text-primary transition-colors">{entry.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{entry.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function WikiEntryDetail({ category, slug }: { category: string; slug: string }) {
  const { data: entry, isLoading } = useGetWikiEntry(category, slug, { query: { queryKey: getGetWikiEntryQueryKey(category, slug) } });
  const catInfo = CATEGORIES.find(c => c.id === category);

  if (isLoading) return <div className="animate-pulse h-96 bg-card/50"></div>;
  if (!entry) return <div className="text-white">Entrada no encontrada.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
        <Link href="/wiki"><span className="text-muted-foreground hover:text-white font-mono uppercase text-xs cursor-pointer tracking-widest">Códice</span></Link>
        <ChevronRight size={14} className="text-muted-foreground" />
        <Link href={`/wiki/${category}`}><span className="text-muted-foreground hover:text-white font-mono uppercase text-xs cursor-pointer tracking-widest">{catInfo?.name}</span></Link>
        <ChevronRight size={14} className="text-muted-foreground" />
        <span className="text-secondary font-mono uppercase text-xs tracking-widest">{entry.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3 shrink-0">
          <div className="aspect-[3/4] border border-secondary/30 relative p-2 bg-card">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-secondary"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-secondary"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-secondary"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-secondary"></div>
            <div className="w-full h-full bg-black overflow-hidden relative">
              <img src={entry.imageUrl || "/images/hero-bg.png"} alt={entry.name} className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-6">{entry.name}</h1>
          <p className="text-lg text-muted-foreground font-subheading mb-8">{entry.description}</p>

          {entry.attributes && Object.keys(entry.attributes).length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest font-serif text-primary border-b border-white/10 pb-2 mb-4">Estadísticas</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {Object.entries(entry.attributes).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-muted-foreground font-mono text-xs uppercase">{key}</span>
                    <span className="text-white font-mono text-sm">{val as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {entry.lore && (
        <div className="bg-card/30 border border-white/5 p-6 md:p-8 relative">
          <h3 className="text-sm uppercase tracking-widest font-serif text-secondary mb-4 flex items-center gap-2">
            <BookOpen size={16} /> Trasfondo
          </h3>
          <div className="prose prose-invert prose-p:font-subheading prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
            {entry.lore.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      )}
    </motion.div>
  );
}
