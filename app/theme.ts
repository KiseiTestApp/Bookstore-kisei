'use client';
import { createTheme } from '@mui/material/styles';
import {PaletteColorOptions} from "@mui/material";

declare module '@mui/material' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
    interface IconButtonPropsColorOverrides {
        neutral: true;
    }
}

declare module "@mui/material/styles" {
    interface Palette {
        lighter?: string;
        neutral: PaletteColor;
    }
    interface PaletteOptions {
        lighter?: string;
        neutral?: PaletteColorOptions;
    }

    interface PaletteColor {
        lighter?: string;
    }

    interface SimplePaletteColorOptions {
        lighter?: string;
    }
}
declare module '@mui/material/IconButton' {
    interface IconButtonColorOverrides {
        neutral: true;
    }
}

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-inter)',
    },
    palette: {
        primary: {
            lighter: '#e2f7ff',
            light: '#4DB0C9',
            main: '#219dbc',
            dark: '#085A71',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgb(247, 51, 120)',
            main: '#F50057',
            dark: 'rgb(171, 0, 60)',
            contrastText: '#000',
        },
        neutral: {
            lighter: '#F8F9FA',
            light: '#E9ECEF',
            main: '#495057',
            dark: '#343A40',
            contrastText: '#fff',
        }
    },
});

export default theme;
