import React from "react";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {blueGrey} from "@material-ui/core/colors";

const defaultTheme = createTheme({
    palette:{
        primary:blueGrey,
        success:{
            main:'#05C3F9'
        },
        text:{
            primary:'#98a9b4'
        },
        background:'#222'
    }
});

export default ({App})=>
    <MuiThemeProvider theme={defaultTheme}>{App}</MuiThemeProvider>