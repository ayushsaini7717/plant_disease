// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { Smartphone, Mail, Lock, User, Wifi, WifiOff } from "lucide-react"

// interface AuthScreenProps {
//   onAuth: (role: "farmer" | "officer", user: any) => void
//   isOnline: boolean
// }

// export function AuthScreen({ onAuth, isOnline }: AuthScreenProps) {
//   const [mode, setMode] = useState<"farmer" | "officer">("farmer")
//   const [phone, setPhone] = useState("")
//   const [otp, setOtp] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showOtp, setShowOtp] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const handleFarmerAuth = async () => {
//     setLoading(true)
//     // Simulate OTP verification
//     setTimeout(() => {
//       onAuth("farmer", { phone, name: "കർഷകൻ" })
//       setLoading(false)
//     }, 1000)
//   }

//   const handleGuestMode = () => {
//     onAuth("farmer", { phone: "guest", name: "അതിഥി" })
//   }

//   const handleOfficerAuth = async () => {
//     setLoading(true)
//     // Simulate JWT login
//     setTimeout(() => {
//       onAuth("officer", { email, name: "Agricultural Officer" })
//       setLoading(false)
//     }, 1000)
//   }

//   const sendOtp = () => {
//     setShowOtp(true)
//   }

//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-lime-500/10" />

//       {/* Floating farm elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{ y: [-20, 20, -20] }}
//           transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
//           className="absolute top-20 left-10 text-green-400/20 text-6xl"
//         >
//           🌾
//         </motion.div>
//         <motion.div
//           animate={{ y: [20, -20, 20] }}
//           transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
//           className="absolute top-40 right-20 text-lime-400/20 text-4xl"
//         >
//           🌱
//         </motion.div>
//         <motion.div
//           animate={{ y: [-15, 15, -15] }}
//           transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
//           className="absolute bottom-32 left-20 text-green-500/20 text-5xl"
//         >
//           🚜
//         </motion.div>
//       </div>

//       {/* Connectivity status */}
//       <div className="absolute top-4 right-4 flex items-center gap-2 text-sm">
//         {isOnline ? (
//           <div className="flex items-center gap-1 text-green-400">
//             <Wifi className="w-4 h-4" />
//             <span>Online</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-1 text-yellow-400">
//             <WifiOff className="w-4 h-4" />
//             <span>Offline</span>
//           </div>
//         )}
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >
//         <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-8">
//           {/* Role selector */}
//           <div className="flex mb-8 bg-slate-800/50 rounded-lg p-1">
//             <button
//               onClick={() => setMode("farmer")}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                 mode === "farmer"
//                   ? "bg-gradient-to-r from-green-400 to-lime-500 text-slate-900"
//                   : "text-white/70 hover:text-white"
//               }`}
//             >
//               <User className="w-4 h-4 inline mr-2" />
//               കർഷകൻ
//             </button>
//             <button
//               onClick={() => setMode("officer")}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                 mode === "officer"
//                   ? "bg-gradient-to-r from-green-400 to-lime-500 text-slate-900"
//                   : "text-white/70 hover:text-white"
//               }`}
//             >
//               <Mail className="w-4 h-4 inline mr-2" />
//               Officer
//             </button>
//           </div>

//           {mode === "farmer" ? (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-white mb-2">സ്വാഗതം</h2>
//                 <p className="text-white/70">Your Digital Krishi Officer</p>
//               </div>

//               {!showOtp ? (
//                 <div className="space-y-4">
//                   <div>
//                     <Input
//                       type="tel"
//                       placeholder="Mobile Number"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
//                     />
//                   </div>
//                   <Button
//                     onClick={sendOtp}
//                     disabled={!phone || loading}
//                     className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600 font-semibold py-3"
//                   >
//                     <Smartphone className="w-4 h-4 mr-2" />
//                     Send OTP
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <Input
//                       type="text"
//                       placeholder="Enter OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleFarmerAuth}
//                     disabled={!otp || loading}
//                     className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600 font-semibold py-3"
//                   >
//                     {loading ? "Verifying..." : "Verify OTP"}
//                   </Button>
//                 </div>
//               )}

//               <div className="text-center">
//                 <Button
//                   variant="ghost"
//                   onClick={handleGuestMode}
//                   className="text-white/70 hover:text-white hover:bg-white/10"
//                 >
//                   Continue as Guest
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-white mb-2">Officer Login</h2>
//                 <p className="text-white/70">Agricultural Department Portal</p>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <Input
//                     type="email"
//                     placeholder="Email Address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleOfficerAuth}
//                   disabled={!email || !password || loading}
//                   className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600 font-semibold py-3"
//                 >
//                   <Lock className="w-4 h-4 mr-2" />
//                   {loading ? "Signing in..." : "Sign In"}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </Card>
//       </motion.div>
//     </div>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Wifi, WifiOff } from "lucide-react"
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"
import { useState } from "react"
import { Nav } from "react-day-picker"

interface AuthScreenProps {
  isOnline: boolean
}

export function AuthScreen({ isOnline }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("login")

  return (
    
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-lime-500/10" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-10 text-green-400/20 text-6xl"
        >
          🌾
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-40 right-20 text-lime-400/20 text-4xl"
        >
          🌱
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-32 left-20 text-green-500/20 text-5xl"
        >
          🚜
        </motion.div>
      </div>
      {/* Connectivity status */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-sm">
        {isOnline ? (
          <div className="flex items-center gap-1 text-green-400">
            <Wifi className="w-4 h-4" />
            <span>Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-yellow-400">
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-8">
          {/* If already signed in, show user menu */}
          <SignedIn>
            <div className="flex justify-center">
              <UserButton />
            </div>
          </SignedIn>

          {/* If signed out, show login/signup UI */}
          <SignedOut>
            {/* Mode switch */}
            <div className="flex mb-8 bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === "login"
                    ? "bg-gradient-to-r from-green-400 to-lime-500 text-slate-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === "signup"
                    ? "bg-gradient-to-r from-green-400 to-lime-500 text-slate-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Clerk Auth Components */}
            <div className="flex justify-center">
              {mode === "login" ? (
                <SignIn
                  appearance={{
                    elements: {
                      rootBox:
                        "bg-transparent w-full text-white [&>*]:w-full [&>*]:bg-transparent",
                    },
                  }}
                  path="/sign-in"
                  routing="path"
                  signUpUrl="/sign-up"
                  afterSignInUrl="/"
                />
              ) : (
                <SignUp
                  appearance={{
                    elements: {
                      rootBox:
                        "bg-transparent w-full text-white [&>*]:w-full [&>*]:bg-transparent",
                    },
                  }}
                  path="/sign-up"
                  routing="path"
                  signInUrl="/sign-in"
                  afterSignUpUrl="/"
                />
              )}
            </div>

            {/* Alternative buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </Card>
      </motion.div>
    </div>
  )
}

