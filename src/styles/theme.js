import {createTheme} from "@mui/material";

export const theme = createTheme({
    mobileSize: '580px',
    desktopSize: '1024px',
    laptopSize: '1440px',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1025,
            lg: 1441,
            xl: 1920,
        }
    }
})`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    position: relative;
  }

`