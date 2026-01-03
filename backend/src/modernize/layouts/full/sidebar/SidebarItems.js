import React from "react";
import { useLocation, NavLink, Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import {
  Logo,
  Sidebar as MuiSidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from '@tabler/icons-react';
import Menuitems from "./MenuItems";
// import logoicn from "../../../assets/images/logos/logo-adminmart.svg";


const renderMenuItems = (items, pathDirect) => {


  return items.map((item) => {


    const Icon = item.icon ? item.icon : IconPoint;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader

      return (
        <Box sx={{ margin: "0 -24px", textTransform: 'uppercase' }} key={item.subheader}>
          <Menu
            subHeading={item.subheader}
            key={item.subheader}

          />
        </Box>
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius='7px'
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <MenuItem
        key={item.id}
        isSelected={pathDirect === item?.href}
        borderRadius='7px'
        icon={itemIcon}
        component="div"
        link={item.href && item.href !== "" ? item.href : undefined}
        target={item.href && item.href.startsWith("https") ? "_blank" : "_self"}
        badge={item.chip ? true : false}
        badgeContent={item.chip || ""}
        badgeColor='secondary'
        badgeTextColor="#1b84ff"
        disabled={item.disabled}
      >
        <Link to={item.href} target={item.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography component='span' color={pathDirect === item?.href ? '#fff' : 'inherit'}>
            {item.title}</Typography>
        </Link>
      </MenuItem>


    );
  });
};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;

  return (
    <Box sx={{ px: "24px", overflowX: 'hidden' }}>
      <MuiSidebar width={"100%"} showProfile={false} themeColor={"#1e3a8a"} themeSecondaryColor={'#49BEFF1a'}>
        <Box sx={{
          margin: "0 -24px",
          marginBottom: '20px',
          height: '70px',
          background: 'linear-gradient(90deg,#001138,#001e66)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 'bold', color: '#fff' }}
          >
            BookStore
          </Typography>
        </Box>


        {renderMenuItems(Menuitems, pathDirect)}
      </MuiSidebar>

    </Box>
  );
};

export default SidebarItems;

