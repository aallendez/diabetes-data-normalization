/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './templates/*.html',
  './static/*.js',
],
  theme: {
    screens: {
      'sm': {'max': '799px'},
      'md': {'min': '800px'},
    },
    extend: {
      backgroundColor: ['disabled'],
      scale: ['hover', 'focus'],
      keyframes: {
        'fade-in-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '100%': { transform: 'translateY(-10px)', opacity: '1' },
        },
        'fade-out-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        'fade-in-left': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-right': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-in-20': {
          '0%': { opacity: '0' },
          '100%': { opacity: '.2' },
        },
        'fade-out-20': {
          '0%': { opacity: '.2' },
          '100%': { opacity: '0' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(.9)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.25s',
        'fade-in-up': 'fade-in-up 0.25s',
        'fade-out-up': 'fade-out-up 0.25s',
        'fade-in-left': 'fade-in-left 0.5s',
        'fade-in-right': 'fade-in-right 0.5s',
        'fade-in': 'fade-in-20 0.25s',
        'fade-out': 'fade-out-20 0.25s',
        'fade-in-20': 'fade-in-20 0.25s',
        'fade-out-20': 'fade-out-20 0.25s',
        'zoom-out': 'zoom-out 0.25s',
      },
    },
  },
  variants: {},
  plugins: [],
};