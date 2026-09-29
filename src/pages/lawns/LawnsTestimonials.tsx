import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";

const videos = [
  {
    video: "/videos/lawnevent1.mp4",
  },
  {
    video: "/videos/lawnevent2.mp4",
  },
  {
    video: "/videos/lawnevent3.mp4",
  },
  {
    video: "/videos/lawnevent4.mp4",
  },
];

const PastEvents = () => {
  return (
    <PageWrapper>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
              Event Memories
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Past Event <span className="gold-text">Videos</span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Relive the unforgettable celebrations hosted at OM SAI Banquet &
              Lawns.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden rounded-3xl"
              >
                <div className="relative overflow-hidden rounded-3xl">

                  <video
                    className="w-full h-[350px] object-cover"
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    playsInline
                  >
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageWrapper>
  );
};

export default PastEvents;
