import PageHeading from "../../layout/PageHeading";
import Paragraph from "../../layout/Paragraph";
import Container from "react-bootstrap/Container";
import LoginForm from "./LoginForm";

function Admin() {
  return (
    <Container>
      <PageHeading color={"#02a6b5"} className={"text-center mt-5"}>
        ADMIN LOGIN
      </PageHeading>
      <div className="admin__login__message p-4 mt-3">
        <Paragraph>This login is for property administrators. Here you can edit your property, add new establishments and manage booking enquiries.</Paragraph>
        <Paragraph>Log in with your personal username and password to get access to your properties.</Paragraph>
      </div>
      <LoginForm />
    </Container>
  );
}

export default Admin;
