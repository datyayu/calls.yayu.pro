import * as React from "react";
import { Link } from "react-router-dom";

/***************
 *    PROPS    *
 ***************/

interface NavbarItemProps {
  url: string;
  text: string;
  newTab: boolean;
  isTitle: boolean;
}

/***************
 *  COMPONENT  *
 ***************/

export const NavbarItem = ({ url, text, newTab, isTitle }: NavbarItemProps) => {
  const newTabAttrs = newTab ? { rel: "noopener", target: "_blank" } : {};
  const cssClasses = isTitle ? "navbar-link navbar-title" : "navbar-link";

  return (
    <li className="navbar-item">
      <Link to={url} className={cssClasses} {...newTabAttrs}>
        {text}
      </Link>
    </li>
  );
};
