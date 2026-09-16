import type { Category, Sauce } from "@/types/product.types";
import emp from "@/assets/images/emp.svg";
import piz from "@/assets/images/piz.svg";
import sand from "@/assets/images/sand.svg";
import tac from "@/assets/images/tac.svg";
import slider1 from "@/assets/images/slider-1.png";
import slider2 from "@/assets/images/slider-2.png";
import slider3 from "@/assets/images/slider-3.png";
import slider4 from "@/assets/images/slider-4.png";

export const CATEGORIES: Category[] = [
  {
    name: "Sandwichs",
    img: sand,
    backgroundImage: slider1,
  },
  {
    name: "Pizzas",
    img: piz,
    backgroundImage: slider2,
  },
  {
    name: "Empanadas",
    img: emp,
    backgroundImage: slider3,
  },
  {
    name: "Tacos",
    img: tac,
    backgroundImage: slider4,
  },
];

export const SITE_NAME = "Rapidito";
export const MAX_WIDTH = "max-w-7xl";

export const SAUCE_OPTIONS: Record<string, { value: Sauce; label: string }[]> =
  {
    Sandwichs: [
      { value: "mayonesa", label: "Mayonesa" },
      { value: "savora", label: "Savora" },
      { value: "ketchup", label: "Ketchup" },
      { value: "golf", label: "Golf" },
      { value: "criolla", label: "Criolla" },
      { value: "picante", label: "Picante" },
    ],
    Tacos: [{ value: "picante", label: "Picante" }],
    Empanadas: [{ value: "picante", label: "Picante" }],
  };
