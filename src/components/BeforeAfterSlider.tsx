// src/components/BeforeAfterSlider.tsx
import { useRef, useState, useEffect } from 'react';
import { animate, useInView } from 'framer-motion';

interface Case {
  id: string;
  title: string;
  note: string;
  image: string;
  pos: string;
  /** CSS filter that stands in for the "before" state. */
  before: string;
  /** How much swirl / haze texture to lay over the "before". */
  swirl: number;
}

const cases: Case[] = [
  { id: 'paint', title: 'Swirl & oksidasi', note: 'Cat kusam berswirl kembali dalam.', image: '/img/ba-paint.webp', pos: '50% 58%', before: 'saturate(.35) contrast(.78) brightness(1.55) sepia(.15)', swirl: 0.75 },
  { id: 'scratch', title: 'Scratch removal', note: 'Baret halus terangkat, refleksi kembali tajam.', image: '/img/ba-scratch.webp', pos: '50% 50%', before: 'saturate(.5) contrast(.82) brightness(1.45)', swirl: 0.95 },
  { id: 'light', title: 'Headlight restoration', note: 'Lensa kuning dan buram kembali jernih.', image: '/img/ba-light.webp', pos: '50% 45%', before: 'sepia(.85) saturate(.7) contrast(.78) brightness(1.1) blur(1.6px)', swirl: 0.25 },
  { id: 'interior', title: 'Interior deep clean', note: 'Debu, noda, dan kusam hilang dari kulit dan trim.', image: '/img/ba-interior.webp', pos: '50% 45%', before: 'saturate(.4) contrast(.72) brightness(1.35) sepia(.25)', swirl: 0.35 },
];

function Compare({ item }: { item: Case }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '-15% 0px' });
  const touched = useRef(false);

  // one intro pass so the visitor sees what the handle does
  useEffect(() => {
    if (!seen || touched.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const a = animate(92, 50, { duration: 1.9, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => !touched.current && setPos(v) });
    return () => a.stop();
  }, [seen, item.id]);

  return (
    <div ref={ref} className="crop">
      <div className="photo aspect-[4/5] w-full select-none sm:aspect-[16/9]">
        {/* AFTER: the graded photograph */}
        <img src={item.image} alt={`Sesudah: ${item.title}`} loading="lazy" decoding="async" style={{ objectPosition: item.pos }} className="absolute inset-0" />
        <span className="wide-caps absolute right-4 top-4 z-10 bg-lamp px-2.5 py-1 text-[0.7rem] text-ink">After</span>
        <span className="absolute bottom-3 left-4 z-30 bg-bay/85 px-2.5 py-1 text-[0.7rem] text-frost">Simulasi visual</span>

        {/* BEFORE: the same frame, un-corrected */}
        <div className="absolute inset-0 z-20" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={item.image} alt={`Sebelum: ${item.title}`} loading="lazy" decoding="async" style={{ objectPosition: item.pos, filter: item.before }} className="absolute inset-0" />
          <img src="/img/swirl.webp" alt="" aria-hidden="true" loading="lazy" style={{ opacity: item.swirl, objectPosition: item.pos }} className="absolute inset-0 mix-blend-screen" />
          <div className="absolute inset-0 bg-primer/10" aria-hidden="true" />
          <span className="wide-caps absolute left-4 top-4 bg-bay/85 px-2.5 py-1 text-[0.7rem] text-frost">Before</span>
        </div>

        {/* handle */}
        <div className="pointer-events-none absolute inset-y-0 z-30 w-px bg-frost" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-frost bg-bay/90 text-frost">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6-6 6 6 6M15 6l6 6-6 6" /></svg>
          </div>
        </div>

        <input
          type="range" min={0} max={100} step={0.5} value={pos}
          onChange={(e) => { touched.current = true; setPos(Number(e.target.value)); }}
          aria-label={`Geser untuk membandingkan sebelum dan sesudah: ${item.title}`}
          className="absolute inset-0 z-40 m-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);
  const item = cases[active];

  return (
    <section id="results" className="on-light bg-primer px-5 py-24 text-ink sm:px-8 md:py-36" style={{ colorScheme: 'light' }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.6fr_1fr] md:items-end">
          <h2 className="display h-xl">
            Hasil yang <strong>berbicara</strong>
          </h2>
          <p className="lead text-slate md:justify-self-start">
            Geser untuk melihat transformasi sebelum dan sesudah detailing.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <Compare item={item} key={item.id} />

          <div>
            <div role="tablist" aria-label="Studi kasus" className="border-t border-ink/25">
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-baseline justify-between gap-4 border-b border-ink/25 py-4 text-left transition-colors ${i === active ? 'text-ink' : 'text-slate hover:text-ink'}`}
                >
                  <span className="display text-[1.05rem] font-semibold">{c.title}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink">{item.note}</p>
            <p className="mt-8 border-t border-ink/25 pt-4 text-[0.8rem] leading-relaxed text-slate">
              Simulasi visual: kondisi “before” dibuat dari foto yang sama. Ganti dengan dokumentasi pekerjaan asli klien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
