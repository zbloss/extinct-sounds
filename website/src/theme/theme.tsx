import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    // @ts-ignore
    fontFamily: ["Inter"],
    fontSize: 14,
  },

};

const theme = createTheme(themeOptions)


export default theme;