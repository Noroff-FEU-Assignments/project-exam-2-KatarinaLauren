import React from "react";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

function ErrorLoadingMessage({ error, loading, message }) {
  return (
    <div>
      {loading && (
        <div className="text-center w-100 mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {message && <SuccessMessage>{message}</SuccessMessage>}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default ErrorLoadingMessage;
