import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2, Database, ShieldAlert, Activity, Terminal } from "lucide-react";
import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

const TerminalLine: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.1, delay }}
    className="font-terminal text-[10px] text-[var(--color-primary)]/40 flex gap-2"
  >
    <span className="text-[var(--color-primary)]/20">[{new Date().toLocaleTimeString()}]</span>
    <span>{text}</span>
  </motion.div>
);

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [logs, setLogs] = useState<string[]>(["SYSTEM_INITIALIZED", "AWAITING_INPUT..."]);

  useEffect(() => {
    const interval = setInterval(() => {
      const systemLogs = [
        "ENCRYPTING_PACKET_" + Math.random().toString(16).slice(2, 8).toUpperCase(),
        "UPLINK_STABLE",
        "DATABASE_RECON_COMPLETE",
        "REFRESHING_SHIELD_PROTOCOLS",
        "SYNCING_WITH_MAIN_HUB"
      ];
      setLogs(prev => [...prev.slice(-8), systemLogs[Math.floor(Math.random() * systemLogs.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setLogs(prev => [...prev, "INITIALIZING_SECURE_PHASE...", "TRANSMITTING_DATA_PACKETS..."]);

    try {
      await emailjs.sendForm(
        'service_f15qeyh',
        'template_ufdtxma',
        e.currentTarget,
        'zyZBglFT_bAaXNIVF'
      );
      setStatus("success");
      setLogs(prev => [...prev, "TRANSMISSION_COMPLETE_SUCCESS", "AWAITING_NEW_INPUT"]);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("error");
      setLogs(prev => [...prev, "CRITICAL_TRANSMISSION_FAILURE", "RETRY_PROTOCOL_AWAITING"]);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-32 flex items-center justify-center overflow-hidden cyber-grid bg-black/40">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/5 flex items-center justify-center border-t border-l border-[var(--color-primary)]/30 shadow-[0_0_30px_rgba(0,245,255,0.1)]">
              <Database className="w-8 h-8 text-[var(--color-primary)] opacity-80" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-gaming text-white uppercase tracking-tighter">DATA_LINK</h2>
          </motion.div>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
        </div>

        {/* MAINFRAME TERMINAL UI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 bg-[#050505]/80 backdrop-blur-3xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Top Decorative Bar */}
          <div className="lg:col-span-12 h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <span className="text-[10px] font-gaming text-white/30 tracking-widest ml-4">STATION_OS_V2.0.4</span>
            </div>
            <div className="flex items-center gap-4">
              <Activity className="w-3.5 h-3.5 text-[var(--color-primary)] animate-pulse" />
              <span className="text-[10px] font-terminal text-[var(--color-primary)]/60">UPLINK_ACTIVE</span>
            </div>
          </div>

          {/* Left Side: System Logs & Stats */}
          <div className="lg:col-span-4 border-r border-white/10 p-8 hidden lg:flex flex-col justify-between bg-black/20">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-[11px] font-gaming text-white tracking-[0.2em]">SYSTEM_LOGS</span>
              </div>
              <div className="space-y-3 font-terminal">
                {logs.map((log, i) => (
                  <TerminalLine key={i + log} text={log} delay={i * 0.1} />
                ))}
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[9px] font-gaming text-white/30 uppercase mb-2">Protocol</p>
                  <p className="text-xs font-terminal text-[var(--color-primary)] font-bold">WPA3_RSA4096</p>
                </div>
                <div>
                  <p className="text-[9px] font-gaming text-white/30 uppercase mb-2">Signal</p>
                  <p className="text-xs font-terminal text-green-500 font-bold">1.2ms_STABLE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-8 p-8 md:p-12 relative">
            {/* Corner Markers */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-primary)]/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-primary)]/20" />

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="text-[10px] font-gaming text-[var(--color-primary)] uppercase tracking-[0.3em] mb-3 block pl-1">Identity_Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="ENTER_NAME..."
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-terminal text-sm focus:border-[var(--color-primary)] focus:bg-white/[0.08] transition-all outline-none placeholder:text-white/10"
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-gaming text-[var(--color-primary)] uppercase tracking-[0.3em] mb-3 block pl-1">Data_Link_Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ENTER_EMAIL..."
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-terminal text-sm focus:border-[var(--color-primary)] focus:bg-white/[0.08] transition-all outline-none placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-gaming text-[var(--color-primary)] uppercase tracking-[0.3em] mb-3 block pl-1">Payload_Data</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="COMPOSE_YOUR_MESSAGE_HERE..."
                  className="w-full bg-white/5 border border-white/10 p-6 rounded-lg text-white font-terminal text-sm focus:border-[var(--color-primary)] focus:bg-white/[0.08] transition-all outline-none placeholder:text-white/10 resize-none leading-relaxed"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="group relative h-16 w-full bg-[var(--color-primary)] text-black font-black font-gaming text-lg tracking-widest flex items-center justify-center gap-4 transition-all overflow-hidden"
                style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 60%, 95% 100%, 0 100%, 0 40%)' }}
              >
                {status === "sending" ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  <>
                    INITIALIZE_LINK <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="relative mb-8">
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       className="w-32 h-32 border-2 border-dashed border-[var(--color-primary)] rounded-full opacity-20" 
                    />
                    <CheckCircle2 className="w-16 h-16 text-[var(--color-primary)] absolute inset-0 m-auto" />
                  </div>
                  <h3 className="text-3xl font-black font-gaming text-white mb-4 tracking-tighter">PACKAGE_DELIVERED</h3>
                  <p className="text-gray-500 font-terminal text-sm uppercase tracking-widest">Target received the uplink. Awaiting response sequence.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Global Contact Info Footer */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12">
          <ContactDetail icon={Mail} label="Comms" value="hemanthkumarreddy@gmail.com" />
          <ContactDetail icon={MapPin} label="Location" value="India [REDACTED]" />
          <ContactDetail icon={Phone} label="Uplink" value="+91 6302866572" />
        </div>
      </div>
    </section>
  );
}

const ContactDetail = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-6 group">
    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/50 transition-all shadow-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-[10px] font-gaming text-white/20 uppercase tracking-[0.2em] mb-1.5">{label}</p>
      <p className="text-sm md:text-base font-terminal text-gray-400 group-hover:text-white transition-colors">{value}</p>
    </div>
  </div>
);
