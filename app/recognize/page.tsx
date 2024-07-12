'use client';

import './App.css';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import Webcam from 'react-webcam';
import { useRef, useEffect, useState } from 'react';
import * as cam from '@mediapipe/camera_utils';
import VerificationProcess from 'src/components/recognize/VerificationProcess';
import VerificationSuccess from 'src/components/recognize/VerificationSuccess';
import VerificationFailed from 'src/components/recognize/VerificationFailed';
import { apiRequest } from 'src/utils/request';
import to from 'await-to-js';
import dynamic from 'next/dynamic';

const VerificationNoSSR = dynamic(() => import('src/components/recognize/Verification'), {
  ssr: false,
});

declare global {
  interface Window {
    drawConnectors: any;
  }
}

interface ResponseData {
  return: [
    {
      confidence_level: number;
      user_name: string;
    },
  ];
  status: string;
}

function App() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [capturedImages, setCapturedImages] = useState<Buffer[]>([]);
  const maxImages = 1; // Jumlah maksimum gambar yang akan di-capture
  const [captureActive, setCaptureActive] = useState<boolean>(false); // State variable to control capture mode
  const [faceDetected, setFaceDetected] = useState<boolean>(false); // State variable to track face detection
  const [faceCaptured, setFaceCaptured] = useState<number>(0);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [base64ImageData, setBase64ImageData] = useState<string>('');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const [verificationSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let camera: cam.Camera | null = null;

      const faceMesh = new FaceMesh({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        selfieMode: true,
      });

      faceMesh.onResults(onResults);

      if (webcamRef.current && webcamRef.current.video) {
        camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            const videoElement = webcamRef.current?.video;
            if (videoElement) {
              await faceMesh.send({ image: videoElement });
            }
          },
          width: 480,
          height: 480,
        });
        camera.start();
      }

      // Memantau perubahan state faceDetected
      const faceDetectionInterval = setInterval(() => {
        stopCaptureIfFaceNotDetected();
      }, 100); // Cek setiap 0.1 detik

      // Membersihkan interval saat komponen unmount
      return () => {
        clearInterval(faceDetectionInterval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faceDetected]);

  if (typeof window !== 'undefined') {
    window.drawConnectors = () => {
      return;
    };
  }

  const onResults = (results: any) => {
    if (typeof navigator !== 'undefined') {
      if (canvasRef.current && webcamRef.current) {
        canvasRef.current.width = webcamRef.current.video?.videoWidth || 480;
        canvasRef.current.height = webcamRef.current.video?.videoHeight || 480;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');
        canvasCtx?.save();

        canvasCtx?.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Periksa apakah gambar dari results.image sudah tersedia
        if (results.image) {
          canvasCtx?.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height,
          );
        } else {
          console.error(
            'Gambar dari results.image tidak tersedia atau belum dimuat.',
          );
        }

        if (results.multiFaceLandmarks.length) {
          setFaceDetected(true); // Wajah terdeteksi
        } else {
          setFaceDetected(false); // Tidak ada wajah terdeteksi
          setFaceCaptured(0); // Set faceCaptured kembali ke 0 ketika tidak ada wajah terdeteksi
        }

        if (canvasCtx && captureActive) {
          const frame_size = 200; // Ukuran kotak
          const gray_color = 'rgba(255, 255, 255, 0.7)'; // Warna latar belakang garis siku
          const frame_thickness = 5; // Ketebalan garis siku
          const line_length = 20; // Panjang garis siku

          // Hitung posisi agar garis siku tetap di tengah-tengah canvas
          const canvasWidth = canvasElement.width;
          const canvasHeight = canvasElement.height;
          const frame_left = (canvasWidth - frame_size) / 2;
          const frame_top = (canvasHeight - frame_size) / 2 - 70;
          const frame_right = frame_left + frame_size;
          const frame_bottom = frame_top + frame_size;

          // Gambar garis siku di sudut-sudut frame
          canvasCtx.strokeStyle = gray_color;
          canvasCtx.lineWidth = frame_thickness;
          const radius = 20;
          canvasCtx.beginPath();

          // Sudut atas kiri
          canvasCtx.moveTo(frame_left + radius + line_length, frame_top);
          canvasCtx.arcTo(
            frame_left,
            frame_top,
            frame_left,
            frame_top + radius,
            radius,
          );
          canvasCtx.lineTo(frame_left, frame_top + line_length + line_length);

          // Sudut atas kanan
          canvasCtx.moveTo(frame_right - radius - line_length, frame_top);
          canvasCtx.arcTo(
            frame_right,
            frame_top,
            frame_right,
            frame_top + radius + line_length,
            radius,
          );
          canvasCtx.lineTo(frame_right, frame_top + line_length + line_length);

          // Sudut bawah kanan
          canvasCtx.moveTo(frame_right - radius - line_length, frame_bottom);
          canvasCtx.arcTo(
            frame_right,
            frame_bottom,
            frame_right,
            frame_bottom - radius - line_length,
            radius,
          );
          canvasCtx.lineTo(
            frame_right,
            frame_bottom - line_length - line_length,
          );

          // Sudut bawah kiri
          canvasCtx.moveTo(frame_left + radius + line_length, frame_bottom);
          canvasCtx.arcTo(
            frame_left,
            frame_bottom,
            frame_left,
            frame_bottom - radius - line_length,
            radius,
          );
          canvasCtx.lineTo(
            frame_left,
            frame_bottom - line_length - line_length,
          );

          canvasCtx.stroke();
        }

        if (results.multiFaceLandmarks && captureActive) {
          if (
            typeof window !== 'undefined' &&
            typeof navigator !== 'undefined' &&
            typeof window.drawConnectors === 'function'
          ) {
            const connect = window.drawConnectors;

            for (const landmarks of results.multiFaceLandmarks) {
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
                color: '#C0C0C070',
                lineWidth: 1,
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
                color: '#FF3030',
                lineWidth: 2,
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
                color: '#FF3030',
                lineWidth: 2,
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
                color: '#FF3030',
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
                color: '#30FF30',
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
                color: '#30FF30',
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {
                color: '#30FF30',
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
                color: '#E0E0E0',
              });
              connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
                color: '#E0E0E0',
              });
            }
          } else {
            console.error(
              'window.drawConnectors is not available or not a function',
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== undefined && typeof navigator === 'object') {
      const captureInterval = 1200; // Ganti dengan interval yang Anda inginkan (dalam milidetik)

      const uefFaceCaptureInterval = setInterval(() => {
        if (captureActive && canvasRef.current && faceDetected) {
          if (capturedImages.length < maxImages) {
            const videoElement = webcamRef.current?.video;

            if (videoElement) {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = videoElement.videoWidth;
              canvas.height = videoElement.videoHeight;
              ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              const imageData = ctx?.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              );
              canvas.width = imageData?.width as any;
              canvas.height = imageData?.height as any;
              ctx?.putImageData(imageData!, 0, 0);

              const base64Data = canvas.toDataURL('image/jpeg');

              if (imageData?.data) {
                const buffer = imageData.data.buffer as ArrayBuffer; // Pastikan data tidak undefined
                setCapturedImages(prevImages => [
                  ...prevImages,
                  buffer as unknown as Buffer,
                ]);
                setFaceCaptured(prevFaceCaptured => prevFaceCaptured + 1);
                setBase64ImageData(base64Data);
              }
            }
          } else {
            setVideoPlaying(true);
          }
        }
      }, captureInterval);

      return () => {
        clearInterval(uefFaceCaptureInterval);
      };
    }
  }, [captureActive, faceDetected, maxImages, capturedImages]);

  useEffect(() => {
    // only upload to server when base64ImageData value is changed
    uploadImageToServer(base64ImageData);
  }, [base64ImageData]);

  const stopCaptureIfFaceNotDetected = () => {
    if (typeof window !== undefined && typeof navigator === 'object') {
      if (!faceDetected) {
        setCaptureActive(true); // Menonaktifkan mode capture
        setVideoPlaying(false); // Menghentikan video
        setCapturedImages([]); // Mengatur capturedImages menjadi array kosong
      } else if (faceCaptured === maxImages && !videoPlaying) {
        setCaptureActive(false); // Menyalakan mode capture kembali
        setVideoPlaying(true); // Memainkan video
        setCapturedImages([]); // Mengatur capturedImages menjadi array kosong
      }
    }
  };

  async function uploadImageToServer(image_data: any) {
    setResponseData(null);
    const [err, res] = await to(
      apiRequest.post(
        '/face-recognition/identify',
        {
          image: image_data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    if (err) {
      console.log('Gagal mengunggah gambar ke server', err);

      return;
    }
    
    setResponseData(res.data.risetai);
  }

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        height: '100vh',
        marginTop: '0',
      }}
    >
      <div className='content-container'>
        <div className='webcam-container'>
          <Webcam hidden ref={webcamRef} className='responsive-webcam' />
          <canvas ref={canvasRef} className='responsive-canvas'></canvas>
        </div>

        {!verificationSuccess && faceDetected ? (
          <VerificationProcess />
        ) : (
          <VerificationNoSSR />
        )}
        {responseData?.status === '200' && (
          <VerificationSuccess responseData={responseData} />
        )}

        {capturedImages.length === maxImages &&
          responseData?.status === '411' && <VerificationFailed />}
      </div>
    </div>
  );
}

export default App;
