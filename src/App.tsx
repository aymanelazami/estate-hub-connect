
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Agencies from "./pages/Agencies";
import AgencyProfile from "./pages/AgencyProfile";
import AgentProfile from "./pages/AgentProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAgencyManagement from "./pages/AdminAgencyManagement";
import AgencyDashboard from "./pages/AgencyDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import BillingManagement from "./pages/BillingManagement";
import ContactAgent from "./pages/ContactAgent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/agencies/:id" element={<AgencyProfile />} />
            <Route path="/agents/:id" element={<AgentProfile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-agency-management" element={<AdminAgencyManagement />} />
            <Route path="/agency-dashboard" element={<AgencyDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/contact-agent/:id" element={<ContactAgent />} />
            <Route path="/billing" element={<BillingManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
