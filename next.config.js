module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/settings": { page: "/settings" },
      "/signup": { page: "/signup" },
      "/discussion": { page: "/discussion" },
      "/dashboard": { page: "/dashboard" },
      "/forgetpassword": { page: "/forgetpassword" },
      "/resetpassword": { page: "/resetpassword" },
      "/signin": { page: "/signin" },
      "/signout": { page: "/signout" },
      "/payment": { page: "/payment" },
      "/faq": { page: "/faq" },
    };
  },
  trailingSlash: true,
  images: {
    loader: "imgix",
    path: "https://example.com/myaccount/",
  },
};
