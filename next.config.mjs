/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
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
    return config;
  },
};

export default nextConfig;
