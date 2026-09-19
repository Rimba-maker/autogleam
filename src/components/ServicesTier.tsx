// src/components/ServicesTier.tsx
import { asset } from '../lib/asset';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Tier {
  name: string;
  price: string;
  duration: string;
  image: string;
  alt: string;
  pos: string;
  popular?: boolean;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: 'Express Wash',
    price: 'Rp 65k – 95k',
    duration: '45 mnt',
    image: asset('/img/tier-express.webp'),
    alt: 'Velg merah disikat saat proses foam wash',
    pos: '50% 62%',
    features: ['Foam wash 2 bucket method', 'Wheel & tire cleaning', 'Vacuum interior', 'Glass cleaning', 'Tire shine'],
  },
  {
    name: 'Premium Wash',
    price: 'Rp 150k – 220k',
    duration: '90 mnt',
    image: asset('/img/tier-premium.webp'),
    alt: 'Snow foam pre-wash pada mobil hitam di garasi',
    pos: '55% 50%',
    features: ['Semua Express +', 'Snow foam pre-wash', 'Decontamination (iron remover)', 'Interior wipe down', 'Dashboard dressing', 'Spray wax protection'],
  },
  {
    name: 'Detailing Standard',
    price: 'Rp 450k – 650k',
    duration: '4 jam',
    image: asset('/img/tier-standard.webp'),
    alt: 'Mesin polisher dengan pad kuning pada cat putih',
    pos: '50% 40%',
    popular: true,
    features: ['Semua Premium +', 'Clay bar treatment', 'Wax / sealant application', 'Interior deep clean (vacuum + steam)', 'Leather conditioning', 'Engine bay cleaning'],
  },
  {
    name: 'Detailing Ultimate',
    price: 'Rp 1,2jt – 1,8jt',
    duration: '8 jam',
    image: asset('/img/tier-ultimate.webp'),
    alt: 'Detailer memoles mobil sport gelap di bengkel bata',
    pos: '50% 55%',
    features: ['Semua Standard +', 'Full paint correction (1-stage)', 'Ceramic coating prep', 'Headlight restoration', 'Trim restoration', '6 bulan warranty'],
  },
];

export default function ServicesTier() {
  const [active, setActive] = useState(2);
  const tier = tiers[active];

  return (
    <section id="services" className="bg-bay px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1.6fr_1fr] md:items-end">
          <h2 className="display h-xl">
            Pilih paket <strong>sesuai kebutuhan</strong>
          </h2>
          <p className="lead text-mist-2 md:justify-self-start">
            Dari quick wash sampai full detailing — semua dengan standar profesional.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* tier list */}
          <div role="tablist" aria-label="Paket layanan" className="border-t border-frost/12">
            {tiers.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.name}
                  role="tab"
                  id={`tier-tab-${i}`}
                  aria-selected={on}
                  aria-controls="tier-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setActive((i + 1) % tiers.length); }
                    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setActive((i + tiers.length - 1) % tiers.length); }
                  }}
                  className={`group relative grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-frost/12 py-6 text-left transition-colors duration-500 md:py-7 ${on ? 'text-frost' : 'text-mist hover:text-frost'}`}
                >
                  <span className={`absolute inset-y-0 left-0 w-[3px] bg-lamp transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                  <span className={`absolute inset-y-0 left-0 w-full origin-left bg-bay-2 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${on ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true" />
                  <span className="relative pl-5">
                    <span className="display block text-[clamp(1.25rem,2vw,1.75rem)] font-semibold">{t.name}</span>
                    <span className="mt-1 flex items-center gap-2 text-[0.8rem] text-mist">
                      <ClockIcon className="h-4 w-4" strokeWidth={1.5} /> {t.duration}
                      {t.popular && <span className="ml-2 text-lamp">Paling dipilih</span>}
                    </span>
                  </span>
                  <span className="num relative text-[0.95rem] md:text-[1.05rem]">{t.price}</span>
                </button>
              );
            })}
            <p className="mt-6 text-[0.8rem] text-mist">*Harga bervariasi berdasarkan ukuran mobil (Small / Medium / Large / SUV).</p>
          </div>

          {/* photograph + spec */}
          <div id="tier-panel" role="tabpanel" aria-labelledby={`tier-tab-${active}`} className="crop">
            <div className="photo aspect-[4/5] max-h-[82svh] w-full">
              {tiers.map((t, i) => (
                <img
                  key={t.name}
                  src={t.image}
                  alt={t.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: t.pos }}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] [transition-timing-function:var(--ease-out-expo)] ${i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-bay via-bay/70 to-transparent" aria-hidden="true" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="display h-md font-semibold">{tier.name}</div>
                    <ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[0.95rem] text-frost sm:grid-cols-2">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 leading-snug">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-lamp" strokeWidth={2.4} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-frost/15 pt-5">
                      <span className="num text-xl text-frost">{tier.price}</span>
                      <a href="#booking" className="btn btn-lamp">
                        Pilih {tier.name} <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
