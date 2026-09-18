// src/components/TestimonialBooking.tsx
import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    quote: 'Coating Gyeon 3 tahun, hasilnya gila beneran! Air langsung lari, debu gak nempel. Worth every rupiah.',
    name: 'Pak Andi',
    car: 'BMW X3 owner',
    image: '/img/tst-1.webp',
    alt: 'Lampu depan mobil hitam dengan DRL kuning menyala',
  },
  {
    quote: 'Subscribe weekly wash, mobil keluarga selalu bersih tanpa effort. Recommended!',
    name: 'Bu Maya',
    car: 'Innova owner',
    image: '/img/tst-2.webp',
    alt: 'Velg hitam yang dicuci dengan busa',
  },
  {
    quote: 'Detailing untuk mobil mau jual, harga jual naik 8 juta. ROI gila.',
    name: 'Andri',
    car: 'Used car dealer',
    image: '/img/tst-3.webp',
    alt: 'Mobil putih di showroom gelap dengan mobil lain di belakangnya',
  },
];

const SERVICES = ['Express Wash', 'Premium Wash', 'Detailing Standard', 'Detailing Ultimate', 'Ceramic Coating', 'Paint Protection Film', 'Paint Correction'];
const BRANCHES = ['Jakarta Selatan', 'Tangerang (BSD)', 'Bekasi', 'Bandung'];
const SLOTS = ['08:00 – 10:00', '10:00 – 12:00', '13:00 – 15:00', '15:00 – 17:00', '17:00 – 19:00'];
const REQUIRED = ['service', 'branch', 'date', 'slot', 'car', 'plate', 'wa'] as const;
type Field = (typeof REQUIRED)[number];
type FormState = Record<Field, string> & { note: string };
const EMPTY: FormState = { service: '', branch: '', date: '', slot: '', car: '', plate: '', wa: '', note: '' };

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % testimonials.length), 6000);
    return () => clearTimeout(t);
  }, [i, paused]);

  const t = testimonials[i];
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h2 className="display h-lg">
        Apa kata <strong>klien kami</strong>
      </h2>

      <div className="crop mt-10">
        <div className="photo aspect-[16/10] w-full">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={t.image}
              src={t.image}
              alt={t.alt}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-9 min-h-[13rem] md:min-h-[11rem]" aria-live={paused ? 'polite' : 'off'}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="text-[clamp(1.25rem,2vw,1.7rem)] font-light leading-snug text-frost">“{t.quote}”</blockquote>
            <figcaption className="mt-5 text-[0.95rem]">
              <span className="font-semibold text-frost">{t.name}</span>
              <span className="text-mist"> — {t.car}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex items-center gap-2" role="group" aria-label="Pilih testimoni">
        {testimonials.map((x, idx) => (
          <button
            key={x.name}
            onClick={() => setI(idx)}
            aria-label={`Testimoni ${idx + 1}: ${x.name}`}
            aria-current={idx === i}
            className="group py-3"
          >
            <span className={`block h-[3px] transition-all duration-500 ${idx === i ? 'w-14 bg-lamp' : 'w-7 bg-frost/25 group-hover:bg-frost/50'}`} />
          </button>
        ))}
        <span className="ml-3 text-[0.8rem] text-mist">Testimoni contoh untuk demo.</span>
      </div>
    </div>
  );
}

