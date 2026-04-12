// components
import { NavLink } from "react-router-dom";

// hooks
import { useTheme } from "@contexts/themeContext";

// utils
import { memo } from "react";

// assets
import light from "@assets/tlu-logo.webp";
import dark from "@assets/tlu-logo.webp";

const Logo = ({ imgClass, textClass }) => {
  const { theme } = useTheme();

  return (
    <NavLink className="logo" to="/">
      <span className={`logo_img relative ${imgClass || ""}`}>
        <img src={light} alt="TeamFinder" />
        <img
          className={`absolute top-0 left-0 ${
            theme === "light" ? "hidden" : ""
          }`}
          src={dark}
          alt="TeamFinder"
        />
      </span>
      <h4 className={`logo_text ${textClass || ""}`}>TeamFinder</h4>
    </NavLink>
  );
};

export default memo(Logo);
