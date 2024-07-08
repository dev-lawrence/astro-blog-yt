import { useState } from "react";
import Nav from "./Nav";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleNavClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <header className="fixed top-0 z-[500] w-full bg-neutral-900">
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <div className="z-10 text-400 font-900">
          <a className="text-white" href="/">
            Lexicon
          </a>
        </div>

        {/* Menu buttons */}
        <div className="z-10 inline-block md:hidden" onClick={toggleNavClick}>
          {isClicked ? (
            <button className="text-500">
              <i className="fa-solid fa-close"></i>
            </button>
          ) : (
            <button className="text-500">
              <i className="fa-solid fa-bars"></i>
            </button>
          )}
        </div>

        {/* Navbar */}
        <Nav isClicked={isClicked} toggleNavClick={toggleNavClick} />
      </div>
    </header>
  );
};

export default Header;
