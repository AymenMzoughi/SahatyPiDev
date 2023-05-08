import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let initialTheme = createTheme();

export const theme = responsiveFontSizes(initialTheme);
