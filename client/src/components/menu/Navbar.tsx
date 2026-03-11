"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // État pour contrôler l'affichage du sous-menu
  const [isIngredientMenuOpen, setIsIngredientMenuOpen] = useState(false);

  // Fonction pour afficher/masquer le sous-menu Créer un ingrédient
  function toggleIngredientMenu() {
    setIsIngredientMenuOpen(!isIngredientMenuOpen);
  }
  return (
    <nav>
      <h1>Nav menu</h1>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <span onClick={toggleIngredientMenu}>
            Plat
            {isIngredientMenuOpen ? " ▼" : " ▶"}
          </span>
          {isIngredientMenuOpen && (
            <ul>
              <li>
                <Link href="/Dish">Créer un Plat</Link>
              </li>
              <li>
                <Link href="/Ingredient">Créer un Ingrédient</Link>
              </li>
              <li>
                <Link href="/Unit">Créer une unité</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/RandomDishes">Liste Aléatoire des Plats</Link>
        </li>
        <li>
          <Link href="/About">À propos</Link>
        </li>
      </ul>
    </nav>
  );
}
