import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
  icon: React.ReactNode;
}

const AnimatedCounter = ({ end, suffix = "", duration = 2, label, icon }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 text-center glow-hover"
    >
      <div className="text-gold mb-4 flex justify-center">{icon}</div>
      <div className="font-display text-4xl font-bold gold-text mb-2">
        {count}{suffix}
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );
};

export default AnimatedCounter;
