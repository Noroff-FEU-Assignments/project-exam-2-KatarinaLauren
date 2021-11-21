import React from "react";
import PropertyForm from "./utils/PropertyForm";
import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";

function AddProperty() {
  return (
    <Container>
      <PageHeading className="text-center mt-5">Add property</PageHeading>
      <PropertyForm />
    </Container>
  );
}

export default AddProperty;
