import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactDetails = [
  { icon: <MapPin size={24} />, title: "Address", info: "Om Sai Banquet Hall ,Andobawadi,Pahunewadi, Baramati-Phaltan Road,Baramati, Pune, Maharashtra" },
  { icon: <Phone size={24} />, title: "Phone", info: "+91 98226 58766" },
  { icon: <Mail size={24} />, title: "Email", info: "omsailawns@gmail.com" },
  { icon: <Clock size={24} />, title: "Hours", info: "Mon-Sun: 9:00 AM - 11:00 PM" },
];

const Location = () => (
  <PageWrapper>
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">Find Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="gold-text">Location</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl h-[400px] lg:h-full min-h-[400px]"
          >
            <iframe
  src="https://www.google.com/maps?q=Om%20Sai%20Banquet%20Hall%20Baramati&output=embed"
  width="100%"
  height="500"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-3xl shadow-2xl"
></iframe>
          </motion.div>

          {/* Contact Details */}
          <div className="space-y-6">
            {contactDetails.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 glow-hover"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-primary-foreground shrink-0">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">{detail.title}</h3>
                  <p className="text-muted-foreground text-sm">{detail.info}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default Location;
