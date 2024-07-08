import { useEffect, useState } from "react";

interface NavBarProps {
  isClicked: boolean;
  toggleNavClick: () => void;
}

const navigation = [
  { name: "daily digest", href: "/daily-digest" },
  { name: "design tools", href: "/design-tools" },
  { name: "tutorials", href: "/tutorials" },
];

const Nav = ({ isClicked, toggleNavClick }: NavBarProps) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleNavClick = (href: string) => {
    setActive(href);
    toggleNavClick();
  };

  return (
    <>
      {/* Mobile nav */}
      <nav
        className={`${isClicked ? "translate-x-0" : "translate-x-[190rem]"} fixed left-0 top-0 flex h-screen w-full items-center justify-end transition-transform duration-300 md:hidden`}
      >
        <ul className="h-full w-[60%] border-l border-primary-400 bg-black pl-4 pt-[9rem]">
          {navigation.map((item) => (
            <li className="mb-4 text-300 font-500 capitalize" key={item.name}>
              <a
                className={`${active === item.href ? "text-primary-400" : ""} transition-colors duration-300 hover:text-primary-400`}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop nav */}
      <nav className="hidden md:inline-block">
        <ul className="md:flex md:gap-10">
          {navigation.map((item) => (
            <li className="text-100 font-500 capitalize" key={item.name}>
              <a
                className={`${active === item.href ? "text-primary-400" : ""} transition-colors duration-300 hover:text-primary-400`}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
