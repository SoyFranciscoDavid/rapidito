import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import Reveal from "@/components/animations/Reveal";
import { SITE_NAME } from "@/lib/constants";
import discover from "@/assets/images/discover.png";
import mastercard from "@/assets/images/mastercard.png";
import paypal from "@/assets/images/paypal.png";
import visa from "@/assets/images/visa.png";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoPinterest,
  BiLogoYoutube,
  BiX,
} from "react-icons/bi";

const COMPANY_LINKS = [
  "Sobre nosotros",
  "Carreras",
  "Afiliados",
  "Blog",
  "Contacto",
];
const SHOP_LINKS = [
  "Novedades",
  "Accesorios",
  "Hombres",
  "Mujeres",
  "Todos los productos",
];
const HELP_LINKS = [
  "Servicio al cliente",
  "Mi cuenta",
  "Buscar tienda",
  "Privacidad legal",
  "Tarjeta de regalo",
];

const SOCIAL_ICONS = [
  { Icon: BiLogoFacebook, key: "facebook" },
  { Icon: BiLogoInstagram, key: "instagram" },
  { Icon: BiLogoYoutube, key: "youtube" },
  { Icon: BiLogoPinterest, key: "pinterest" },
  { Icon: BiX, key: "x" },
];

const PAYMENT_METHODS = [
  { src: discover, alt: "Discover" },
  { src: mastercard, alt: "Mastercard" },
  { src: visa, alt: "Visa" },
  { src: paypal, alt: "PayPal" },
];

export default function Footer() {
  return (
    <footer className="container-app mt-24 border-t border-black/20 pt-8 flex flex-wrap justify-between">
      {/* Brand */}
      <Reveal className="w-full lg:w-[25%] flex flex-col">
        <Logo size="md" />
        <p className="mt-8 text-xs">
          3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United States
        </p>
        <span className="mt-8 text-xs font-semibold">hello@lama.dev</span>
        <span className="mt-2 text-xs font-semibold">+1 234 567 890</span>
        <div className="flex gap-4 mt-8">
          {SOCIAL_ICONS.map(({ Icon, key }) => (
            <Icon
              key={key}
              className="cursor-pointer hover:text-primary transition-colors"
            />
          ))}
        </div>
      </Reveal>

      {/* Links */}
      <Reveal className="w-full lg:w-[45%] hidden lg:block">
        <div className="flex justify-around gap-4 text-xs">
          <div>
            <h3 className="text-base mb-8">EMPRESA</h3>
            <ul className="flex flex-col gap-6">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base mb-8">TIENDA</h3>
            <ul className="flex flex-col gap-6">
              {SHOP_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base mb-8">AYUDA</h3>
            <ul className="flex flex-col gap-6">
              {HELP_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Subscribe */}
      <Reveal className="w-full lg:w-[25%] flex flex-col">
        <h3 className="text-base mb-8">SUSCRÍBETE</h3>
        <p className="text-xs mb-8">
          Sé el primero en recibir las últimas novedades sobre tendencias,
          promociones y mucho más!
        </p>
        <form className="flex w-full h-10 bg-muted rounded-sm mb-12 focus-within:ring-2 focus-within:ring-primary/50">
          <input
            type="text"
            placeholder="Correo electrónico"
            className="flex-4 h-full px-2 bg-transparent outline-none text-sm"
          />
          <button className="flex-1 bg-primary text-white text-sm cursor-pointer hover:bg-primary-hover transition-colors">
            UNIRSE
          </button>
        </form>
        <h4 className="text-sm font-semibold mb-4">Pagos seguros</h4>
        <div className="flex gap-5">
          {PAYMENT_METHODS.map((method) => (
            <Image
              key={method.alt}
              src={method.src}
              width={35}
              height={35}
              alt={method.alt}
            />
          ))}
        </div>
      </Reveal>

      {/* Bottom Bar */}
      <Reveal
        className="w-full mt-12 mb-16 flex justify-between opacity-60 font-semibold text-sm"
        start="top 95%"
      >
        <p>© 2024 {SITE_NAME} · Creado por Fua! studio</p>
        <div className="flex gap-3">
          <span>Moneda</span>
          <span>$ USD</span>
        </div>
      </Reveal>
    </footer>
  );
}
