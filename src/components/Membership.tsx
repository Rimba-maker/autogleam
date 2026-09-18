// src/components/Membership.tsx
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Plan {
  name: string;
  price: string;
  popular?: boolean;
  /** values in the same order as ROWS; null = not part of the plan */
  values: (string | null)[];
}

const ROWS = ['Wash inklusif', 'Detailing Standard', 'Diskon', 'Pickup delivery', 'Priority slot'];

const plans: Plan[] = [
  { name: 'Weekly Wash Pass', price: 'Rp 380k', values: ['4x Express Wash', null, '10% premium service', null, 'Ya'] },
  { name: 'Bi-Weekly Premium', price: 'Rp 580k', popular: true, values: ['2x Premium Wash', null, '15% detailing', 'Gratis', null] },
  { name: 'Unlimited Pass', price: 'Rp 1,5jt', values: ['Unlimited Express Wash', '1x setiap 3 bulan', '20% semua specialty service', null, 'Ya'] },
];

const Cell = ({ v }: { v: string | null }) =>
  v ? <>{v}</> : <><span aria-hidden="true" className="text-mist">—</span><span className="sr-only">Tidak termasuk</span></>;

export default function Membership() {
  return (
    <section id="membership" className="bg-bay-2 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1.6fr_1fr] md:items-end">
          <h2 className="display h-xl">
            Wash pass <strong>membership</strong>
          </h2>
          <p className="lead text-mist-2 md:justify-self-start">Mobil selalu bersih, tanpa repot booking setiap minggu.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* desktop: one spec sheet, plans as columns */}
          <table className="hidden w-full border-collapse text-left md:table">
            <caption className="sr-only">Perbandingan paket Wash Pass Membership per bulan</caption>
            <thead>
              <tr>
                <td className="w-[19%]" />
                {plans.map((p) => (
                  <th key={p.name} scope="col" className={`px-7 pb-8 pt-7 align-bottom font-normal ${p.popular ? 'border-t-[3px] border-lamp bg-bay-3' : 'border-t border-frost/20'}`}>
                    {p.popular && <span className="wide-caps mb-3 block text-[0.7rem] text-lamp">Paling populer</span>}
                    <span className="display block text-[1.05rem] font-semibold">{p.name}</span>
                    <span className="mt-5 flex items-baseline gap-2">
                      <span className="num text-[clamp(1.8rem,2.6vw,2.5rem)] leading-none text-frost">{p.price}</span>
                      <span className="text-sm text-mist">/bulan</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r} className="border-t border-frost/12">
                  <th scope="row" className="py-5 pr-6 text-[0.8rem] font-normal text-mist-2">{r}</th>
                  {plans.map((p) => (
                    <td key={p.name} className={`px-7 py-5 text-[0.98rem] ${p.popular ? 'bg-bay-3' : ''}`}><Cell v={p.values[i]} /></td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-frost/12">
                <td />
                {plans.map((p) => (
                  <td key={p.name} className={`px-7 pb-2 pt-7 ${p.popular ? 'bg-bay-3 pb-7' : ''}`}>
                    <a href="#booking" className={`btn w-full ${p.popular ? 'btn-lamp' : 'btn-ghost'}`}>
                      Join <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* mobile: the same sheet, one plan at a time */}
          <div className="grid gap-12 md:hidden">
            {plans.map((p) => (
              <div key={p.name} className={p.popular ? 'border-t-[3px] border-lamp pt-6' : 'border-t border-frost/20 pt-6'}>
                {p.popular && <span className="wide-caps mb-2 block text-[0.7rem] text-lamp">Paling populer</span>}
                <h3 className="display text-[1.05rem] font-semibold">{p.name}</h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[clamp(1.8rem,2.6vw,2.5rem)] leading-none">{p.price}</span>
                  <span className="text-sm text-mist">/bulan</span>
                </p>
                <dl className="mt-6">
                  {ROWS.map((r, i) => (
                    <div key={r} className="flex items-baseline justify-between gap-6 border-t border-frost/12 py-3 text-[0.95rem]">
                      <dt className="text-mist-2">{r}</dt>
                      <dd className="text-right"><Cell v={p.values[i]} /></dd>
                    </div>
                  ))}
                </dl>
                <a href="#booking" className={`btn mt-6 w-full ${p.popular ? 'btn-lamp' : 'btn-ghost'}`}>
                  Join {p.name} <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
        <p className="mt-10 text-[0.8rem] text-mist">Harga contoh untuk demo.</p>
      </div>
    </section>
  );
}
