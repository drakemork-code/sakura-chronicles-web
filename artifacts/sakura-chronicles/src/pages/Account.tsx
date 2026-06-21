import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister, useLogin, useRequestPasswordRecovery } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

const recoverSchema = z.object({
  email: z.string().email("Email inválido"),
});

type TabState = "login" | "register" | "recover";

export default function Account() {
  const [activeTab, setActiveTab] = useState<TabState>("login");
  const { toast } = useToast();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const recoverMutation = useRequestPasswordRecovery();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const recoverForm = useForm<z.infer<typeof recoverSchema>>({
    resolver: zodResolver(recoverSchema),
    defaultValues: { email: "" },
  });

  const onLogin = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data }, {
      onSuccess: (res) => {
        toast({ title: "Acceso concedido", description: `Bienvenido de nuevo, ${res.username}` });
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error de acceso", description: "Credenciales incorrectas" });
      }
    });
  };

  const onRegister = (data: z.infer<typeof registerSchema>) => {
    registerMutation.mutate({ data }, {
      onSuccess: (res) => {
        toast({ title: "Cuenta creada", description: `Bienvenido a Sakura Chronicles, ${res.username}` });
        setActiveTab("login");
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "No se pudo crear la cuenta" });
      }
    });
  };

  const onRecover = (data: z.infer<typeof recoverSchema>) => {
    recoverMutation.mutate({ data }, {
      onSuccess: (res) => {
        toast({ title: "Correo enviado", description: res.message });
        setActiveTab("login");
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "No se pudo procesar la solicitud" });
      }
    });
  };

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-background relative flex items-center justify-center">
      {/* Background artwork */}
      <div className="absolute inset-0 bg-[url('/images/screenshot-3.png')] bg-cover bg-center opacity-10 blur-sm pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background pointer-events-none"></div>

      <div className="w-full max-w-md px-4 relative z-10">
        <div className="bg-card border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-secondary"></div>
          
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif text-white tracking-widest mb-2">Portal del Héroe</h1>
              <p className="text-muted-foreground text-sm font-subheading">Gestiona tu legado en Sakura Chronicles</p>
            </div>

            <div className="flex border-b border-white/10 mb-8">
              <button 
                className={`flex-1 pb-3 text-sm font-serif uppercase tracking-widest transition-colors relative ${activeTab === 'login' ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
                onClick={() => setActiveTab('login')}
              >
                Ingresar
                {activeTab === 'login' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
              </button>
              <button 
                className={`flex-1 pb-3 text-sm font-serif uppercase tracking-widest transition-colors relative ${activeTab === 'register' ? 'text-secondary' : 'text-muted-foreground hover:text-white'}`}
                onClick={() => setActiveTab('register')}
              >
                Registrar
                {activeTab === 'register' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary" />}
              </button>
            </div>

            {activeTab === 'login' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="tu@email.com" {...field} className="bg-background/50 border-white/10 focus-visible:border-primary text-white" />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Contraseña</FormLabel>
                            <button type="button" onClick={() => setActiveTab('recover')} className="text-[10px] text-primary hover:underline">¿Olvidaste tu contraseña?</button>
                          </div>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-white/10 focus-visible:border-primary text-white" />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <button 
                      type="submit" 
                      disabled={loginMutation.isPending}
                      className="w-full py-3 bg-primary text-primary-foreground font-serif uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                    >
                      {loginMutation.isPending ? "Conectando..." : "Entrar al Juego"}
                    </button>
                  </form>
                </Form>
              </motion.div>
            )}

            {activeTab === 'register' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Nombre de Héroe</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Kenshin" {...field} className="bg-background/50 border-white/10 focus-visible:border-secondary text-white" />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="tu@email.com" {...field} className="bg-background/50 border-white/10 focus-visible:border-secondary text-white" />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-white/10 focus-visible:border-secondary text-white" />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <button 
                      type="submit" 
                      disabled={registerMutation.isPending}
                      className="w-full py-3 bg-secondary text-secondary-foreground font-serif uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                    >
                      {registerMutation.isPending ? "Forjando..." : "Crear Cuenta"}
                    </button>
                  </form>
                </Form>
              </motion.div>
            )}

            {activeTab === 'recover' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-sm text-muted-foreground mb-6 text-center">Ingresa tu correo para recibir instrucciones de recuperación.</p>
                <Form {...recoverForm}>
                  <form onSubmit={recoverForm.handleSubmit(onRecover)} className="space-y-6">
                    <FormField
                      control={recoverForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="tu@email.com" {...field} className="bg-background/50 border-white/10 focus-visible:border-white text-white" />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <button 
                      type="submit" 
                      disabled={recoverMutation.isPending}
                      className="w-full py-3 bg-white/10 border border-white/20 text-white font-serif uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                    >
                      {recoverMutation.isPending ? "Enviando..." : "Recuperar Contraseña"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('login')}
                      className="w-full text-center text-xs text-muted-foreground hover:text-white uppercase tracking-widest mt-4 block"
                    >
                      Volver al inicio
                    </button>
                  </form>
                </Form>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
