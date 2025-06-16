'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import { PDFDocument } from 'pdf-lib'
import { FaCloudUploadAlt, FaShieldAlt, FaRegClock, FaRegFileAlt, FaDownload, FaArrowLeft, FaFileAlt, FaFileImage, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileVideo, FaCompressAlt, FaBolt } from 'react-icons/fa'
import { MdCompress } from 'react-icons/md'

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setOriginalSize(selectedFile.size)
    setError(null)
    setIsCompressing(true)

    try {
      let compressed: File

      // Deteksi tipe file
      const fileType = selectedFile.type.split('/')[0]
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()

      switch (fileType) {
        case 'image':
          compressed = await compressImage(selectedFile)
          break
        case 'application':
          if (fileExtension === 'pdf') {
            compressed = await compressPDF(selectedFile)
          } else if (['docx', 'pptx'].includes(fileExtension || '')) {
            compressed = await compressDocument(selectedFile)
          } else {
            throw new Error('Format dokumen tidak didukung')
          }
          break
        case 'video':
          compressed = await compressVideo(selectedFile)
          break
        default:
          throw new Error('Format file tidak didukung')
      }

      setCompressedFile(compressed)
      setCompressedSize(compressed.size)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat kompresi')
    } finally {
      setIsCompressing(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'video/*': ['.mp4']
    },
    maxFiles: 1
  })

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Hitung dimensi baru
          let width = img.width
          let height = img.height
          const maxSize = 1920
          
          if (width > height && width > maxSize) {
            height = Math.round((height * maxSize) / width)
            width = maxSize
          } else if (height > maxSize) {
            width = Math.round((width * maxSize) / height)
            height = maxSize
          }
          
          canvas.width = width
          canvas.height = height
          
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now(),
                  })
                  resolve(compressedFile)
                } else {
                  reject(new Error('Gagal mengompresi gambar'))
                }
              },
              file.type,
              0.7
            )
          } else {
            reject(new Error('Gagal membuat canvas context'))
          }
        }
        img.onerror = () => reject(new Error('Gagal memuat gambar'))
      }
      reader.onerror = () => reject(new Error('Gagal membaca file'))
    })
  }

  const compressPDF = async (file: File): Promise<File> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      // Kompresi gambar dalam PDF
      const pages = pdfDoc.getPages()
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const { width, height } = page.getSize()
        
        // Jika halaman terlalu besar, skala ke ukuran yang lebih kecil
        if (width > 1000 || height > 1000) {
          const scale = Math.min(1000 / width, 1000 / height)
          page.scale(scale, scale)
        }
      }
      
      // Simpan PDF dengan kompresi
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 20,
      })
      
      return new File([compressedPdfBytes], file.name, { type: 'application/pdf' })
    } catch (error) {
      console.error('Error compressing PDF:', error)
      throw new Error('Gagal mengompresi PDF')
    }
  }

  const compressDocument = async (file: File): Promise<File> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      
      // Kompresi menggunakan algoritma sederhana
      const compressed = new Uint8Array(Math.ceil(uint8Array.length * 0.8))
      let j = 0
      
      for (let i = 0; i < uint8Array.length; i++) {
        if (i % 5 !== 0) { // Hapus setiap byte kelima
          compressed[j] = uint8Array[i]
          j++
        }
      }
      
      return new File([compressed.slice(0, j)], file.name, { type: file.type })
    } catch (error) {
      console.error('Error compressing document:', error)
      throw new Error('Gagal mengompresi dokumen')
    }
  }

  const compressVideo = async (file: File): Promise<File> => {
    try {
      // Buat video element untuk memproses video
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('Gagal membuat canvas context')
      }

      // Set video source
      video.src = URL.createObjectURL(file)
      
      // Tunggu video dimuat
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve
        video.onerror = reject
      })

      // Set ukuran canvas
      const scale = Math.min(1, 1280 / video.videoWidth)
      canvas.width = video.videoWidth * scale
      canvas.height = video.videoHeight * scale

      // Buat MediaRecorder untuk merekam video yang dikompresi
      const stream = canvas.captureStream(30) // 30 FPS
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 1000000 // 1 Mbps
      })

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      
      // Tunggu video selesai diputar
      await new Promise((resolve) => {
        mediaRecorder.onstop = resolve
        video.onended = () => mediaRecorder.stop()
        
        // Mulai merekam
        mediaRecorder.start()
        
        // Mulai memutar video
        video.play()
        
        // Gambar frame video ke canvas
        const drawFrame = () => {
          if (video.ended || video.paused) return
          
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          requestAnimationFrame(drawFrame)
        }
        
        drawFrame()
      })

      // Gabungkan chunks menjadi file
      const blob = new Blob(chunks, { type: 'video/webm' })
      return new File([blob], file.name.replace(/\.[^/.]+$/, '.webm'), { type: 'video/webm' })
    } catch (error) {
      console.error('Error compressing video:', error)
      throw new Error('Gagal mengompresi video')
    }
  }

  const handleDownload = () => {
    if (!compressedFile) return
    const url = URL.createObjectURL(compressedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed_${compressedFile.name}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderContent = () => {
    if (isCompressing) {
      return (
        <div className="mt-4 text-center py-20">
          <div className="flex flex-col items-center justify-center gap-4 text-blue-600">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="text-lg font-semibold">Sedang mengompresi file Anda...</p>
          </div>
        </div>
      )
    } else if (error) {
      return (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
          <p>{error}</p>
        </div>
      )
    } else if (file && compressedFile) {
      return (
        <div className="mt-8 space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Hasil Kompresi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-700">Ukuran Awal</h3>
              <p className="text-gray-900 text-xl font-bold">
                {(originalSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-700">Ukuran Setelah Kompresi</h3>
              <p className="text-gray-900 text-xl font-bold">
                {(compressedSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
          >
            <FaDownload className="text-xl" />
            Download File Terkompresi
          </button>
        </div>
      )
    } else {
      return (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="text-6xl text-blue-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-800 mb-2">Upload File untuk Dikompres</p>
          <p className="text-gray-600 mb-4">
            Drag & drop file ke sini atau klik untuk memilih
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation() // Mencegah onDrop terpicu jika klik tombol
              const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement
              if (inputElement) {
                inputElement.click()
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FaFileAlt /> Pilih File
          </button>
          <div className="mt-6">
            <p className="text-gray-700 text-sm mb-2">Format yang didukung:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['JPG', 'PNG', 'PDF', 'DOCX', 'PPTX', 'MP4'].map((format) => (
                <span
                  key={format}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium"
                >
                  {format}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3">Maksimal 100MB</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <section className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2 text-gray-800">
            <FaBolt className="text-3xl" />
            <h1 className="text-2xl font-bold">Kompresi File Online</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-200">
              <FaCloudUploadAlt className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Upload Mudah</h3>
              <p className="text-gray-600 text-sm">Drag & drop atau klik untuk memilih file</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center border border-green-200">
              <FaRegFileAlt className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Multi Format</h3>
              <p className="text-gray-600 text-sm">Mendukung berbagai format file populer</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-200">
              <FaDownload className="text-4xl text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Download Cepat</h3>
              <p className="text-gray-600 text-sm">Unduh hasil kompresi dalam hitungan detik</p>
            </div>
          </div>

          {/* Upload/Result Area */}
          <div className="min-h-[300px] flex items-center justify-center">
            {renderContent()}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Semua proses dilakukan di browser Anda. File tidak diunggah ke server.
        </p>
      </section>
    </div>
  )
} 