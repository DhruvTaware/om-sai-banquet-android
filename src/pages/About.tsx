import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import TiltCard from "@/components/TiltCard";
import heroImage from "@/assets/hall4.jpeg";
import lawnImage from "@/assets/outside.jpeg";
import { Building2, TreePine, PartyPopper } from "lucide-react";

const features = [
  {
    icon: <Building2 size={32} />,
    title: "Spacious Banquet Hall",
    desc: "Our grand banquet hall can accommodate 1000+ guests with elegant interiors, crystal chandeliers, and world-class amenities.",
  },
  {
    icon: <TreePine size={32} />,
    title: "Beautiful Lawn Area",
    desc: "Sprawling green lawns perfect for outdoor ceremonies, garden parties, and open-air receptions under the stars.",
  },
  {
    icon: <PartyPopper size={32} />,
    title: "Perfect for Every Occasion",
    desc: "From intimate gatherings to grand weddings, corporate conferences to birthday bashes — we make every event unforgettable.",
  },
];

const About = () => (
  <PageWrapper>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">About Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            A Venue Like No <span className="gold-text">Other</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            OM SAI BANQUET & LAWNS is where dreams come to life. With state-of-the-art facilities and impeccable service, we create memories that last forever.
          </p>
        </motion.div>

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={heroImage} alt="Banquet Hall Interior" loading="lazy" width={1920} height={1080} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={lawnImage} alt="Lawn Area" loading="lazy" width={1280} height={720} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <TiltCard key={i}>
              <div className="glass-card p-8 h-full glow-hover">
                <div className="text-gold mb-4">{f.icon}</div>
                <h3 className="font-display text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default About;
