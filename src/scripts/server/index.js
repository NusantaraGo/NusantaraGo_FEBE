const Hapi = require("@hapi/hapi");
const Path = require("path");
const Inert = require("@hapi/inert");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "../../"), // folder root proyek
      },
    },
  });

  await server.register(Inert);

  //   // Serve halaman utama (index.html)
  //   server.route({
  //     method: "GET",
  //     path: "/",
  //     handler: (request, h) => {
  //       return h.file("index.html");
  //     },
  //   });

  //   // Serve file statis (css, js, dll.)
  //   server.route({
  //     method: "GET",
  //     path: "/{param*}",
  //     handler: {
  //       directory: {
  //         path: ".",
  //         redirectToSlash: true,
  //         index: false,
  //       },
  //     },
  //   });

  //   // Contoh endpoint API
  //   server.route({
  //     method: "GET",
  //     path: "/api/hello",
  //     handler: () => {
  //       return { message: "Halo dari Hapi.js API!" };
  //     },
  //   });

  await server.start();
  console.log("🚀 Server running on", server.info.uri);
};

init();
