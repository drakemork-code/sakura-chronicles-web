import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Downloads from "@/pages/Downloads";
import Account from "@/pages/Account";
import ServerStatus from "@/pages/ServerStatus";
import Wiki from "@/pages/Wiki";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/noticias" component={News} />
        <Route path="/noticias/:id" component={NewsDetail} />
        <Route path="/descargas" component={Downloads} />
        <Route path="/cuenta" component={Account} />
        <Route path="/estado" component={ServerStatus} />
        <Route path="/wiki" component={Wiki} />
        <Route path="/wiki/:category" component={Wiki} />
        <Route path="/wiki/:category/:slug" component={Wiki} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
