import { Phone, MessageCircle, MapPin } from "lucide-react";

const PHONE_DISPLAY = "+91 98226 58766";
const PHONE_TEL = "tel:+919822658766";
const WHATSAPP_URL = "https://wa.me/919822658766";
const ADDRESS = "Andobawadi, Pahunewadi, Baramati-Phaltan Road, Baramati, Maharashtra";

/**
 * Shared "Contact OM SAI" call-to-action used across the planner results,
 * package details and compare pages. No online booking/payment — just the
 * existing call/WhatsApp/address contact channels already used elsewhere
 * in the site (see src/pages/Contact.tsx).
 */
const ContactOmSai = ({ title = "Ready to take the next step?" }: { title?: string }) => (
  <div className="glass-card p-6 sm:p-8 text-center">
    <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-6">
      Speak with OM SAI directly to confirm availability, pricing and details.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
      <a
        href={PHONE_TEL}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold gold-gradient text-primary-foreground glow-hover w-full sm:w-auto justify-center"
      >
        <Phone size={18} /> Call OM SAI
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
      >
        <MessageCircle size={18} /> WhatsApp OM SAI
      </a>
    </div>
    <p className="text-muted-foreground text-xs flex items-center justify-center gap-1.5">
      <MapPin size={12} className="shrink-0" /> {ADDRESS}
    </p>
    <p className="text-muted-foreground text-xs mt-1">{PHONE_DISPLAY}</p>
  </div>
);

export default ContactOmSai;
