import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar ScrollTrigger una sola vez a nivel global.
// Todos los componentes deben importar gsap/ScrollTrigger desde aquí
// para evitar registros duplicados.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
