import React from 'react';

const themes = {
  dark: {
    color: 'blue',
  },
  light: {
    color: '#eee'
  }
};

const ThemeContext = React.createContext(themes.light);

export {
  themes,
  ThemeContext,
}