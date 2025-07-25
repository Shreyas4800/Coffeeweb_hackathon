module.exports = {
  theme: {
    extend: {
      animation: {
        pulseGlow: "pulseGlow 3.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0px rgba(255, 203, 116, 0.3)",
          },
          "50%": {
            transform: "scale(1.015)",
            boxShadow: "0 0 30px rgba(255, 203, 116, 0.5)",
          },
        },
      },
    },
  },
};
