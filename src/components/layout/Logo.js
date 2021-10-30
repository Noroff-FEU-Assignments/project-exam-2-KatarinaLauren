import logo from "../../images/logos/logo.png";
import mobileLogo from "../../images/logos/logo_mobile.png";

function Logo(props) {
  const breakpoint = props.breakPoint;
  const viewportSizeBlock = `d-${breakpoint}-block`;
  const viewportSizeNone = `d-${breakpoint}-none`;
  const logoClass = `d-none ${viewportSizeBlock}`;
  const mobileLogoClass = `d-block ${viewportSizeNone}`;
  return (
    <>
      <img className={logoClass} src={logo} alt="Logo" width="150px" />
      <img className={mobileLogoClass} src={mobileLogo} alt="Logo" width="120px" />
    </>
  );
}

export default Logo;
