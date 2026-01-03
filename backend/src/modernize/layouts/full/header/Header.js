import React, { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

// components
import Profile from './Profile'
import { IconBellRinging, IconMenu } from '@tabler/icons-react'

const Header = (props) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: 'linear-gradient(90deg,#001138,#001e66)', // Dark blue gradient
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }))
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.primary.contrastText, // Ensure white text
  }))



  return (
    <AppBarStyled position='sticky' color='default'>
      <ToolbarStyled>
        <IconButton
          color='inherit'
          aria-label='menu'
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
            color: 'inherit',
          }}>
          <IconMenu width='20' height='20' />
        </IconButton>






        <Box flexGrow={1} />
        <Stack spacing={1} direction='row' alignItems='center'>

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  )
}

Header.propTypes = {
  sx: PropTypes.object,
}

export default Header
