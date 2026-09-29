import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ClipboardList,
  Wand2,
  PhoneCall,
  Building2,
  TreePine,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import ParticleBackground from "@/components/ParticleBackground";

const steps = [
  {
    icon: <ClipboardList size={28} />,
    title: "Tell Us Your Requirements",
    description: "Event type, venue, guests, budget, decoration, catering and more — in a few quick steps.",
  },
  {
    icon: <Wand2 size={28} />,
    title: "Get Matched Packages",
    description: "We compare your requirements against OM SAI packages and show your best 3–4 matches.",
  },
  {
    icon: <PhoneCall size={28} />,
    title: "Connect With OM SAI",
    description: "Review, compare and ask questions, then reach out to OM SAI directly to finalize.",
  },
];

const PlannerHome = () => {
  return (
    <PageWrapper>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-royal">
        <ParticleBackground />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="text-gold-light" size={16} />
            <span className="text-gold-light/70 tracking-[0.3em] uppercase text-xs font-body">
              AI Event Planner
            </span>
            <Sparkles className="text-gold-light" size={16} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-6"
          >
            Find Your Perfect <span className="gold-text">OM SAI Package</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-cream/60 text-base sm:text-lg max-w-xl mx-auto mb-10 font-body"
          >
            Answer a few questions about your celebration and we'll recommend the best-matching
            packages across OM SAI Banquet Hall and Lawns — instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/planner/start"
              className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-xl font-semibold text-primary-foreground glow-hover text-lg shadow-lg"
            >
              Start Planning <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-6 mt-10 text-cream/40 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <Building2 size={16} /> Banquet Hall
            </span>
            <span className="flex items-center gap-1.5">
              <TreePine size={16} /> Lawns
            </span>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">How It Works</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              Three Steps to Your <span className="gold-text">Ideal Package</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl gold-gradient flex items-center justify-center text-primary-foreground shadow-lg">
                  {s.icon}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/planner/start"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300 text-lg"
            >
              Start Planning <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PlannerHome;
