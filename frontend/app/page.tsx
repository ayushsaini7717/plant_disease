"use client";
import { motion } from 'framer-motion';

import * as React from "react";
import { useRouter } from 'next/navigation';
import { Mic, Camera, MessageCircle, Users, Clock, Languages, TrendingUp, Phone } from 'lucide-react';

export default function KrishiLanding() {
  const router=useRouter();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-lime-500/10" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 text-green-400/20 text-6xl"
        >
          🌾
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 right-20 text-lime-400/20 text-4xl"
        >
          🌱
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-32 left-20 text-green-500/20 text-5xl"
        >
          🚜
        </motion.div>
        <motion.div
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-1/2 right-10 text-green-300/20 text-3xl"
        >
          🌿
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">
                Team GENESIS
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Digital <span className="text-green-400">Krishi</span> Saathi
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
            >
              AI-powered farming advisory system that brings expert agricultural guidance 
              directly to farmers in their native language
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <button onClick={()=>router.push("/image-query")} className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
                <MessageCircle size={20} />
                Ask Your Query
              </button>
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Learn More
              </button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-green-400 text-2xl font-bold">24/7</div>
                <div className="text-slate-300 text-sm">Always Available</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-green-400 text-2xl font-bold">Malayalam</div>
                <div className="text-slate-300 text-sm">Native Language</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-green-400 text-2xl font-bold">AI-Powered</div>
                <div className="text-slate-300 text-sm">Smart Answers</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-green-400 text-2xl font-bold">Expert-Level</div>
                <div className="text-slate-300 text-sm">Reliable Advice</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">The Challenge We're Solving</h2>
              <p className="text-xl text-slate-300">Farmers need expert advice, but access is limited</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-red-400 mb-4">Current Problems</h3>
                <ul className="text-slate-300 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Agri officers and helplines are overburdened</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Expert advice is rarely accessible when needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Services don't scale across diverse regions and languages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Limited support for different literacy levels</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-green-400 mb-4">Our Solution</h3>
                <ul className="text-slate-300 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>AI-powered system available 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Instant expert-level advice in Malayalam</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Context-aware and personalized recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Voice and image support for all literacy levels</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
            <p className="text-xl text-slate-300">Everything a modern farmer needs in one platform</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Languages className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Natural Language Processing</h3>
              <p className="text-slate-300">Ask questions in Malayalam via voice or text. Our AI understands context and farming terminology.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Multimodal Input</h3>
              <p className="text-slate-300">Upload crop photos, record voice notes, or type queries. Our system handles all formats seamlessly.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Context-Aware Advice</h3>
              <p className="text-slate-300">Personalized recommendations based on your location, crop type, season, and farming history.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">24/7 Availability</h3>
              <p className="text-slate-300">Get instant answers anytime, anywhere. No more waiting for office hours or busy helplines.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Escalation</h3>
              <p className="text-slate-300">Complex queries are escalated to local agri officers with full context and AI suggestions.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Continuous Learning</h3>
              <p className="text-slate-300">The system improves with every interaction, incorporating feedback from farmers and local experts.</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Real Farmer Queries</h2>
            <p className="text-xl text-slate-300">See how our AI helps with everyday farming challenges</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <div className="text-green-400 font-medium mb-2">Pest Management</div>
              <div className="text-white text-lg mb-2">"വാഴയിൽ ഇല പുള്ളി രോഗത്തിന് ഏത് കീടനാശിനി?"</div>
              <div className="text-slate-400 text-sm">"Which pesticide for leaf spot in my banana?"</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <div className="text-green-400 font-medium mb-2">Weather Advisory</div>
              <div className="text-white text-lg mb-2">"മഴക്കാലത്ത് നെൽ വിത്ത് എങ്ങനെ സംരക്ഷിക്കാം?"</div>
              <div className="text-slate-400 text-sm">"How to protect rice seeds during monsoon?"</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <div className="text-green-400 font-medium mb-2">Subsidy Information</div>
              <div className="text-white text-lg mb-2">"സോളാർ പാനലിന് സബ്സിഡി എവിടെ അപേക്ഷിക്കാം?"</div>
              <div className="text-slate-400 text-sm">"Where to apply for solar panel subsidy?"</div>
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="bg-gradient-to-r from-green-500/10 to-lime-500/10 border border-green-500/20 rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Expected Impact</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">Instant Access</div>
                  <p className="text-slate-300">Expert-level farming advice available to all farmers, anytime</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">Bridge Gaps</div>
                  <p className="text-slate-300">Connect farmers with extension systems and support networks</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">Automate Support</div>
                  <p className="text-slate-300">Support Krishibhavans by handling first-level farmer queries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Farming?</h2>
            <p className="text-xl text-slate-300 mb-8">Join the digital agriculture revolution with your AI-powered farming assistant</p>
            <button onClick={()=>router.push("/image-query")} className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-lg font-semibold text-xl transition-colors duration-200 inline-flex items-center gap-3">
              <Mic size={24} />
              Start Your Query Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
