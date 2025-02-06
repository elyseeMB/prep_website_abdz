import { FooterSection } from "./footer_section.tsx";
import { IconFooter } from "./icon.tsx";

export function Footer() {
  return (
    <footer>
      <FooterSection className="footer__main">
        <div className="footer__content-wrapper">
          <div className="footer__content-wrapper-top">
            <form action="">
              <input type="text" />
            </form>
          </div>
          <div className="footer__content-wrapper-bottom">
            Aperiam asperiores atque, est eum ex harum laborum laudantium non
            possimus quo rem, soluta totam ut! Amet delectus id inventore, iusto
            labore, optio quae quaerat quidem quos rerum, sed sequi.
          </div>
        </div>
        <div className="footer__links-wrapper">
          <ul className="links">
            <a href="">
              <li>Home</li>
              <IconFooter />
            </a>
            <a href="">
              <li>Career</li>
              <IconFooter />
            </a>
            <a href="">
              <li>Blog</li>
              <IconFooter />
            </a>
            <a href="">
              <li>Contact</li>
              <IconFooter />
            </a>
          </ul>
        </div>
      </FooterSection>
    </footer>
  );
}
