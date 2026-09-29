import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import TiltCard from "@/components/TiltCard";
import heroLawns from "@/assets/hero-lawns.jpg";
import aboutLawn from "@/assets/about-lawn.jpg";
import { TreePine, Sun, Flower2 } from "lucide-react";

const features = [
  { icon: <TreePine size={32} />, title: "Lush Green Lawns", desc: "Expansive manicured lawns that provide a stunning natural backdrop for weddings, receptions, and outdoor celebrations under the open sky." },
  { icon: <Sun size={32} />, title: "Open-Air Ambiance", desc: "From golden-hour ceremonies to starlit receptions — our lawns transform with magical lighting, drapes, and floral décor." },
  { icon: <Flower2 size={32} />, title: "Custom Garden Themes", desc: "Choose from rustic, bohemian, royal garden, or contemporary themes. Our team creates bespoke outdoor setups tailored to your vision." },
];

const LawnsAbout = () => (
  <PageWrapper>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">About Our Lawns</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">Nature Meets <span className="gold-text">Luxury</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">OM SAI LAWNS offers a breathtaking open-air venue where every celebration feels like a fairy tale set against nature's finest canvas.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
            <img src={heroLawns} alt="Lawns Night View" loading="lazy" width={1920} height={1080} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
            <img src={aboutLawn} alt="Lawn Ceremony" loading="lazy" width={1280} height={720} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
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

export default LawnsAbout;
