import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
    red?: string;
    honeydew?: string;
    powderblue?: string;
    celadonblue?: string;
    prussianblue?: string;
    eerieblack?: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    red?: string;
    honeydew?: string;
    powderblue?: string;
    celadonblue?: string;
    prussianblue?: string;
    eerieblack?: string;
  }
}


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#a8dadcff',
    },
    secondary: {
      main: '#f1faeeff',
    },
    background: {
      default: "#191919"
    },

    // @ts-ignore
    red: '#e63946ff',
    honeydew: '#f1faeeff',
    powderblue: '#a8dadcff',
    celadonblue: '#457b9dff',
    prussianblue: '#1d3557ff',
    eerieblack: '#191919',
  },
  typography: {
    // @ts-ignore
    fontFamily: ["Inter"],
    fontSize: 14,
  },

};
const theme = createTheme(themeOptions)


export default theme;