'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Loader2 } from 'lucide-react';

const BBOX_COLORS = [
  '#FF3838', '#FF9D97', '#FF701F', '#FFB21D', '#CFD231', '#48F284',
  '#97FFB4', '#1F8DFF', '#70B8FF', '#A463F2', '#D297FF', '#FF1DCE',
];

interface TensorflowDetectorProps {
  loadModelText: string;
  modelLoadedText: string;
  selectImageText: string;
  unsupportedFormatText: string;
}

const TensorflowDetector: React.FC<TensorflowDetectorProps> = ({
  loadModelText,
  modelLoadedText,
  selectImageText,
  unsupportedFormatText,
}) => {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [status, setStatus] = useState(loadModelText);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatus('Initializing GPU backend...');
        await tf.setBackend('webgl');
        await tf.ready();
        setStatus(loadModelText);
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setStatus(modelLoadedText);
      } catch (error) {
        console.error('Failed to load model:', error);
        setStatus('Error: Failed to load model. Check console.');
      }
    };
    loadModel();
  }, [loadModelText, modelLoadedText]);

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

  const detectObjectsOnImage = useCallback(async () => {
    if (!model || !imageRef.current) return;
    setStatus('Detecting objects...');

    const tensor = tf.browser.fromPixels(imageRef.current);
    const predictions = await model.detect(tensor);
    tensor.dispose();

    drawBoundingBoxes(predictions);
    setStatus(`Detection complete. Found ${predictions.length} objects.`);
  }, [model, drawBoundingBoxes]);

  const detectObjectsOnVideo = useCallback(async () => {
    if (!model || !videoRef.current || !isCameraOn) return;

    const video = videoRef.current;
    if (video.readyState >= 3) {
      const tensor = tf.browser.fromPixels(video);
      const predictions = await model.detect(tensor);
      tensor.dispose();
      drawBoundingBoxes(predictions);
    }

    animationFrameId.current = requestAnimationFrame(detectObjectsOnVideo);
  }, [model, isCameraOn, drawBoundingBoxes]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
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
      setStatus('Camera off.');
    } else {
      try {
        setStatus('Accessing camera...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsCameraOn(true);
          setStatus('Camera on, detection started.');
          detectObjectsOnVideo();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setStatus('Error: Could not access camera.');
      }
    }
  };

  if (!model) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-neutral-50 dark:bg-neutral-900 min-h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="mt-4 text-lg font-semibold">{status}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Please wait while the AI model is being prepared...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
        <p className="text-sm font-medium">Status: <span className="font-normal text-blue-600 dark:text-blue-400">{status}</span></p>
      </div>

      <div className="flex gap-4 mt-6 border-b pb-4">
        <button onClick={() => setMode('upload')} className={`px-4 py-2 rounded-md font-semibold ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
          Upload Image
        </button>
        <button onClick={() => setMode('camera')} className={`px-4 py-2 rounded-md font-semibold ${mode === 'camera' ? 'bg-blue-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
          Live Camera
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
                <button onClick={detectObjectsOnImage} disabled={!imageUrl} className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-neutral-400">
                  Redetect
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
            <button onClick={toggleCamera} className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">
              {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TensorflowDetector;
