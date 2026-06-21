import { useGetServerStatus, getGetServerStatusQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Server, Activity, Users, Globe, Clock, RefreshCw } from "lucide-react";

export default function ServerStatus() {
  const { data: status, isLoading, refetch, isRefetching } = useGetServerStatus({ 
    query: { 
      queryKey: getGetServerStatusQueryKey(),
      refetchInterval: 30000 // Auto refresh every 30s
    } 
  });

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Magical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/30">
            <Server className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-4">Estado de los Reinos</h1>
          <p className="text-muted-foreground font-subheading text-lg">Monitoreo en tiempo real de la infraestructura del juego.</p>
        </div>

        {isLoading ? (
          <div className="h-64 bg-card/50 border border-white/5 rounded-sm animate-pulse w-full"></div>
        ) : status ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-white/10 relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${status.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 pb-8 border-b border-white/5">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full ${status.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className={`absolute inset-0 rounded-full animate-ping ${status.online ? 'bg-green-500' : 'bg-red-500'} opacity-50`}></div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-white uppercase tracking-widest">Reino Principal</h2>
                    <p className="text-sm font-mono text-muted-foreground uppercase mt-1">ID: SAKURA-EU-01</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => refetch()} 
                  disabled={isRefetching}
                  className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors text-sm font-mono uppercase tracking-widest text-muted-foreground disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isRefetching ? "animate-spin" : ""} /> 
                  Actualizar
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-muted-foreground">
                    <Activity size={14} className="text-primary" /> Estado
                  </span>
                  <span className={`text-xl font-bold font-serif ${status.online ? 'text-green-500' : 'text-red-500'}`}>
                    {status.online ? 'EN LÍNEA' : 'FUERA DE LÍNEA'}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-muted-foreground">
                    <Users size={14} className="text-secondary" /> Jugadores
                  </span>
                  <span className="text-xl font-bold font-serif text-white">
                    {status.players.toLocaleString()} <span className="text-sm text-muted-foreground">/ {status.maxPlayers?.toLocaleString() || "10,000"}</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-muted-foreground">
                    <Globe size={14} className="text-blue-400" /> Latencia
                  </span>
                  <span className="text-xl font-bold font-serif text-white">
                    {status.ping} <span className="text-sm text-muted-foreground">ms</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-muted-foreground">
                    <Clock size={14} className="text-purple-400" /> Uptime
                  </span>
                  <span className="text-xl font-bold font-serif text-white">
                    {status.uptime}
                  </span>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono text-muted-foreground">
                <span>Región: {status.region}</span>
                <span>Última actualización: {new Date(status.lastUpdated).toLocaleTimeString('es-ES')}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
