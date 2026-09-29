import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LawnsNavbar from "@/components/LawnsNavbar";
import LawnsFooter from "@/components/LawnsFooter";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Features from "./pages/Features";
import Location from "./pages/Location";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import LawnsHome from "./pages/lawns/LawnsHome";
import LawnsAbout from "./pages/lawns/LawnsAbout";
import LawnsServices from "./pages/lawns/LawnsServices";
import LawnsGallery from "./pages/lawns/LawnsGallery";
import LawnsFeatures from "./pages/lawns/LawnsFeatures";
import LawnsLocation from "./pages/lawns/LawnsLocation";
import LawnsTestimonials from "./pages/lawns/LawnsTestimonials";
import LawnsContact from "./pages/lawns/LawnsContact";
import PlannerNavbar from "@/components/planner/PlannerNavbar";
import PlannerFooter from "@/components/planner/PlannerFooter";
import PlannerHome from "./pages/planner/PlannerHome";
import PlannerWizard from "./pages/planner/PlannerWizard";
import PlannerResults from "./pages/planner/PlannerResults";
import PlannerPackageDetails from "./pages/planner/PlannerPackageDetails";
import PlannerCompare from "./pages/planner/PlannerCompare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const BanquetLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <AnimatePresence mode="wait">{children}</AnimatePresence>
    <Footer />
  </>
);

const LawnsLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <LawnsNavbar />
    <AnimatePresence mode="wait">{children}</AnimatePresence>
    <LawnsFooter />
  </>
);

const PlannerLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <PlannerNavbar />
    <AnimatePresence mode="wait">{children}</AnimatePresence>
    <PlannerFooter />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Banquet */}
          <Route path="/banquet" element={<BanquetLayout><Index /></BanquetLayout>} />
          <Route path="/banquet/about" element={<BanquetLayout><About /></BanquetLayout>} />
          <Route path="/banquet/services" element={<BanquetLayout><Services /></BanquetLayout>} />
          <Route path="/banquet/gallery" element={<BanquetLayout><Gallery /></BanquetLayout>} />
          <Route path="/banquet/features" element={<BanquetLayout><Features /></BanquetLayout>} />
          <Route path="/banquet/location" element={<BanquetLayout><Location /></BanquetLayout>} />
          <Route path="/banquet/testimonials" element={<BanquetLayout><Testimonials /></BanquetLayout>} />
          <Route path="/banquet/contact" element={<BanquetLayout><Contact /></BanquetLayout>} />

          {/* Lawns */}
          <Route path="/lawns" element={<LawnsLayout><LawnsHome /></LawnsLayout>} />
          <Route path="/lawns/about" element={<LawnsLayout><LawnsAbout /></LawnsLayout>} />
          <Route path="/lawns/services" element={<LawnsLayout><LawnsServices /></LawnsLayout>} />
          <Route path="/lawns/gallery" element={<LawnsLayout><LawnsGallery /></LawnsLayout>} />
          <Route path="/lawns/features" element={<LawnsLayout><LawnsFeatures /></LawnsLayout>} />
          <Route path="/lawns/location" element={<LawnsLayout><LawnsLocation /></LawnsLayout>} />
          <Route path="/lawns/testimonials" element={<LawnsLayout><LawnsTestimonials /></LawnsLayout>} />
          <Route path="/lawns/contact" element={<LawnsLayout><LawnsContact /></LawnsLayout>} />

          {/* AI Event Planner */}
          <Route path="/planner" element={<PlannerLayout><PlannerHome /></PlannerLayout>} />
          <Route path="/planner/start" element={<PlannerLayout><PlannerWizard /></PlannerLayout>} />
          <Route path="/planner/results" element={<PlannerLayout><PlannerResults /></PlannerLayout>} />
          <Route path="/planner/package/:id" element={<PlannerLayout><PlannerPackageDetails /></PlannerLayout>} />
          <Route path="/planner/compare" element={<PlannerLayout><PlannerCompare /></PlannerLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
