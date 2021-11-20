import PageHeading from "../layout/PageHeading";
import LoginForm from "./LoginForm";

function Admin() {
  return (
    <div>
      <PageHeading color={"#02a6b5"} className={"text-center mt-5"}>
        ADMIN LOGIN
      </PageHeading>
      <LoginForm />
    </div>
  );
}

export default Admin;
