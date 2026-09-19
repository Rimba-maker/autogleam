// src/components/SpecialtyServices.tsx
import { asset } from '../lib/asset';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Specialty {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  packages: { name: string; price: string }[];
  includes: string;
  image: string;
  alt: string;
  pos: string;
  flip?: boolean;
  word: string;
  wordTop?: boolean;
}

const specialties: Specialty[] = [
  {
    id: 'ceramic',
    title: 'Ceramic Coating',
    subtitle: 'Proteksi tahan lama. Kilap maksimal.',
    desc: 'Melindungi cat dari sinar UV, kotoran burung, dan getah pohon — air langsung lari, debu sulit menempel.',
    packages: [
      { name: '1 Year Coating', price: 'Rp 2,5jt – 4jt' },
      { name: '3 Year Coating', price: 'Rp 5jt – 8jt' },
      { name: '5 Year Coating', price: 'Rp 9jt – 15jt' },
    ],
    includes: 'Termasuk paint correction, prep, aplikasi, dan warranty',
    image: asset('/img/spec-ceramic.webp'),
    alt: 'Butiran air pada lambang mobil hitam yang dilapisi coating',
    pos: '50% 64%',
    word: 'Ceramic',
    wordTop: true,
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    subtitle: 'Anti-gores. Self-healing.',
    desc: 'Lapisan film transparan tebal untuk menahan benturan kerikil dan goresan dalam pada area yang paling sering terkena.',
    packages: [
      { name: 'Partial PPF (front)', price: 'Rp 8jt – 15jt' },
      { name: 'Full Body PPF', price: 'Rp 25jt – 60jt' },
    ],
    includes: 'Self-healing TPU film, 10 tahun warranty',
    image: asset('/img/spec-ppf.webp'),
    alt: 'Lampu depan dan bodi hitam mengkilap sebuah mobil sport',
    pos: '50% 45%',
    flip: true,
    word: 'Film',
  },
  {
    id: 'polish',
    title: 'Paint Correction',
    subtitle: 'Mengembalikan kedalaman warna.',
    desc: 'Mengangkat swirl mark, baret halus, dan water spot langsung dari lapisan clear coat.',
    packages: [
      { name: '1-Stage Polish', price: 'Rp 1,5jt – 2,5jt' },
      { name: '2-Stage Polish', price: 'Rp 3jt – 5jt' },
      { name: 'Multi-Stage (heavy swirl)', price: 'Konsultasi' },
    ],
    includes: 'Mengangkat swirl, scratch ringan, water spot',
    image: asset('/img/spec-polish.webp'),
    alt: 'Pad polisher kuning memoles lampu depan dan bodi putih',
    pos: '50% 38%',
    word: 'Polish',
  },
];

function Panel({ item }: { item: Specialty }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  const wordX = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <article ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden max-md:pt-[42svh] md:items-center">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%] -z-10 max-md:bottom-auto max-md:top-0 max-md:h-[62svh]">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: item.pos }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        className={`absolute inset-0 -z-10 ${item.flip ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-bay via-bay/75 to-bay/10 max-md:bg-[linear-gradient(to_top,var(--color-bay)_0%,var(--color-bay)_50%,transparent_76%)]`}
        aria-hidden="true"
      />

      <motion.span
        aria-hidden="true"
        style={{ x: wordX }}
        className={`panel-word ${item.flip ? 'left-[3%]' : 'right-[3%]'} ${item.wordTop ? 'top-[14%] !bottom-auto' : ''}`}
      >
        {item.word}
      </motion.span>

      <div className={`relative z-10 mx-auto flex w-full max-w-[1440px] px-5 py-20 sm:px-8 ${item.flip ? 'md:justify-end' : ''}`}>
        <div className="w-full max-w-[36rem]">
          <h3 className="display h-lg font-semibold">{item.title}</h3>
          <p className="mt-3 text-[1.05rem] font-medium text-lamp">{item.subtitle}</p>
          <p className="lead mt-5 text-mist-2">{item.desc}</p>

          <dl className="mt-9 border-t border-frost/15">
            {item.packages.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between gap-6 border-b border-frost/15 py-3.5">
                <dt className="text-[0.95rem] text-frost">{p.name}</dt>
                <dd className="num text-[0.95rem] text-frost">{p.price}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[0.8rem] text-mist">{item.includes}</p>

          <a href="#booking" className="btn btn-ghost mt-8">
            Konsultasi {item.title} <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function SpecialtyServices() {
  return (
    <section id="specialty" className="overflow-x-clip bg-bay">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-40">
        <div className="spec-stage">
          <div className="spec-block" aria-hidden="true" />
          <span className="spec-word" aria-hidden="true">Protect</span>
          <div className="spec-shadow" aria-hidden="true" />
          <img
            src={asset('/img/specialty-car.webp')}
            alt="Lamborghini kuning, mobil yang layak dilindungi ceramic coating dan PPF"
            className="spec-car"
            width="1800"
            height="577"
            loading="lazy"
            decoding="async"
          />
          <div className="relative z-10 max-w-[30rem] p-6 pt-10 md:p-12">
            <h2 className="display h-xl">
              Specialty <strong>treatment</strong>
            </h2>
            <p className="lead mt-5 text-frost">Untuk yang serius melindungi investasi.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        {specialties.map((s) => (
          <Panel key={s.id} item={s} />
        ))}
      </div>
    </section>
  );
}
