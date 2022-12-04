import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { Web3Button } from '@web3modal/react';
import WelcomeName from './WelcomeName';

// @ts-ignore
function Appbar(params) {

  const avatar = params.avatar;
  const balance = params.balance;
  const address = params.address;
  const ensName = params.ensName;
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const welcomeName = WelcomeName({address, ensName})

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const avatarTab = () => {
    if (address) {
      if (address.length > 0) {
          return (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Ens Avatar" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
                <MenuItem key="collection" onClick={handleCloseUserMenu}>
                    <Link href="/collection">
                      <Typography textAlign="center">My Collection</Typography>
                    </Link>
                </MenuItem>
                <MenuItem key="address" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Address: {welcomeName ? welcomeName : "Error"}</Typography>
                </MenuItem>
                <MenuItem key="balance" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Balance: {balance ? balance : "Error"}</Typography>
                </MenuItem>
            </Menu>
          </Box>
        )
      }
    }
  }
  
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Extinct-Sounds
          </Typography>

          <Typography
            variant="button"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Extinct-Sounds
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    
          </Box>
          <Box sx={{flexGrow: 0, padding: '10px'}}>
            <Web3Button /> 
          </Box>
          {avatarTab()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appbar;
