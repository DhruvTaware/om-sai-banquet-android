import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Building2, TreePine, Wand2, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-royal">
      {/* Particles */}
      <ParticleBackground />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Sparkles className="text-gold-light" size={16} />
          <span className="text-gold-light/70 tracking-[0.3em] uppercase text-xs font-body">
            Where Celebrations Become Memories
          </span>
          <Sparkles className="text-gold-light" size={16} />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-cream leading-tight mb-2">
            OM SAI
          </h1>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold gold-text mb-4">
            BANQUET & LAWNS
          </h2>
          <div className="w-24 h-0.5 gold-gradient mx-auto mb-6 rounded-full" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-cream/50 text-sm sm:text-base max-w-md mx-auto mb-16 font-body"
        >
          Select your venue to explore
        </motion.p>

        {/* Venue & Planner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* OM SAI BANQUET */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <Link
              to="/banquet"
              className="group block glass-card bg-cream/5 border-gold/20 p-8 sm:p-10 rounded-2xl hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(38_70%_50%/0.2)]"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Building2 size={32} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mb-3">
                OM SAI
              </h3>
              <p className="font-display text-lg gold-text font-semibold mb-4">BANQUET</p>
              <p className="text-cream/40 text-sm mb-6 font-body leading-relaxed">
                Grand indoor venue with luxurious interiors, crystal chandeliers & royal ambiance
              </p>
              <span className="inline-flex items-center gap-2 text-gold-light text-sm font-medium group-hover:gap-3 transition-all duration-300">
                Explore <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>

          {/* OM SAI LAWNS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <Link
              to="/lawns"
              className="group block glass-card bg-cream/5 border-gold/20 p-8 sm:p-10 rounded-2xl hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(38_70%_50%/0.2)]"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <TreePine size={32} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mb-3">
                OM SAI
              </h3>
              <p className="font-display text-lg gold-text font-semibold mb-4">LAWNS</p>
              <p className="text-cream/40 text-sm mb-6 font-body leading-relaxed">
                Beautiful open-air lawn with lush greens, fairy lights & scenic landscape
              </p>
              <span className="inline-flex items-center gap-2 text-gold-light text-sm font-medium group-hover:gap-3 transition-all duration-300">
                Explore <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>

          {/* AI EVENT PLANNER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            <Link
              to="/planner"
              className="group block glass-card bg-cream/5 border-gold/20 p-8 sm:p-10 rounded-2xl hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(38_70%_50%/0.2)]"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Wand2 size={32} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mb-3">
                AI EVENT
              </h3>
              <p className="font-display text-lg gold-text font-semibold mb-4">PLANNER</p>
              <p className="text-cream/40 text-sm mb-6 font-body leading-relaxed">
                Answer a few questions and get matched with the perfect OM SAI package instantly
              </p>
              <span className="inline-flex items-center gap-2 text-gold-light text-sm font-medium group-hover:gap-3 transition-all duration-300">
                Explore <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-cream/20 text-xs tracking-widest font-body"
      >
        © 2026 OM SAI BANQUET & LAWNS
      </motion.div>
    </div>
  );
};

export default Landing;
