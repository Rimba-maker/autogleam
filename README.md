# AutoGleam Detailing

Landing page untuk **AutoGleam Detailing**, jasa cuci mobil dan detailing premium. *Beyond Clean. We Make It Gleam.*

Tampilannya mengambil suasana bay detailing di malam hari: satu lampu inspeksi keras, foto-foto yang di-grade seragam, dan mobil hasil cutout yang keluar dari frame.

## Isi halaman

Hero interaktif (kursor jadi lampu inspeksi), paket layanan, Specialty (ceramic coating, PPF, paint correction), slider before/after, proses detailing 8 langkah, produk, pickup & delivery, membership, testimoni, dan form booking.

> Harga, statistik, testimoni, dan cabang di halaman ini adalah **data contoh** untuk demo. Pasangan before/after adalah simulasi visual dari foto yang sama, bukan hasil pekerjaan asli.

## Stack

- [Astro 5](https://astro.build) (static site generation)
- React 19 untuk komponen interaktif (islands)
- Tailwind CSS v4
- Framer Motion
- Heroicons

## Menjalankan

Butuh Node.js yang didukung Astro 5 (18.20.8, 20.3+, atau 22+).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # hasil ke ./dist
npm run preview   # cek hasil build
```

## Struktur

```text
src/
├── components/   satu file per section
├── pages/        index.astro (susunan halaman, SEO, font)
└── styles/       global.css (token warna, font, kelas bersama)
public/
└── img/          foto WebP self-hosted
```

## Foto

Semua foto berasal dari [Unsplash](https://unsplash.com) (Unsplash License) dan sudah diolah agar tampil seragam. Ganti dengan dokumentasi pekerjaan asli sebelum rilis.
