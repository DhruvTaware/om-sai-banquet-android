import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import TiltCard from "@/components/TiltCard";
import { Heart, GlassWater, Cake, Briefcase } from "lucide-react";

const services = [
  {
    icon: <Heart size={40} />,
    title: "Wedding Events",
    desc: "Create your fairy-tale wedding with our stunning décor, expert planning, and luxurious amenities. Every detail crafted to perfection.",
    features: ["Custom Décor", "Live Music Setup"],
  },
  {
    icon: <GlassWater size={40} />,
    title: "Reception",
    desc: "Host an unforgettable reception with elegant ambiance, gourmet catering, and seamless event coordination.",
    features: ["Gourmet Menu", "DJ & Sound", "Luxury Stage Decorationh"],
  },
  {
    icon: <Cake size={40} />,
    title: "Birthday Parties",
    desc: "Celebrate milestones in grand style with themed decorations, entertainment, and a dedicated party crew.",
    features: ["Theme Setup", "Balloon Décor","Pre-Wedding Functions", "Custom Cake"],
  },
  {
    icon: <Briefcase size={40} />,
    title: "Corporate Events",
    desc: "Professional conference facilities with modern AV equipment, breakout rooms, and executive catering services.",
    features: ["AV Equipment", "Stage Setup", "Seminars", "Product Launches"],
  },
];

const Services = () => (
  <PageWrapper>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">Our Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Events We <span className="gold-text">Specialize</span> In
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intimate celebrations to grand galas, we bring your vision to life with unparalleled service and attention to detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <TiltCard key={i}>
              <div className="glass-card p-8 h-full glow-hover group">
                <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span key={f} className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/20">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default Services;
