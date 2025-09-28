const {createTheme} = require("@mui/material");
export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#e91e63',
        },
        secondary: {
            main: '#5A20CB',
        },
        background: {
            default: '#000000',
            paper: '#0d0d0d',
        },
        textColor :{
            main : "#111111"
        }
    },

});

