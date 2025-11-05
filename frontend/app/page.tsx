"use client";
import { motion } from 'framer-motion';
import * as React from "react";
import { useRouter } from 'next/navigation';
import { Mic, Camera, MessageCircle, Users, Clock, Languages, TrendingUp, Phone } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';
import { useLanguage } from './LanguageContext';
import { translations } from './translation';

export default function KrishiLanding() {
  const { language } = useLanguage();
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-lime-500/10" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 text-green-400/20 text-6xl">🌾</motion.div>
        <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-40 right-20 text-lime-400/20 text-4xl">🌱</motion.div>
        <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-32 left-20 text-green-500/20 text-5xl">🚜</motion.div>
        <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-1/2 right-10 text-green-300/20 text-3xl">🌿</motion.div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div className="text-center max-w-4xl mx-auto" initial="initial" animate="animate" variants={stagger}>
            <div className='absolute top-2 right-4'><LanguageDropdown/></div>
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">Team GENESIS</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t.title}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              {t.advisory}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button onClick={()=>router.push("image-query")} className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                {t.diseaseIdentifier}
              </button>
              <button onClick={()=>router.push("/assistant")} className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
                <MessageCircle size={20} />
                {t.askQuery}
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {Object.values(t.cards).map((card, idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-green-400 text-2xl font-bold">{card.title}</div>
                  <div className="text-slate-300 text-sm">{card.subtitle}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Challenge Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">{t.challenge.heading}</h2>
              <p className="text-xl text-slate-300">{t.challenge.subheading}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Current Problems */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-red-400 mb-4">{t.challenge.currentProblems.title}</h3>
                <ul className="text-slate-300 space-y-3">
                  {t.challenge.currentProblems.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-green-400 mb-4">{t.challenge.solution.title}</h3>
                <ul className="text-slate-300 space-y-3">
                  {t.challenge.solution.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">{t.features.heading}</h2>
            <p className="text-xl text-slate-300">{t.features.subheading}</p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial="initial" whileInView="animate" variants={stagger} viewport={{ once: true }}>
            {t.features.list.map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {/* Icon mapping based on index */}
                  {idx === 0 && <Languages className="text-green-400" size={24} />}
                  {idx === 1 && <Camera className="text-green-400" size={24} />}
                  {idx === 2 && <TrendingUp className="text-green-400" size={24} />}
                  {idx === 3 && <Clock className="text-green-400" size={24} />}
                  {idx === 4 && <Phone className="text-green-400" size={24} />}
                  {idx === 5 && <Users className="text-green-400" size={24} />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Real Queries Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">{t.realQueries.heading}</h2>
            <p className="text-xl text-slate-300">{t.realQueries.subheading}</p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="initial" whileInView="animate" variants={stagger} viewport={{ once: true }}>
            {t.realQueries.list.map((query, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <div className="text-green-400 font-medium mb-2">{query.category}</div>
                <div className="text-white text-lg mb-2">"{query.malayalam}"</div>
                <div className="text-slate-400 text-sm">"{query.english}"</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Expected Impact Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div className="bg-gradient-to-r from-green-500/10 to-lime-500/10 border border-green-500/20 rounded-2xl p-8" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">{t.expectedImpact.heading}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {t.expectedImpact.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-bold text-green-400 mb-2">{item.title}</div>
                    <p className="text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div className="text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">{t.cta.heading}</h2>
            <p className="text-xl text-slate-300 mb-8">{t.cta.subheading}</p>
            <button onClick={()=>router.push("/assistant")} className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-lg font-semibold text-xl transition-colors duration-200 inline-flex items-center gap-3">
              <Mic size={24} />
              {t.cta.button}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
