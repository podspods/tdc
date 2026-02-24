"use client";

import { useState } from "react";
import MenuDesktop from "./MenuDesktop";
import MenuMobil from "./MenuMobil";
import { linkList } from "../common/constant";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="z-50 p-2 text-gray-800 md:hidden">
          {isOpen ? "✖" : "☰"}
        </button>

        <MenuDesktop linkList={linkList} />
        <MenuMobil linkList={linkList} isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </>
  );
}
