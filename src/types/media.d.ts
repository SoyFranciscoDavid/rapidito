/**
 * Declaraciones de tipos para importar videos como assets estáticos.
 * Next.js emite estos archivos a /_next/static/media/ vía webpack
 * (regla asset/resource agregada en next.config.mjs).
 */
declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}
