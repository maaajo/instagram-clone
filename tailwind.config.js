module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        blue: {
          medium: '#005c98'
        },
        black: {
          light: '#262626',
          faded: '#00000059'
        },
        gray: {
          base: '#616161',
          background: '#fafafa',
          primary: '#dbdbdb'
        },
        red: {
          primary: '#ed4956'
        }
      },
      fill: theme => ({
        red: theme('colors.red.primary')
      })
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};
