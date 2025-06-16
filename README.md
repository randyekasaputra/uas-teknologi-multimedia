# Aplikasi Kompresi File

Aplikasi web untuk kompresi berbagai jenis file seperti gambar, PDF, dokumen, dan video. Dibangun menggunakan Next.js dan dapat di-deploy di Vercel.

## Fitur Utama

- Kompresi file gambar (JPG, PNG, WebP)
- Kompresi file PDF
- Kompresi file dokumen (DOCX, XLSX, PPTX)
- Kompresi file video (MP4, WebM)
- Antarmuka pengguna yang intuitif dan responsif
- Dukungan drag-and-drop untuk upload file
- Tampilan progress kompresi
- Download file hasil kompresi

## Persyaratan Sistem

- Node.js versi 18.0.0 atau lebih baru
- NPM versi 9.0.0 atau lebih baru
- Browser modern (Chrome, Firefox, Safari, Edge)

## Instalasi

1. Clone repository:
```bash
git clone https://github.com/randyekasaputra/uas-teknologi-multimedia.git
cd apk-kompresidata
```

2. Install dependensi:
```bash
npm install
```

3. Jalankan aplikasi dalam mode development:
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:3000`

## Panduan Penggunaan

### Halaman Utama
- Halaman utama menampilkan informasi tentang aplikasi dan fitur-fiturnya
- Klik tombol "Mulai Kompresi" untuk menuju ke halaman kompresi

### Halaman Kompresi
1. Upload File
   - Klik area upload atau drag-and-drop file ke area tersebut
   - File yang didukung: JPG, PNG, WebP, PDF, DOCX, XLSX, PPTX, MP4, WebM
   - Maksimum ukuran file: 100MB

2. Pilih Jenis Kompresi
   - Pilih jenis kompresi yang sesuai dengan tipe file
   - Untuk gambar: Pilih kualitas kompresi (Low, Medium, High)
   - Untuk PDF: Pilih level kompresi (Low, Medium, High)
   - Untuk dokumen: Pilih format output (PDF, DOCX)
   - Untuk video: Pilih kualitas video (Low, Medium, High)

3. Proses Kompresi
   - Klik tombol "Kompres File"
   - Tunggu hingga proses kompresi selesai
   - Progress bar akan menampilkan status kompresi

4. Download Hasil
   - Setelah kompresi selesai, file hasil akan otomatis terdownload
   - Nama file akan ditambahkan suffix "_compressed"
   - File hasil akan disimpan di folder Downloads

## Deployment

Aplikasi dapat di-deploy ke Vercel dengan langkah-langkah berikut:

1. Buat akun di [Vercel](https://vercel.com)
2. Hubungkan repository GitHub dengan Vercel
3. Pilih repository yang akan di-deploy
4. Klik "Deploy"

## Teknologi yang Digunakan

- Next.js 15.3.3
- React 18
- Tailwind CSS
- Sharp (untuk kompresi gambar)
- PDF-lib (untuk kompresi PDF)
- FFmpeg (untuk kompresi video)

## Troubleshooting

### Masalah Umum

1. File tidak bisa diupload
   - Pastikan ukuran file tidak melebihi 100MB
   - Pastikan format file didukung
   - Coba refresh halaman

2. Kompresi gagal
   - Pastikan koneksi internet stabil
   - Coba kompresi dengan kualitas yang lebih rendah
   - Pastikan ada ruang penyimpanan yang cukup

3. File hasil tidak terdownload
   - Periksa folder Downloads
   - Pastikan browser mengizinkan download
   - Coba gunakan browser berbeda

## Kontak dan Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository GitHub atau hubungi pengembang.

## Lisensi

Aplikasi ini dilisensikan di bawah [MIT License](LICENSE).
