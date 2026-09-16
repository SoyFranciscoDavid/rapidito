import type { Product } from "@/types/product.types";

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  "1": "Sándwich de lomito tierno con vegetales frescos y salsa casera.",
  "2": "Sándwich de milanesa crujiente con lechuga, tomate y aderezo especial.",
  "3": "Sándwich de matambre al horno con queso fundido y vegetales frescos.",
  "4": "Choripán con chorizo grillado, pan artesanal y salsa criolla.",
  "5": "Pizza napolitana con tomate, mozzarella, albahaca y un toque de aceite de oliva.",
  "6": "Pizza de pepperoni con mozzarella fundida y rodajas de pepperoni dorado.",
  "7": "Pizza fugazeta con abundante mozzarella, cebolla caramelizada y orégano.",
  "8": "Pizza marinera con mariscos seleccionados, mozzarella y salsa de tomate.",
  "9": "Pizza de cuatro quesos con una combinación cremosa de quesos suaves e intensos.",
  "10": "Pizza con champiñones salteados, mozzarella y hierbas aromáticas.",
  "11": "Pizza vegetariana con pimientos, cebolla, champiñones, tomate y aceitunas.",
  "12": "Empanada de carne sazonada con cebolla, pimiento y especias caseras.",
  "13": "Empanada de pollo jugoso con vegetales y condimentos suaves.",
  "14": "Empanada de jamón y queso con relleno cremoso y masa dorada.",
  "15": "Empanada árabe de carne especiada con cebolla, tomate y limón.",
  "16": "Taco mexicano con carne sazonada, vegetales frescos y salsa picante.",
  "17": "Taco integral con relleno sabroso, verduras frescas y tortilla integral.",
  "18": "Taco de verduras salteadas con guacamole y salsa de tomate casera.",
  "19": "Taco panini con carne grillada, queso fundido y vegetales frescos.",
  "20": "Hamburguesa clásica con carne grillada, lechuga, tomate y queso.",
  "21": "Hamburguesa con queso fundido, cebolla caramelizada y salsa especial.",
  "22": "Hamburguesa estilo ranchero con carne, queso, cebolla y salsa barbacoa.",
  "23": "Hamburguesa vegana con medallón vegetal, lechuga, tomate y aderezo fresco.",
  "24": "Sándwich de pollo grillado con lechuga, tomate y mayonesa casera.",
  "25": "Empanada de choclo cremoso con cebolla, queso y especias suaves.",
};

export function getProductDescription(product: Product) {
  return PRODUCT_DESCRIPTIONS[product.id] ?? product.desc;
}
