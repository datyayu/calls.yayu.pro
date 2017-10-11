import * as React from "react";
import { Navbar } from "../components";
import { NavbarLink } from "../types";

/***************
 *    LINKS    *
 ***************/

const leftLinks: Array<NavbarLink> = [
  { url: "/", text: "🏠🐯", newTab: false, isTitle: true }
];

const rightLinks: Array<NavbarLink> = [
  {
    url: "https://github.com/datyayu/calls.yayu.pro",
    text: "Github",
    newTab: true,
    isTitle: false
  }
];

/***************
 *  CONTAINER  *
 ***************/

export const NavbarContainer = () => (
  <Navbar leftLinks={leftLinks} rightLinks={rightLinks} />
);
