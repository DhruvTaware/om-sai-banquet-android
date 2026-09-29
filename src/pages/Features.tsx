import PageWrapper from "@/components/PageWrapper";
import AnimatedCounter from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { Users, Car, Palette, UtensilsCrossed, Sparkles, Music, Camera, Shield, } from "lucide-react";

const counters = [
  { end: 1100, suffix: "+", label: "Guest Capacity", icon: <Users size={36} /> },
  { end: 200, suffix: "+", label: "Parking Spaces", icon: <Car size={36} /> },
  { end: 50, suffix: "+", label: "Décor Themes", icon: <Palette size={36} /> },
  { end: 500, suffix: "+", label: "Events Hosted", icon: <UtensilsCrossed size={36} /> },
];

const extras = [
  { icon: <Sparkles size={24} />, title: "Custom Décor", desc: "Luxury wedding décor themes designed specially for your celebration" },

  { icon: <Music size={24} />, title: "Sound System", desc: "Professional audio for every occasion" },
  { icon: <Camera size={24} />, title: "Photo Points", desc: "Instagram-worthy backdrops included" },
  { icon: <Shield size={24} />, title: "24/7 Security", desc: "Round-the-clock safety for peace of mind" },
];

const Features = () => (
  <PageWrapper>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">Our Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
             Why People <span className="gold-text">Love Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            World-class facilities and amenities that set us apart.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {counters.map((c, i) => (
            <AnimatedCounter key={i} {...c} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {extras.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center glow-hover group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl gold-gradient flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                {e.icon}
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{e.title}</h3>
              <p className="text-muted-foreground text-sm">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default Features;
