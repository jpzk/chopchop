import React from 'react';

export const themes = {
  light: {
    foreground: '#000',
    background: '#eee',
    selectedFg: '#000',
    selectedBg: '#d0d0d0',
  },
  dark: {
    foreground: '#fff',
    background: '#222',
    selectedFg: '#fff',
    selectedBg: '#444',

  },
};

export const fonts = {
  sans: { 
    fontFamily: "Sans"
  },
  serif: { 
    fontFamily: "Georgia"
  },
  mono: {
    fontFamily: "Monospace"
  }
}

export const zooms = {
  normal: "1vw",
  bigger: "2vw",
  extra: "3vw"
}

export const ThemeContext = React.createContext(themes.dark);
export const FontContext = React.createContext(fonts.sans);
export const ZoomContext = React.createContext(zooms.normal);
