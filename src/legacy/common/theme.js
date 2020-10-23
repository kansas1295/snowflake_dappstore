/* eslint-disable */
/* This file contains code from the "legacy" era, it needs to be re-written */

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperFullScreen: {
        width: '100%',
        height: '100%'
      }
    }
  },
  palette: {
    primary: {
      main: "#0971f5"
    },
    secondary: {
      main: "#2C90B8"
    },
    success: {
      light: green[300],
      main:  green[500],
      dark:  green[700]
    }
  },
  typography: {
    useNextVariants: true,
    fontWeightLight:   200,
    fontWeightRegular: 200,
    fontWeightMedium:  300
  }
})
theme.palette.success.contrastText = theme.palette.getContrastText(green[700])

export default theme;
