import { DefaultTheme } from 'styled-components';

// Define a theme with color and breakpoint values
const theme: DefaultTheme = {
  colors: {
    primary: '#1e90ff', // DodgerBlue
    secondary: '#f0f8ff', // AliceBlue
    text: '#000',
    background: '#fff',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    laptop: '1280px',
  },
};

export default theme;
