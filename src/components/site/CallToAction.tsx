import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function CallToAction() {
  return (
    <section
      id="join"
      className="relative bg-transparent text-ivory grain overflow-hidden border-t border-white/8"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-atmosphere)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E2B767]/40 to-transparent"
      />

      <div className="container-editorial relative py-20 sm:py-32 md:py-40 text-center">
        <Reveal direction="up" distance={25}>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#E2B767] font-mono">
            8 — 11 October 2026 · Kattankulathur
          </p>
          <h2 className="mt-6 sm:mt-10 font-display text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[1.02] tracking-tight text-balance">
            Where <em className="editorial-italic font-normal text-[#E2B767]">Agents</em>
            <br />
            Meet Humans.
          </h2>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
            <a
              href="https://dashboard.eqvento.in/register/aicssyc26-lM0m3B"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[44px] group inline-flex items-center justify-center gap-2 rounded-full bg-[#E2B767] px-8 py-3.5 text-xs sm:text-sm font-semibold text-[#060D0A] hover:bg-[#d6aa5a] shadow-[0_0_20px_rgba(226,183,103,0.35)] transition active:scale-[0.98]"
            >
              <span>Register now</span>
              <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
            </a>
            <Link
              to="/sponsor"
              className="w-full sm:w-auto min-h-[44px] group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs sm:text-sm font-medium text-ivory hover:bg-white/10 hover:border-[#E2B767]/40 transition active:scale-[0.98]"
            >
              <span>Become a sponsor</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
