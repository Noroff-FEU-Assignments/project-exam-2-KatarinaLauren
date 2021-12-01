import PageHeading from "../../layout/PageHeading";
import Paragraph from "../../layout/Paragraph";
import Container from "react-bootstrap/Container";
import LoginForm from "./LoginForm";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import AdminDashboard from "../AdminDashboard";

function Admin() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <AdminDashboard>
          <h3 className="text-center mt-5">ADMIN DASHBOARD</h3>
          <div className="admin__login__message p-4 ps-5 mt-3 mb-5">
            <Paragraph>Here you can edit properties, add new establishments and manage booking enquiries and messages.</Paragraph>
            <Paragraph>Use the Admin menu above to navigate between tasks.</Paragraph>
            <Paragraph className="fst-italic">
              Please follow the guidelines when adding or editing establishments. If you have any questions - reach out to your contact person at Holidaze AS.
            </Paragraph>
          </div>
        </AdminDashboard>
      ) : (
        <Container>
          <PageHeading color={"#02a6b5"} className={"text-center mt-5"}>
            ADMIN LOGIN
          </PageHeading>
          <div className="admin__login__message p-4 ps-5 mt-3">
            <Paragraph>This login is for property administrators.</Paragraph>
            <Paragraph>Log in with your personal username and password to get access to your properties.</Paragraph>
          </div>
          <LoginForm />
        </Container>
      )}
    </>
  );
}

export default Admin;
