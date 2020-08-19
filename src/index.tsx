import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#6699CC',
//       main: '#6699CC',
//       dark: '#6699CC',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#FFF275',
//       main: '#FFF275',
//       dark: '#FFF275',
//       contrastText: '#fff',
//     }
//   },
// });

ReactDOM.render(
  // <React.StrictMode>
  // <ThemeProvider theme={theme}>
    <App />,
  // </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
