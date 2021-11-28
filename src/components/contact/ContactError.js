import React from "react";

function ContactError() {
  return (
    <>
      <h5>An error has occurred</h5>
      <p>Your message could not be sent. Plese try again.</p>
      <p>
        If the problem persists and you are unable to reach us through this form - send us an email about the problem on <span className="message__alert--bold">post@holidaze.no</span>
      </p>
    </>
  );
}

export default ContactError;
