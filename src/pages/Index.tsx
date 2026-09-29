import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import ParticleBackground from "@/components/ParticleBackground";
import heroImage from "@/assets/hero-banquet.jpg";

const Index = () => {
  return (
    <PageWrapper>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="OM SAI Banquet Hall"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-royal/60" />
        </div>

        {/* 3D Particles */}
        <ParticleBackground />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-gold-light" size={20} />
              <span className="text-gold-light tracking-[0.3em] uppercase text-sm font-body">
                Where Celebrations Become Memories
              </span>
              <Sparkles className="text-gold-light" size={20} />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight">
              Celebrate Your Special Moments with{" "}
              <span className="gold-text">Royal Elegance</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-gold-light mb-8"
            >
              OM SAI BANQUET & LAWNS
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-cream/70 text-lg max-w-2xl mx-auto mb-12 font-body"
            >
              The perfect venue for weddings, receptions, corporate events, and celebrations that deserve nothing but the best.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/banquet/contact"
                className="gold-gradient px-8 py-4 rounded-xl font-semibold text-primary-foreground glow-hover flex items-center gap-2 text-lg shadow-lg"
              >
                Book Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/banquet/gallery"
                className="px-8 py-4 rounded-xl font-semibold border-2 border-gold-light/40 text-cream hover:bg-cream/10 transition-all duration-300 text-lg"
              >
                Explore Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </PageWrapper>
  );
};

export default Index;
