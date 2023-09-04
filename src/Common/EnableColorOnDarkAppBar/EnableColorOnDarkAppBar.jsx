import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#d1372c',
    },
  },
});

const EnableColorOnDarkAppBar = ({isOpen, setIsOpen}) => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
            <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon onClick={() => setIsOpen(!isOpen)} />
      </IconButton>
    </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}

export default EnableColorOnDarkAppBar