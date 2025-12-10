// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pcbPan: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-40px,-40px,0)" },
        },
        traceHorizontal: {
          "0%": { strokeDashoffset: 260 },
          "100%": { strokeDashoffset: 0 },
        },
        traceVertical: {
          "0%": { strokeDashoffset: 320 },
          "100%": { strokeDashoffset: 0 },
        },
        chipGlow: {
          "0%,100%": { boxShadow: "0 0 0 rgba(56,189,248,0)" },
          "50%": { boxShadow: "0 0 40px rgba(56,189,248,0.45)" },
        },
        ledPulse: {
          "0%,100%": { opacity: 0.2, transform: "scale(0.9)" },
          "50%": { opacity: 1, transform: "scale(1.3)" },
        },
      },
      animation: {
        "pcb-pan": "pcbPan 45s linear infinite",
        "trace-h": "traceHorizontal 4s linear infinite",
        "trace-v": "traceVertical 6s linear infinite",
        "chip-glow": "chipGlow 4s ease-in-out infinite",
        "led-pulse": "ledPulse 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
