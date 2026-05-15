/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mission dashboard brand colors
        primary: '#3B82F6',      // Blue
        success: '#10B981',      // Green
        warning: '#F59E0B',      // Amber
        danger: '#EF4444',       // Red
        dark: '#1F2937',         // Dark gray
        darker: '#111827',       // Darker gray
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { 'text-shadow': '0 0 10px rgba(34, 211, 238, 0.5)' },
          '50%': { 'text-shadow': '0 0 20px rgba(34, 211, 238, 0.8)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.5)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.5)',
        'neon-purple': '0 0 20px rgba(147, 51, 234, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

