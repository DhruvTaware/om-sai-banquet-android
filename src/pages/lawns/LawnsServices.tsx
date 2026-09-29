import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import TiltCard from "@/components/TiltCard";
import { Heart, GlassWater, Cake, Briefcase } from "lucide-react";

const services = [
  { icon: <Heart size={40} />, title: "Lawn Weddings", desc: "Dreamy outdoor weddings with floral mandaps, fairy lights, and sunset ceremonies on lush green lawns.", features: ["Garden Mandap", "Fairy Lights", "Floral Aisle", "Open-Air Stage"] },
  { icon: <GlassWater size={40} />, title: "Outdoor Receptions", desc: "Elegant dinner under the stars with long tables, candle-lit ambiance, and live music in the garden.", features: ["Candlelight Setup", "Live Band Stage", "Garden Bar", "Lounge Seating"] },
  { icon: <Cake size={40} />, title: "Garden Parties", desc: "Birthday bashes, baby showers, and anniversary celebrations with vibrant outdoor décor and entertainment.", features: ["Themed Décor", "Outdoor Games", "Kids Play Area", "Balloon Setup"] },
  { icon: <Briefcase size={40} />, title: "Corporate Gatherings", desc: "Team outings, product launches, and networking events in a refreshing open-air environment.", features: ["Tent Setup", "Stage & AV", "Networking Zones", "Catering Stations"] },
];

const LawnsServices = () => (
  <PageWrapper>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">Lawn Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">Outdoor Events We <span className="gold-text">Create</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Every outdoor celebration is unique. We craft bespoke experiences set against nature's beautiful backdrop.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <TiltCard key={i}>
              <div className="glass-card p-8 h-full glow-hover group">
                <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <span key={f} className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/20">{f}</span>
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

export default LawnsServices;
