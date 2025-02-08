import "./footer.css";
import { Icon } from "../../atoms/icon/icon.tsx";
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
              <Icon classname="text-xl" name="i-ri-arrow-right-line" />
            </a>
            <a href="">
              <li>Career</li>
              <Icon classname="text-xl" name="i-ri-arrow-right-line" />
            </a>
            <a href="">
              <li>Blog</li>
              <Icon classname="text-xl" name="i-ri-arrow-right-line" />
            </a>
            <a href="">
              <li>Contact</li>
              <Icon classname="text-xl" name="i-ri-arrow-right-line" />
            </a>
          </ul>
        </div>
      </FooterSection>
    </footer>
  );
}
