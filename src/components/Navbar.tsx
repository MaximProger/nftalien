import { useState, useContext } from "react";
import { navLinks } from "../constants";
import Button from "./Button";
import logo from "../assets/images/logo.svg";
import logoLight from "../assets/images/logo--light.svg";
import { motion } from "framer-motion";
import { ThemeContext } from "../contexts/ThemeContext";
import { ButtonProps } from "../models/models";
import { mobileMenuVariant } from "../utils/motion";

const Navbar = ({ onChangeTheme }: ButtonProps) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const theme = useContext(ThemeContext);

  return (
    <header className="fixed z-10 top-0 left-0 right-0 bg-primaryLight dark:bg-primary sm:py-[30px] py-[15px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <a href="/" className="logo">
            <img
              className="sm:w-[196px] sm:h-[42px] w-[154px] h-[33px]"
              src={theme === "light" ? logoLight : logo}
              alt="NFTALIEN"
              width="196"
              height="42"
            />
          </a>
          <nav className="lg:block hidden">
            <ul className="flex gap-[32px]">
              {navLinks.map(({ id, title }: { id: string; title: string }) => (
                <li key={id}>
                  <a
                    className={`${
                      active === title
                        ? "text-accent"
                        : "text-primary dark:text-fontColor"
                    }  hover:text-accent font-bakbakOne uppercase text-base transition-colors easy-linear`}
                    href={`#${id}`}
                    onClick={() => {
                      setActive(title);
                    }}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-[20px]">
            <button
              type="button"
              onClick={() => onChangeTheme()}
              className="theme-btn rounded-full w-[48px] h-[48px] bg-secondary flex items-center justify-center transition ease-linear border-[1px] border-solid border-transparent  hover:border-accent"
            ></button>
            <button
              type="button"
              className={`menu-btn ${
                toggle && "menu-btn--close"
              } rounded-xl w-[48px] h-[48px] bg-secondary lg:hidden flex items-center justify-center transition ease-linear border-[1px] border-solid border-transparent  hover:border-accent`}
              onClick={() => setToggle(!toggle)}
            ></button>
            <Button
              classes="lg:flex hidden btn--icon btn--discord"
              text="discord"
            />
            <Button
              classes="lg:flex hidden btn--green btn--icon btn--wallet"
              text="connect"
            />
          </div>

          <motion.div
            initial="closed"
            variants={mobileMenuVariant}
            animate={toggle ? "open" : "closed"}
            className="lg:hidden fixed left-0 right-0 sm:top-[108px] top-[78px] bg-primaryLight dark:bg-primary px-[15px] pb-[15px]"
          >
            <ul className="flex flex-col gap-[32px] mb-[32px]">
              {navLinks.map(({ id, title }: { id: string; title: string }) => (
                <li key={id}>
                  <a
                    onClick={() => {
                      setActive(title);
                      setToggle(!toggle);
                    }}
                    className={`${
                      active === title
                        ? "text-accent"
                        : "text-primary dark:text-fontColor"
                    }  hover:text-accent font-bakbakOne uppercase text-base transition-colors easy-linear`}
                    href={`#${id}`}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-[20px]">
              <Button classes="btn--icon btn--discord" text="discord" />
              <Button
                classes="btn--green btn--icon btn--wallet"
                text="connect"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
