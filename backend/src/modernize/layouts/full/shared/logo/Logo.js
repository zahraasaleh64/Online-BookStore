import { Link } from "react-router-dom";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img src="/logo512.png" alt="logo" style={{ height: '60px', width: 'auto' }} />
    </LinkStyled>
  );
};

export default Logo;
