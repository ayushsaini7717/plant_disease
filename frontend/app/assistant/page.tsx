"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Mic, MicOff, ArrowLeft, Bot, User, Cloud, Sun, CloudRain,
  Wind, Droplets, Eye, Compass, Clock, MapPin,
  AlertTriangle, TrendingUp
} from "lucide-react";

type MessageType = "ai" | "user";

interface AIResponse {
  response: string;      // Malayalam
  translation: string;   // English
}

interface Message {
  id: number;
  type: MessageType;
  content: string;
  translation?: string;
  timestamp: Date;
}

interface WeatherForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  rain: number;
}

interface WeatherAlert {
  type: string;
  title: string;
  malayalam: string;
  message: string;
  malayalamMessage: string;
}

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    malayalam: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    uvIndex: number;
    pressure: number;
  };
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
}

interface AIResponse {
  question?: string;
  response: string;
  translation: string;
}


export default function AIAssistantDashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷി ഓഫീസറാണ്. കൃഷിയെക്കുറിച്ച് എന്തെങ്കിലും സംശയങ്ങൾ ചോദിക്കൂ.",
      translation:
        "Hello! I am your Digital Krishi Officer. Feel free to ask me any farming-related questions.",
      timestamp: new Date(Date.now() - 300000),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // ✅ Weather API integration
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Roorkee&appid=d8cb7a67f4d5d13e48ac78169104a784&units=metric`
        );
        const data = await response.json();

        const degToCompass = (deg: number) => {
          const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
          return directions[Math.round(deg / 45) % 8];
        };

        const mappedWeather: WeatherData = {
          location: `${data.name}, ${data.sys.country}`,
          current: {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            malayalam: "കാലാവസ്ഥാ വിവരം",
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            windDirection: degToCompass(data.wind.deg),
            visibility: data.visibility / 1000,
            uvIndex: 0, // only available via OneCall API
            pressure: data.main.pressure,
          },
          forecast: [],
          alerts: [],
        };

        setWeatherData(mappedWeather);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, []);

const generateAIResponse = async (userMessage: string): Promise<AIResponse> => {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Answer the following farming question. 
1. First give the answer in Malayalam. 
2. Then give English translation, separated by "---".

Question: ${userMessage}
                  `.trim(),
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    // Safely extract AI text
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!aiText) {
      return {
        response: "ക്ഷമിക്കണം, ഞാൻ ഉത്തരം കണ്ടെത്താനായില്ല.",
        translation: "Sorry, I couldn’t generate a response.",
      };
    }

    // Split Malayalam and English if separator is used
    const [malayalam, english] = aiText.split(/---+/);

    return {
      response: malayalam?.trim() || aiText,
      translation: english?.trim() || "",
    };
  } catch (err) {
    console.error("Gemini API error:", err);
    return {
      response: "സർവറിൽ പ്രശ്നമുണ്ടായി.",
      translation: "There was an issue with the server.",
    };
  }
};

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    setTimeout(() => {
        const fetchAIResponse = async () => {
            const aiResponse = await generateAIResponse(currentMessage);
            const aiMessage: Message = {
              id: Date.now() + 1,
              type: "ai",
              content: aiResponse.response,
              translation: aiResponse.translation,
              timestamp: new Date(),
            };
      
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }
        fetchAIResponse();
    }, 2000);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getWeatherIcon = (condition: string) => {
    const desc = condition.toLowerCase();
    if (desc.includes("cloud")) return <Cloud className="text-slate-400" size={24} />;
    if (desc.includes("rain")) return <CloudRain className="text-blue-400" size={24} />;
    return <Sun className="text-yellow-400" size={24} />;
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-lime-500/10" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="container mx-auto px-4 py-4 border-b border-slate-700/50">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <button className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-500/10">
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Bot className="text-green-400" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">AI Krishi Assistant</h1>
                  <p className="text-sm text-slate-300">Online • Weather-Aware</p>
                </div>
              </div>
            </div>

            {weatherData ? (
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
                <MapPin className="text-green-400" size={16} />
                <span className="text-white text-sm">{weatherData.location}</span>
              </div>
            ) : (
              <span className="text-slate-400 text-sm">Loading weather...</span>
            )}
          </motion.div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <motion.div
            className="w-80 bg-slate-800/30 backdrop-blur-sm border-r border-slate-700/50 p-4 overflow-y-auto"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {weatherData && (
              <>
                {/* Current Weather */}
                <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Current Weather</h3>
                    <Clock className="text-slate-400" size={16} />
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    {getWeatherIcon(weatherData.current.condition)}
                    <div>
                      <div className="text-3xl font-bold text-white">
                        {weatherData.current.temperature}°C
                      </div>
                      <div className="text-sm text-slate-300">
                        {weatherData.current.condition}
                      </div>
                      <div className="text-xs text-slate-400">
                        {weatherData.current.malayalam}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Droplets className="text-blue-400" size={16} />
                      <span className="text-slate-300">
                        {weatherData.current.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="text-slate-400" size={16} />
                      <span className="text-slate-300">
                        {weatherData.current.windSpeed} km/h
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="text-slate-400" size={16} />
                      <span className="text-slate-300">
                        {weatherData.current.visibility} km
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="text-slate-400" size={16} />
                      <span className="text-slate-300">
                        {weatherData.current.windDirection}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {weatherData.alerts.length > 0 &&
                  weatherData.alerts.map((alert, i) => (
                    <div
                      key={i}
                      className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="text-yellow-400" size={16} />
                        <h4 className="font-semibold text-yellow-400">{alert.title}</h4>
                      </div>
                      <p className="text-sm text-slate-300 mb-1">{alert.message}</p>
                      <p className="text-xs text-slate-400">{alert.malayalamMessage}</p>
                    </div>
                  ))}

                {/* Forecast */}
                {weatherData.forecast.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      4-Day Forecast
                    </h3>
                    <div className="space-y-3">
                      {weatherData.forecast.map((day, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            {getWeatherIcon(day.condition)}
                            <div>
                              <div className="text-sm font-medium text-white">
                                {day.day}
                              </div>
                              <div className="text-xs text-slate-400">
                                {day.condition}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-white">
                              {day.high}°/{day.low}°
                            </div>
                            <div className="text-xs text-blue-400">
                              {day.rain}% rain
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="text-green-400" size={16} />
                    <h4 className="font-semibold text-green-400">Weather Tips</h4>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• High humidity - watch for fungal diseases</li>
                    <li>• മഴയ്ക്ക് മുമ്പ് വയൽ തയ്യാറാക്കുക</li>
                    <li>• Good temperature for crop growth</li>
                  </ul>
                </div>
              </>
            )}
          </motion.div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xl flex gap-3 ${
                        message.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {message.type === "user" ? <User size={20} /> : <Bot size={20} />}
                      </div>

                      <div
                        className={`rounded-2xl p-4 ${
                          message.type === "user"
                            ? "bg-green-500 text-white"
                            : "bg-slate-800/50 backdrop-blur-sm text-white border border-slate-700"
                        }`}
                      >
                        <div className="mb-2">{message.content}</div>
                        {message.translation && (
                          <div className="text-sm opacity-75 border-t border-slate-600 pt-2 mt-2">
                            {message.translation}
                          </div>
                        )}
                        <div className="text-xs opacity-50 mt-2">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-700/50 p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ചോദിക്കാം... (Ask in Malayalam or English...)"
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 resize-none focus:outline-none focus:border-green-500 min-h-[60px] max-h-32"
                  />

                  <div className="flex gap-2 mt-2 flex-wrap">
                    <button
                      onClick={() =>
                        setCurrentMessage("നെല്ല് കൃഷിക്ക് എന്താണ് നല്ല കാലാവസ്ഥ?")
                      }
                      className="text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors"
                    >
                      Rice farming weather
                    </button>
                    <button
                      onClick={() => setCurrentMessage("മഴയ്ക്ക് മുമ്പ് എന്ത് ചെയ്യണം?")}
                      className="text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors"
                    >
                      Pre-rain care
                    </button>
                    <button
                      onClick={() => setCurrentMessage("കീടനാശിനി എപ്പോൾ തളിക്കണം?")}
                      className="text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors"
                    >
                      Pesticide timing
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={toggleRecording}
                    className={`p-3 rounded-xl transition-colors ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    }`}
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim()}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/30 text-white p-3 rounded-xl transition-colors disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
