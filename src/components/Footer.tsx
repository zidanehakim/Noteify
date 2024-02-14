import { Button } from "react-bootstrap";
import {
  LogoFacebook,
  LogoGithub,
  LogoGoogle,
  LogoInstagram,
  LogoLinkedin,
} from "react-ionicons";
import { useMediaQuery } from "react-responsive";

export default function Footer() {
  const isPc = useMediaQuery({ query: "(min-width: 600px)" });

  return (
    <footer className="position-relative ">
      <div className="d-flex bg-white">
        <section className="m-auto">
          <Button
            className="m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://www.facebook.com/ZidanyuChan/"
            role="button"
            target="_blank"
          >
            <LogoFacebook color="white" />
          </Button>

          <Button
            className="m-1"
            style={{ backgroundColor: "#dd4b39", border: "none" }}
            href="zidanehakimgt@gmail.com"
            role="button"
            target="_blank"
          >
            <LogoGoogle color="white" />
          </Button>
          <Button
            className="m-1"
            style={{ backgroundColor: "#ac2bac", border: "none" }}
            href="https://www.instagram.com/yazidanehakim/"
            role="button"
            target="_blank"
          >
            <LogoInstagram color="white" />
          </Button>

          <Button
            className="m-1"
            style={{ backgroundColor: "#0082ca", border: "none" }}
            href="https://www.linkedin.com/in/yazidane-hakim-25754128a/"
            role="button"
            target="_blank"
          >
            <LogoLinkedin color="white" />
          </Button>

          <Button
            className="m-1"
            style={{ backgroundColor: "#333333", border: "none" }}
            href="https://github.com/zidanehakim"
            role="button"
            target="_blank"
          >
            <LogoGithub color="white" />
          </Button>
        </section>
      </div>

      <div
        className="text-center p-3 bg-dark text-white"
        style={{ border: "none", fontSize: isPc ? "1em" : ".8em" }}
      >
        © 2024 Created by: @zoodane
      </div>
    </footer>
  );
}
