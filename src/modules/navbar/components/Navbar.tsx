import * as React from "react";
import { NavbarItem } from "./NavbarItem";
import { NavbarLink } from "../types";

/***************
 *    PROPS    *
 ***************/

interface NavbarProps {
  leftLinks: Array<NavbarLink>;
  rightLinks: Array<NavbarLink>;
}

/***************
 *  COMPONENT  *
 ***************/

export const Navbar = ({ leftLinks, rightLinks }: NavbarProps) => (
  <nav className="navbar">
    <ul className="navbar-list left">{leftLinks.map(mapLinkToNavbarItem)}</ul>

    <ul className="navbar-list right">{rightLinks.map(mapLinkToNavbarItem)}</ul>
  </nav>
);

/***************
 *   UTILITY   *
 ***************/

const mapLinkToNavbarItem = (link: NavbarLink, index: number) => (
  <NavbarItem
    key={index}
    url={link.url}
    text={link.text}
    newTab={link.newTab}
    isTitle={link.isTitle}
  />
);
