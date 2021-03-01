const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  purge: {
    content: ['./src/**/*.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: (content) => [
        ...tailwindExtractor(content),
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group,
        ),
      ],
      keyframes: true,
    },
  },
  theme: {
    filter: {
      none: 'none',
      grayscale: 'grayscale(1)',
      invert: 'invert(1)',
      sepia: 'sepia(1)',
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(30px)',
      'blur-slight': 'blur(10px)',
      'blur-saturate': 'blur(30px) saturate(125%)',
      'blur-slight-saturate': 'blur(10px) saturate(125%)',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: {
        ...colors.gray,
        150: '#ECECEF',
        750: '#333338',
        650: '#484850',
      },
      red: colors.red,
      ocean: {
        100: '#d1e2fe',
        200: '#a2c5fe',
        300: '#74a8fd',
        400: '#458bfd',
        500: '#176efc',
        600: '#1258ca',
        700: '#0e4297',
        800: '#092c65',
        900: '#051632',
      },
      azure: {
        100: '#cde4f9',
        200: '#9bc9f2',
        300: '#68aeec',
        400: '#3693e5',
        500: '#0478df',
        600: '#0360b2',
        700: '#024886',
        800: '#023059',
        900: '#01182d',
      },
    },
    fontFamily: {
      sans:
        'Rubik, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      display:
        'Inter, Rubik, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      width: {
        4.5: '1.125rem',
        30: '7.5rem',
      },
      height: {
        4.5: '1.125rem',
        30: '7.5rem',
      },
      fontSize: {
        xxs: '0.75rem',
        xs: '0.8rem',
      },
      padding: {
        '2px': '2px',
        6.5: '1.625rem',
        9.5: '2.375rem',
      },
      margin: {
        6.5: '1.625rem',
        9.5: '2.375rem',
      },
    },
  },
  variants: {
    filter: ['responsive', 'dark'], // defaults to ['responsive']
    backdropFilter: ['responsive', 'dark'], // defaults to ['responsive']
    extend: {
      backgroundOpacity: ['dark'],
      scale: ['group-hover'],
      opacity: ['group-hover'],
      outline: ['dark', 'hover', 'focus-visible'],
      ringOpacity: ['dark', 'focus-visible'],
      ringWidth: ['hover', 'focus-visible'],
      ringOffsetWidth: ['hover', 'focus-visible'],
      ringOffsetColor: ['focus-visible'],
      height: ['hover'],
      borderWidth: ['focus-visible'],
      borderColor: ['focus-visible'],
      display: ['hover', 'group-hover'],
      padding: ['group-hover'],
      height: ['group-hover'],
    },
  },
  plugins: [require('tailwindcss-filters')],
};
