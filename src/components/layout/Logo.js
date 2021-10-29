import logo from "../../images/logos/logo_small.png";
import mobileLogo from "../../images/logos/logo_mobile.png";

function Logo() {
  return (
    <>
      <img className="d-none d-lg-block m-0" src={logo} alt="Logo" width="150px" />
      <img className="d-block d-lg-none m-0" src={mobileLogo} alt="Logo" width="120px" />
    </>
  );
}

export default Logo;