function BookingForm() {
  const [f, setF] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [minDate, setMinDate] = useState('');
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const filled = REQUIRED.filter((k) => f[k].trim() !== '').length;
  const pct = Math.round((filled / REQUIRED.length) * 100);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // demo only: swap this timeout for the real WhatsApp / API hand-off
    setTimeout(() => setStatus('done'), 1100);
  };

  if (status === 'done') {
    return (
      <div id="booking" className="flex min-h-[32rem] flex-col justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lamp"><CheckIcon className="h-6 w-6" strokeWidth={2.4} /></span>
        <h2 className="display h-lg mt-8">Slot <strong>tercatat</strong></h2>
        <p className="mt-5 max-w-[30rem] text-[1.02rem] leading-relaxed text-slate">
          {f.service} · {f.branch} · {f.date} pukul {f.slot}. Tim kami akan mengonfirmasi ke {f.wa} lewat WhatsApp.
        </p>
        <p className="mt-3 text-[0.8rem] text-slate">Demo: form belum terhubung ke backend atau WhatsApp.</p>
        <button onClick={() => { setF(EMPTY); setStatus('idle'); }} className="link-line mt-8 self-start text-[0.95rem] !text-ink">Buat booking lain</button>
      </div>
    );
  }

  return (
    <div id="booking">
      <h2 className="display h-lg">
        Book slot <strong>mobilmu</strong>
      </h2>
      <p className="mt-4 text-[0.98rem] text-slate">Isi form di bawah, kami akan konfirmasi via WhatsApp.</p>

      <div className="mt-8" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Kelengkapan form">
        <div className="h-[3px] w-full bg-ink/15"><div className="h-full bg-ink transition-[width] duration-500 [transition-timing-function:var(--ease-out-expo)]" style={{ width: `${pct}%` }} /></div>
        <p className="num mt-2 text-[0.8rem] text-slate">{filled}/{REQUIRED.length} terisi</p>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="b-service" className="field-label">Layanan</label>
          <select id="b-service" required value={f.service} onChange={set('service')} className="field">
            <option value="" disabled>Pilih layanan</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-branch" className="field-label">Cabang</label>
          <select id="b-branch" required value={f.branch} onChange={set('branch')} className="field">
            <option value="" disabled>Pilih cabang</option>
            {BRANCHES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-date" className="field-label">Tanggal</label>
          <input id="b-date" type="date" required min={minDate} value={f.date} onChange={set('date')} className="field" />
        </div>
        <div>
          <label htmlFor="b-slot" className="field-label">Jam</label>
          <select id="b-slot" required value={f.slot} onChange={set('slot')} className="field">
            <option value="" disabled>Pilih jam</option>
            {SLOTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-car" className="field-label">Tipe mobil</label>
          <input id="b-car" type="text" required autoComplete="off" placeholder="BMW X3" value={f.car} onChange={set('car')} className="field" />
        </div>
        <div>
          <label htmlFor="b-plate" className="field-label">Plat nomor</label>
          <input id="b-plate" type="text" required autoComplete="off" placeholder="B 1234 ABC" value={f.plate} onChange={set('plate')} className="field uppercase" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-wa" className="field-label">WhatsApp</label>
          <input id="b-wa" type="tel" inputMode="tel" required autoComplete="tel" placeholder="0812-3456-7890" value={f.wa} onChange={set('wa')} className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-note" className="field-label">Catatan (opsional)</label>
          <textarea id="b-note" rows={2} value={f.note} onChange={set('note')} placeholder="Kondisi cat, permintaan khusus" className="field resize-none" />
        </div>
        <button type="submit" disabled={status === 'loading'} className="btn btn-ink mt-2 sm:col-span-2 disabled:cursor-wait disabled:opacity-80">
          {status === 'loading' ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              Mengirim…
            </>
          ) : (
            <>Book Sekarang <ArrowRightIcon className="h-4 w-4" strokeWidth={2} /></>
          )}
        </button>
      </form>
    </div>
  );
}

export default function TestimonialBooking() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-bay px-5 py-24 sm:px-8 md:py-32 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:pr-16">
        <Testimonials />
      </div>
      <div className="on-light bg-primer px-5 py-24 text-ink sm:px-8 md:py-32 lg:pl-16 lg:pr-[max(2rem,calc((100vw-1440px)/2+2rem))]" style={{ colorScheme: 'light' }}>
        <BookingForm />
      </div>
    </section>
  );
}
