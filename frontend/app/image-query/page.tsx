"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  X,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Info,
  Zap,
  Shield,
  Droplets,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageDropdown from "../LanguageDropdown";

interface CNNAnalysisResult {
  predicted: string;
  confidence: number; 
  description: string;
  cause: string;
  cure: string[];
}

interface SelectedImage {
  file: File;
  url: string | ArrayBuffer | null;
  name: string;
}

export default function CropDiseaseDashboard() {  
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<CNNAnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const analyzeCropDisease = async (imageFile: File) => {
    try {
      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append("file", imageFile, imageFile.name);

      const response = await fetch(
        `http://127.0.0.1:8000/predict/?lang=${language}`,
        { method: "POST", body: formData }
      );


      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result: CNNAnalysisResult = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing crop disease:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage({ file, url: e.target?.result ?? null, name: file.name });
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    if (selectedImage) analyzeCropDisease(selectedImage.file);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background & Floating icons */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-lime-500/10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 text-green-400/20 text-4xl">🌿</motion.div>
        <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-40 right-20 text-lime-400/20 text-3xl">🔬</motion.div>
        <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 9, repeat: Infinity }} className="absolute bottom-32 left-20 text-green-500/20 text-4xl">🍃</motion.div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4">
              <button onClick={()=>router.push("/")} className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-500/10">
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Crop Disease Detection</h1>
                <p className="text-slate-300">AI-powered disease identification and treatment recommendations</p>
              </div>
            </div>
            <div className="bg-green-500/20 px-4 py-2 rounded-lg flex gap-2 items-center">
              <span><LanguageDropdown/></span>
              <span className="text-green-400 font-medium">CNN Model v2.1</span>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div className="space-y-6" variants={fadeInUp} initial="initial" animate="animate">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">Upload Crop Image</h2>
                <p className="text-slate-300 mb-6">Upload a clear image of your affected crop for AI analysis</p>

                {!selectedImage ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                      dragActive ? "border-green-400 bg-green-500/10" : "border-slate-600 hover:border-green-500 hover:bg-green-500/5"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto mb-4 text-green-400" size={48} />
                    <h3 className="text-xl font-semibold text-white mb-2">Drop your image here</h3>
                    <p className="text-slate-400 mb-4">or click to browse files</p>
                    <div className="flex justify-center gap-2 text-sm text-slate-500">
                      <span>Supports: JPG, PNG, WEBP</span>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={typeof selectedImage.url === "string" ? selectedImage.url : undefined} alt="Selected crop" className="w-full h-64 object-cover" />
                      <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 truncate">{selectedImage.name}</span>
                      <button onClick={startAnalysis} disabled={isAnalyzing} className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        {isAnalyzing ? (
                          <>
                            <Loader className="animate-spin" size={20} />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap size={20} />
                            Analyze Disease
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-blue-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">Photography Tips</h3>
                </div>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Take photos in good natural lighting</li>
                  <li>• Focus on the affected area clearly</li>
                  <li>• Include some healthy parts for comparison</li>
                  <li>• Avoid blurry or heavily shadowed images</li>
                </ul>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div className="space-y-6" variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
              {isAnalyzing && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center">
                  <div className="animate-pulse mb-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
                      <Loader className="animate-spin text-green-400" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your Crop...</h3>
                  <p className="text-slate-300 mb-4">Our AI is examining the image for disease patterns</p>
                </div>
              )}

              {analysisResult && !isAnalyzing && (
                <motion.div className="space-y-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  {/* Disease Identification */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="text-red-400" size={24} />
                      <h3 className="text-xl font-semibold text-white">Disease Detected</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-2xl font-bold text-white">{analysisResult.predicted}</h4>
                          <span className="px-3 py-1 rounded-full text-sm font-medium text-gray-400 bg-gray-500/20">
                            {/* Optionally map confidence to severity */}
                            Risk
                          </span>
                        </div>
                        <p className="text-slate-300">{analysisResult.description}</p>
                        <p className="text-slate-400 text-sm mt-1">{analysisResult.cause}</p>
                      </div>

                      <div className="bg-green-500/10 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Confidence Level</span>
                          <span className="text-green-400 font-semibold">{(analysisResult.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                          <div className="bg-green-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${analysisResult.confidence * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Recommendations */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="text-green-400" size={24} />
                      <h3 className="text-xl font-semibold text-white">Treatment Recommendations</h3>
                    </div>
                    <div className="space-y-2">
                      {analysisResult.cure.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => window.print()} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                      Save Report
                    </button>
                    <button onClick={resetAnalysis} className="flex-1 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white py-3 rounded-lg font-semibold transition-colors">
                      Analyze Another
                    </button>
                  </div>
                </motion.div>
              )}

              {!selectedImage && !isAnalyzing && !analysisResult && (
                <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 text-center">
                  <Camera className="mx-auto mb-4 text-slate-500" size={48} />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No Image Selected</h3>
                  <p className="text-slate-500">Upload a crop image to get started with AI disease detection</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
