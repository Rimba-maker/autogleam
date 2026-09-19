// src/components/Products.tsx
import { asset } from '../lib/asset';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Chemical Guys', origin: 'USA' },
  { name: "Meguiar's", origin: 'USA' },
  { name: 'Gyeon Quartz', origin: 'Korea' },
  { name: 'Koch-Chemie', origin: 'Germany' },
  { name: 'CarPro', origin: 'Israel' },
  { name: '3M', origin: 'USA' },
  { name: 'Sonax', origin: 'Germany' },
  { name: "Adam's Polishes", origin: 'USA' },
];

export default function Products() {
  return (
    <section className="overflow-hidden bg-petrol text-frost">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 pt-24 sm:px-8 md:pt-36 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="display h-xl">
            Hanya produk <strong>premium</strong>
          </h2>
          <p className="lead mt-6 text-[#b9c7c6]">
            Kami hanya pakai produk dari brand detailing dunia. No murah-meriah, no sabun cuci piring.
          </p>
        </div>
        <div className="crop [--crop-color:rgba(232,239,238,.55)]">
          <div className="photo aspect-[16/10] w-full">
            <img src={asset('/img/products.webp')} alt="Detailer menerapkan produk dengan kuas pada dashboard mobil" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 pb-24 pt-4 sm:px-8 md:grid-cols-4 md:pb-32"
      >
        {brands.map((b) => (
          <motion.li
            key={b.name}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="border-t border-frost/20 py-5 pr-4"
          >
            <div className="display text-[clamp(1.05rem,1.7vw,1.5rem)] font-semibold">{b.name}</div>
            <div className="num mt-1 text-[0.8rem] text-[#a9bab9]">{b.origin}</div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
