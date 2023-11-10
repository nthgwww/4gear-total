/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif;']
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      width: {
        main: '1220px'
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '10': 'repeat(10, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      backgroundColor: {
        main: '#ee3131',
        overlay: 'rgba(0,0,0,0.7)'
      },
      colors: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': ' translateY(20px);',
            transform: 'translateY(20px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slide-top-sm': {
          '0%': {
            '-webkit-transform': ' translateY(8px);',
            transform: 'translateY(8px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-1000px);',
            transform: 'translateX(-1000px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': 'scale(0.5);',
            transform: 'scale(0.5);'
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top-sm 0.2s linear both;',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-center': 'scale-up-center 0.15s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;'
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms")({ strategy: 'class' }),
  ],

}