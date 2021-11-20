import PageHeading from "../layout/PageHeading";
import ContactForm from "./ContactForm";
import Hero from "../layout/Hero";
import heroImage from "../../images/contact/contact_hero.jpg";

function Contact() {
  return (
    <div className={"contact__container"}>
      <Hero image={heroImage}>
        <PageHeading color={"#fff"}>CONTACT US</PageHeading>
      </Hero>
      <ContactForm />
    </div>
  );
}

export default Contact;
