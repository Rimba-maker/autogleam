// src/components/Hero.tsx
import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const delay = (s: string) => ({ '--d': s }) as CSSProperties;
const STATS = ['5.000+ mobil detailed', '7 tahun pengalaman', 'Brand premium only'];

export default function Hero() {
  const stage = useRef<HTMLElement>(null);

  // The inspection lamp: a damped spring chases the pointer, so the beam has weight and overshoots a little.
  // With no pointer (touch, idle) it sweeps the car by itself. Reduced motion parks it on the bonnet.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tx = 0.36, ty = 0.66, x = tx, y = ty, vx = 0, vy = 0, raf = 0, hovering = false;
    const start = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      hovering = true;
    };
    const onLeave = () => { hovering = false; };

    const tick = (now: number) => {
      if (!hovering && !reduce) {
        const s = (now - start) / 1000;
        tx = 0.5 + 0.32 * Math.sin(s * 0.5);
        ty = 0.56 + 0.13 * Math.sin(s * 0.83);
      }
      vx = (vx + (tx - x) * 0.045) * 0.84;
      vy = (vy + (ty - y) * 0.045) * 0.84;
      x += vx; y += vy;
      el.style.setProperty('--lx', `${(x * 100).toFixed(2)}%`);
      el.style.setProperty('--ly', `${(y * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    if (reduce) { el.style.setProperty('--lx', '38%'); el.style.setProperty('--ly', '66%'); }
    else raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section id="top" ref={stage} className="hero" aria-label="AutoGleam Detailing">
      {/* 1. giant tagline, behind the car */}
      <div className="hero-layer anim-settle" style={delay('0.1s')} aria-hidden="true">
        <div className="hero-word hero-word-dim">Beyond<span> </span><br className="md:hidden" />Clean</div>
      </div>
      <div className="hero-layer lamp-mask" aria-hidden="true">
        <div className="hero-word hero-word-lit">Beyond<span> </span><br className="md:hidden" />Clean</div>
      </div>

      <div className="hero-floor" aria-hidden="true" />
      <img src="/img/hero-car-gleam.webp" alt="" className="hero-reflect" aria-hidden="true" />
      <div className="hero-contact" aria-hidden="true" />

      {/* 2. the car: hazed and swirled by default, gleaming where the lamp lands */}
      <img
        src="/img/hero-car-dull.webp"
        alt="Porsche 911 abu-abu perak di bay detailing, cat terlihat kusam dan berswirl"
        className="hero-car anim-settle"
        style={delay('0.35s')}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-layer lamp-mask" aria-hidden="true">
        <img src="/img/hero-car-gleam.webp" alt="" className="hero-car" decoding="async" />
      </div>
      <div className="hero-layer hero-glow" aria-hidden="true" />
      <div className="hero-frame crop" aria-hidden="true" />

      {/* 3. copy */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 md:pt-32">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:gap-14">
          <h1 className="display anim-rise text-[clamp(1.6rem,3.7vw,3.5rem)]" style={delay('0.25s')}>
            Lebih dari sekadar cuci.<br />
            <strong>Mobil Anda pantas yang terbaik.</strong>
          </h1>
          <div className="max-w-[26rem] md:justify-self-end md:pt-2">
            <p className="anim-rise lead text-mist-2" style={delay('0.45s')}>
              Premium car detailing dengan produk berstandar internasional. Dari express wash sampai ceramic coating 5 tahun.
            </p>
            <div className="anim-rise mt-5 flex flex-wrap items-center gap-x-8 gap-y-3" style={delay('0.6s')}>
              <a href="#booking" className="btn btn-lamp">
                Book Sekarang <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
              </a>
              <a href="#services" className="link-line text-[0.95rem] text-frost">Lihat Paket</a>
            </div>
          </div>
        </div>

        <div className="anim-rise mt-6 flex flex-col gap-4 border-t border-frost/15 pt-4 md:mt-10 md:flex-row md:items-center md:justify-between" style={delay('0.9s')}>
          <p className="hidden items-center gap-2 text-[0.8rem] text-mist-2 md:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lamp" aria-hidden="true" />
            Gerakkan kursor — lampu inspeksi Bay 07 mengungkap kondisi cat sebenarnya.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[0.8rem] text-frost">
            {STATS.map((s) => <li key={s} className="num">{s}</li>)}
            <li className="text-mist">*angka ilustratif</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
