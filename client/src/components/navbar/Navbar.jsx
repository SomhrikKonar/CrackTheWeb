import React, { useState } from "react";
import "./navbar.css";
export default function Navbar() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [collapseHamburgerIcon, setCollapseHamburgerIcon] = useState(false);
  const openHamburgerMenuHadnler = () => {
    setCollapseHamburgerIcon(!collapseHamburgerIcon);
    setTimeout(() => {
      setShowHamburgerMenu(!showHamburgerMenu);
    }, 400);
  };
  return (
    <div className="navbarContainer">
      <div className="navbarLeftContainer">
        <h3>CrackTheWeb</h3>
        <ul className={showHamburgerMenu && "whiteListContainer"}>
          <li>Home</li>
          <li>Contribute</li>
          <li>Explore</li>
        </ul>
      </div>
      <div className="navbarRightContainer">
        <div
          className="hamburgerMenuContainer"
          onClick={openHamburgerMenuHadnler}
        >
          <div
            className={
              collapseHamburgerIcon
                ? "collapsedHamburgerMenuIconTop"
                : "hamburgerMenuIconTop"
            }
          ></div>
          <div
            className={
              collapseHamburgerIcon
                ? "collapsedHamburgerMenuIconMiddle"
                : "hamburgerMenuIconMiddle"
            }
          ></div>
          <div
            className={
              collapseHamburgerIcon
                ? "collapsedHamburgerMenuIconBottom"
                : "hamburgerMenuIconBottom"
            }
          ></div>
        </div>
        <div
          className={
            showHamburgerMenu
              ? "expandedHamburgerMenuContainer"
              : "hiddenHamburgerMenuContainer"
          }
        ></div>
      </div>
    </div>
  );
}
