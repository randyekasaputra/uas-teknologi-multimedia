import Link from 'next/link'
import { FaCloudUploadAlt, FaShieldAlt, FaRegClock, FaRegFileAlt, FaDownload, FaBolt } from 'react-icons/fa'
import { MdCompress } from 'react-icons/md'

export default function WelcomePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-blue-500 to-purple-600 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-4">
            <FaBolt className="text-5xl md:text-6xl" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Kompresi File Online
            </h1>
          </div>
          <p className="text-lg md:text-xl leading-relaxed">
            Mendukung JPG, PNG, PDF, Word, PowerPoint, dan Video. Gratis, cepat, dan aman.
          </p>
          <Link
            href="/compress"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-colors"
          >
            <FaCloudUploadAlt className="text-xl" />
            Mulai Kompres File
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mengapa Memilih Layanan Kami?
          </h2>
          <p className="text-gray-600 text-lg">
            Solusi kompresi file terbaik dengan teknologi canggih dan keamanan terjamin
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <FaShieldAlt className="text-3xl text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Aman</h3>
            <p className="text-gray-600">
              File Anda diproses langsung di browser tanpa diunggah ke server. Privasi dan keamanan data terjamin sepenuhnya.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <FaRegClock className="text-3xl text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Super Cepat</h3>
            <p className="text-gray-600">
              Proses kompresi berlangsung dalam hitungan detik. Tidak perlu menunggu lama untuk mendapatkan hasil optimal.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
              <FaRegFileAlt className="text-3xl text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Multi Format</h3>
            <p className="text-gray-600">
              Mendukung berbagai format populer: JPG, PNG, PDF, Word, PowerPoint, dan file video. Satu solusi untuk semua kebutuhan.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Cara Kerja
          </h2>
          <p className="text-gray-600 text-lg">
            Proses kompresi file dalam 3 langkah mudah
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold mb-4">
              1
            </div>
            <FaCloudUploadAlt className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload File</h3>
            <p className="text-gray-600">
              Pilih file dari komputer Anda atau drag & drop ke area upload
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white text-xl font-bold mb-4">
              2
            </div>
            <FaBolt className="text-5xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Kompresi Otomatis</h3>
            <p className="text-gray-600">
              Sistem akan mengoptimalkan ukuran file secara otomatis dengan kualitas terbaik
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white text-xl font-bold mb-4">
              3
            </div>
            <FaDownload className="text-5xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Download Hasil</h3>
            <p className="text-gray-600">
              Unduh file yang telah dikompres dengan ukuran lebih kecil
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Compress Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Siap Mengompres File Anda?
          </h2>
          <p className="text-lg md:text-xl">
            Mulai sekarang dan rasakan kemudahan kompresi file online terbaik
          </p>
          <Link
            href="/compress"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-colors"
          >
            <FaCloudUploadAlt className="text-xl" />
            Mulai Kompres File Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4 text-center text-sm">
        <div className="max-w-6xl mx-auto space-y-2">
          <p>© 2024 Kompresi File Online. Semua hak dilindungi.</p>
          <p>Layanan gratis untuk mengompres file dengan aman dan cepat</p>
        </div>
      </footer>
    </div>
  )
}
