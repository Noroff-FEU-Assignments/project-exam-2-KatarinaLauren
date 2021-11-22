import React from "react";
import AddPropertyForm from "./AddPropertyForm";
import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";

function AddProperty() {
  return (
    <Container>
      <PageHeading className="text-center mt-5">Add property</PageHeading>
      <AddPropertyForm />
    </Container>
  );
}

export default AddProperty;
