import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import ParticleBackground from "@/components/ParticleBackground";
import heroImage from "@/assets/hero-lawns.jpg";

const LawnsHome = () => (
  <PageWrapper>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="OM SAI Lawns" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-royal/60" />
      </div>
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="text-gold-light" size={20} />
            <span className="text-gold-light tracking-[0.3em] uppercase text-sm font-body">Open-Air Elegance</span>
            <Sparkles className="text-gold-light" size={20} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight">
            Celebrate Under the <span className="gold-text">Stars</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-gold-light mb-8">
            OM SAI LAWNS
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-cream/70 text-lg max-w-2xl mx-auto mb-12 font-body">
            Sprawling green lawns, fairy-light canopies, and open skies — the perfect canvas for your dream celebration.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/lawns/contact" className="gold-gradient px-8 py-4 rounded-xl font-semibold text-primary-foreground glow-hover flex items-center gap-2 text-lg shadow-lg">
              Book Now <ArrowRight size={20} />
            </Link>
            <Link to="/lawns/gallery" className="px-8 py-4 rounded-xl font-semibold border-2 border-gold-light/40 text-cream hover:bg-cream/10 transition-all duration-300 text-lg">
              Explore Gallery
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  </PageWrapper>
);

export default LawnsHome;
