// src/components/OurProcess.tsx
import { asset } from '../lib/asset';
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  MagnifyingGlassIcon, BeakerIcon, SparklesIcon, ExclamationTriangleIcon,
  ViewfinderCircleIcon, SunIcon, ShieldCheckIcon, CheckBadgeIcon,
} from '@heroicons/react/24/outline';

interface Step {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  image: string;
  alt: string;
  pos: string;
}

const steps: Step[] = [
  { icon: MagnifyingGlassIcon, title: 'Inspection', desc: 'Cek kondisi cat, panel, dan swirl sebelum satu produk pun disentuhkan ke mobil.', image: asset('/img/proc-inspect.webp'), alt: 'BMW dengan lampu menyala di ruang gelap', pos: '50% 60%' },
  { icon: BeakerIcon, title: 'Pre-Wash', desc: 'Snow foam melonggarkan kotoran dan debu jalan sebelum ada kontak fisik.', image: asset('/img/proc-prewash.webp'), alt: 'Mobil hitam berbusa saat snow foam pre-wash', pos: '50% 50%' },
  { icon: SparklesIcon, title: 'Hand Wash', desc: '2 bucket method dengan microfiber wash mitt, supaya kotoran tidak kembali menggores cat.', image: asset('/img/proc-hand.webp'), alt: 'Tangan mencuci bodi mobil dengan spons dan busa', pos: '50% 40%' },
  { icon: ExclamationTriangleIcon, title: 'Decontamination', desc: 'Iron remover dan tar remover mengangkat kontaminan yang menempel di dalam pori cat.', image: asset('/img/proc-decon.webp'), alt: 'Velg dengan butiran air setelah dekontaminasi', pos: '50% 50%' },
  { icon: ViewfinderCircleIcon, title: 'Clay Bar', desc: 'Mengangkat kontaminan permukaan sampai cat terasa halus seperti kaca.', image: asset('/img/proc-clay.webp'), alt: 'Tangan mengelap kap mobil balap dengan kain kuning', pos: '50% 50%' },
  { icon: SunIcon, title: 'Polish / Correction', desc: 'Sesuai paket: dari polish ringan hingga koreksi cat multi-stage.', image: asset('/img/proc-polish.webp'), alt: 'Detailer memoles bodi mobil hitam dengan mesin polisher', pos: '50% 35%' },
  { icon: ShieldCheckIcon, title: 'Protection', desc: 'Wax, sealant, atau ceramic coating mengunci hasil dan melindungi cat.', image: asset('/img/proc-protect.webp'), alt: 'Butiran air pada permukaan cat yang dilapisi coating', pos: '50% 50%' },
  { icon: CheckBadgeIcon, title: 'Final Inspection', desc: 'QC di bawah multi-angle lighting. Mobil baru keluar bay setelah lolos.', image: asset('/img/proc-final.webp'), alt: 'Porsche 911 abu-abu di bay dengan cahaya hangat', pos: '50% 50%' },
];

export default function OurProcess() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 55%', 'end 55%'] });

  useEffect(() => {
    const nodes = list.current?.querySelectorAll<HTMLElement>('[data-step]');
    if (!nodes) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="bg-bay px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 max-w-4xl md:mb-20">
          <h2 className="display h-xl">
            Proses detailing <strong>profesional</strong>
          </h2>
          <p className="lead mt-6 text-mist-2">Delapan langkah, satu standar: tidak ada yang dilewati, apa pun paket yang Anda pilih.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          {/* sticky photograph, swaps with the step in view */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="crop">
                <div className="photo aspect-[4/5] max-h-[78svh] w-full">
                  {steps.map((s, i) => (
                    <img
                      key={s.title}
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: s.pos }}
                      className={`absolute inset-0 transition-[opacity,transform] duration-[1000ms] [transition-timing-function:var(--ease-out-expo)] ${i === active ? 'scale-100 opacity-100' : 'scale-[1.05] opacity-0'}`}
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bay to-transparent p-6 pt-24">
                    <span className="num text-sm text-lamp">{String(active + 1).padStart(2, '0')} / 08</span>
                    <div className="display h-md mt-1 font-semibold">{steps[active].title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* steps */}
          <ol ref={list} className="relative">
            <div className="absolute bottom-0 left-[1.35rem] top-0 w-px bg-frost/12" aria-hidden="true" />
            <motion.div
              className="absolute left-[1.35rem] top-0 h-full w-px origin-top bg-lamp"
              style={{ scaleY: scrollYProgress }}
              aria-hidden="true"
            />
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title} data-step={i} className="relative pl-16 pb-16 last:pb-0 lg:min-h-[44svh] lg:pb-0">
                  <span
                    className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${on ? 'border-lamp bg-lamp text-ink' : 'border-frost/20 bg-bay text-mist-2'}`}
                    aria-hidden="true"
                  >
                    <s.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div className={`transition-opacity duration-500 ${on ? 'opacity-100' : 'lg:opacity-45'}`}>
                    <p className="num text-[0.8rem] text-lamp">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="display h-md mt-1 font-semibold">{s.title}</h3>
                    <p className="lead mt-3 max-w-[34rem] text-mist-2">{s.desc}</p>
                    <div className="photo mt-6 aspect-[16/10] lg:hidden">
                      <img src={s.image} alt={s.alt} loading="lazy" decoding="async" style={{ objectPosition: s.pos }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
