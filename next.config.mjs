/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /**
   * Soluciona el error "Cannot find module './xxx.js'" en Windows.
   *
   * ¿Por qué pasa? Webpack en dev usa IDs numéricos para los chunks
   * (ej: 948.js). En Windows, al recompilar, a veces asigna un nuevo ID
   * pero el runtime intenta cargar el viejo → crash.
   *
   * Con moduleIds: "deterministic" los IDs no cambian entre compilaciones.
   */
  webpack: (config, { dev }) => {
    if (dev && config.optimization) {
      config.optimization.moduleIds = "deterministic";
    }

    // Soporte para importar videos (.mp4 / .webm) como assets estáticos.
    // Next.js no incluye una regla por defecto para estos formatos, así que
    // se emiten a /_next/static/media/ vía asset/resource.
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
