'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useLanguage } from '../../context/LanguageContext';

// Helper to safely get nested translation keys
const getTranslation = (translations: any, key: string): any => {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : undefined, translations);
};

// Menentukan warna untuk bounding box
const BBOX_COLORS = [
  '#FF3838', '#FF9D97', '#FF701F', '#FFB21D', '#CFD231', '#48F284',
  '#97FFB4', '#1F8DFF', '#70B8FF', '#A463F2', '#D297FF', '#FF1DCE',
];

export default function TensorflowPage() {
  const { t, translations } = useLanguage();
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [status, setStatus] = useState('Memuat Model...');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // 1. Optimalisasi Performa: Load model dengan backend WebGL (GPU)
  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatus('Menginisialisasi GPU backend...');
        await tf.setBackend('webgl');
        await tf.ready();
        setStatus('Memuat model COCO-SSD...');
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setStatus('Model siap digunakan.');
      } catch (error) {
        console.error('Gagal memuat model:', error);
        setStatus('Error: Gagal memuat model. Periksa konsol.');
      }
    };
    loadModel();
  }, []);

  // Membersihkan resource saat komponen unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const drawBoundingBoxes = useCallback((detections: cocoSsd.DetectedObject[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const target = mode === 'upload' ? imageRef.current : videoRef.current;
    if (!target) return;

    canvas.width = target.clientWidth;
    canvas.height = target.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px sans-serif';
    ctx.textBaseline = 'top';

    detections.forEach((det, i) => {
      const [x, y, width, height] = det.bbox;
      const label = `${det.class} (${Math.round(det.score * 100)}%)`;
      const color = BBOX_COLORS[i % BBOX_COLORS.length];

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = color;
      ctx.fillRect(x - 1, y - 18, textWidth + 6, 18);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, x + 2, y - 16);
    });
  }, [mode]);

  // 2. Deteksi Objek pada Gambar (Mode Unggah)
  const detectObjectsOnImage = useCallback(async () => {
    if (!model || !imageRef.current) return;
    setStatus('Mendeteksi objek pada gambar...');

    const tensor = tf.browser.fromPixels(imageRef.current);
    const predictions = await model.detect(tensor);
    tensor.dispose(); // Manajemen memori manual

    drawBoundingBoxes(predictions);
    setStatus('Deteksi selesai.');
  }, [model, drawBoundingBoxes]);

  // 3. Deteksi Objek Real-Time (Mode Kamera) - Diperbaiki
  const detectObjectsOnVideo = useCallback(async () => {
    if (!model || !videoRef.current || !isCameraOn) return;

    const video = videoRef.current;
    if (video.readyState >= 3) {
      const tensor = tf.browser.fromPixels(video);
      const predictions = await model.detect(tensor);
      tensor.dispose(); // Manajemen memori manual
      drawBoundingBoxes(predictions);
    }

    animationFrameId.current = requestAnimationFrame(detectObjectsOnVideo);
  }, [model, isCameraOn, drawBoundingBoxes]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      // Clear previous detections
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
      setStatus('Kamera dimatikan.');
    } else {
      try {
        setStatus('Mengakses kamera...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsCameraOn(true);
          setStatus('Kamera aktif, deteksi dimulai.');
          detectObjectsOnVideo();
        }
      } catch (error) {
        console.error('Error mengakses kamera:', error);
        setStatus('Error: Tidak dapat mengakses kamera.');
      }
    }
  };

  // Safely get translation arrays and objects
  const howToUseData = getTranslation(translations, 'tensorflow.how_to_use') || { sections: [] };
  const privacyPoints = getTranslation(translations, 'tensorflow.privacy.points') || [];

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Deteksi Objek Real-Time</h1>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4">
          Gunakan model COCO-SSD untuk mendeteksi objek dalam gambar atau melalui kamera langsung.
        </p>

        <div className="mt-6 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <p className="text-sm font-medium">Status: <span className="font-normal text-blue-600 dark:text-blue-400">{status}</span></p>
        </div>

        <div className="flex gap-4 mt-6 border-b pb-4">
          <button onClick={() => setMode('upload')} disabled={!model} className={`px-4 py-2 rounded-md font-semibold ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
            Unggah Gambar
          </button>
          <button onClick={() => setMode('camera')} disabled={!model} className={`px-4 py-2 rounded-md font-semibold ${mode === 'camera' ? 'bg-blue-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
            Kamera Langsung
          </button>
        </div>

        <div className="mt-6 relative">
          {mode === 'upload' && (
            <div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
              {imageUrl && (
                <>
                  <div className="relative max-w-2xl mx-auto">
                      <img ref={imageRef} src={imageUrl} alt="Preview" className="w-full h-auto rounded-lg" onLoad={detectObjectsOnImage} crossOrigin="anonymous"/>
                      <canvas ref={canvasRef} className="absolute top-0 left-0"/>
                  </div>
                  <button onClick={detectObjectsOnImage} disabled={!model || !imageUrl} className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-neutral-400">
                    Deteksi Ulang
                  </button>
                </>
              )}
            </div>
          )}

          {mode === 'camera' && (
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <video ref={videoRef} className="w-full h-auto rounded-lg bg-black" playsInline/>
                <canvas ref={canvasRef} className="absolute top-0 left-0"/>
              </div>
              <button onClick={toggleCamera} disabled={!model} className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-neutral-400">
                {isCameraOn ? 'Matikan Kamera' : 'Nyalakan Kamera'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 pt-12 border-t max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-sm">
          {/* How to Use */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">💡 {howToUseData.title}</h3>
            <p className="text-neutral-700 dark:text-neutral-300">{howToUseData.intro}</p>
            {howToUseData.sections.map((section: { title: string, points: string[] }, i: number) => (
              <div key={i} className="pt-2">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">{section.title}</h4>
                <ul className="space-y-1 list-disc list-inside text-neutral-700 dark:text-neutral-300 mt-1">
                  {section.points.map((point: string, j: number) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Why */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">🚀 {t('tensorflow.why.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300">{t('tensorflow.why.body')}</p>
          </div>

          {/* Privacy */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">🛡️ {t('tensorflow.privacy.title')}</h3>
            <ul className="space-y-2 list-disc list-inside text-neutral-700 dark:text-neutral-300">
                {privacyPoints.map((point: string, i: number) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}