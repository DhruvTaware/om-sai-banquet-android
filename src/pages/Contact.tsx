import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import {
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  MapPin,
  User,
} from "lucide-react";

const Contact = () => {
  return (
    <PageWrapper>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
              Contact Owner
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Let's Create <span className="gold-text">Magic</span>
            </h2>

            <p className="text-muted-foreground">
              Connect with Om Sai Banquet & Lawns for weddings,
              receptions, parties and unforgettable celebrations.
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 space-y-6"
          >

            {/* Owner */}
            <div className="flex items-center gap-4 bg-background/50 border border-border rounded-2xl p-5">
              <div className="bg-gold/10 p-3 rounded-xl">
                <User className="text-gold" size={28} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Owner
                </h3>

                <p className="text-muted-foreground">
                  Mr. Ajit Taware
                </p>
              </div>
            </div>

            {/* Call */}
            <a
              href="tel:+919822658766"
              className="flex items-center justify-between bg-background/50 border border-border rounded-2xl p-5 hover:border-gold transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gold/10 p-3 rounded-xl">
                  <Phone className="text-gold" size={28} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Call Us
                  </h3>

                  <p className="text-muted-foreground">
                    +91 98226 58766
                  </p>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919822658766"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-background/50 border border-border rounded-2xl p-5 hover:border-green-500 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <MessageCircle className="text-green-500" size={28} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    WhatsApp Chat
                  </h3>

                  <p className="text-muted-foreground">
                    Chat directly with the owner
                  </p>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-background/50 border border-border rounded-2xl p-5 hover:border-pink-500 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-pink-500/10 p-3 rounded-xl">
                  <Instagram className="text-pink-500" size={28} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Instagram
                  </h3>

                  <p className="text-muted-foreground">
                    Follow our latest wedding events
                  </p>
                </div>
              </div>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-background/50 border border-border rounded-2xl p-5 hover:border-red-500 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-500/10 p-3 rounded-xl">
                  <Youtube className="text-red-500" size={28} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    YouTube Channel
                  </h3>

                  <p className="text-muted-foreground">
                    Watch our wedding highlights
                  </p>
                </div>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-4 bg-background/50 border border-border rounded-2xl p-5">
              <div className="bg-gold/10 p-3 rounded-xl">
                <MapPin className="text-gold" size={28} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Andobawadi, Pahunewadi, Baramati-Phaltan Road, Baramati
                </h3>

                <p className="text-muted-foreground">
                  Om Sai Banquet & Lawns,
                  Baramati, Maharashtra
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;