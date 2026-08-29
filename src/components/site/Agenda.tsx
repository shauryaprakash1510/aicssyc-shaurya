import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles } from "lucide-react";
import timelineData from "@/data/timeline.json";

const days = timelineData.days;

export function Agenda() {
  return (
    <section
      id="agenda"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm overflow-hidden text-ivory"
    >
      {/* Ambient glow background (Constrained for mobile) */}
      <div className="absolute top-1/3 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-pill border border-[#E2B767]/30 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-3 sm:mb-4"
          >
            <Calendar size={13} />
            <span>FOUR DAYS OF CONVERGENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight text-balance"
          >
            Congress{" "}
            <span className="font-editorial italic font-normal text-[#E2B767]">Schedule</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto text-center mt-2.5 sm:mt-3 font-sans"
          >
            Oct 8 – 11, 2026 • SRMIST, Kattankulathur, Chennai
          </motion.p>
        </div>

        {/* 4 Days Grid (1-col on mobile -> 2-col on tablet -> 4-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {days.map((day, dIdx) => (
            <motion.div
              key={day.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: dIdx * 0.08 }}
              className="glass-card rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* Day Header */}
                <div className="pb-3.5 sm:pb-4 mb-5 sm:mb-6 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] sm:text-xs font-mono text-emerald-glow uppercase tracking-widest font-semibold">
                      {day.label}
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-gold-glow mt-0.5">
                      {day.date}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl glass-pill text-gold-glow border border-white/10">
                    <Sparkles size={15} />
                  </div>
                </div>

                {/* Blocks Timeline */}
                <div className="space-y-4 sm:space-y-5">
                  {day.blocks.map((block, bIdx) => (
                    <div
                      key={bIdx}
                      className="relative pl-3.5 sm:pl-4 border-l border-emerald-500/30"
                    >
                      <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />

                      <div className="text-[10px] sm:text-[11px] font-mono text-slate-mist uppercase flex items-center gap-1">
                        <Clock size={11} className="text-gold-glow" />
                        <span>{block.room}</span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-semibold text-ivory mt-1 leading-snug">
                        {block.title}
                      </h4>

                      <p className="text-[11px] sm:text-xs text-slate-mist/80 mt-0.5">
                        {block.kind}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-glow">
                  Day {dIdx + 1} Highlight
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
