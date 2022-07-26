import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// https://vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],

    // When deploying to Github pages, the base URL will be your repo's name,
    // Thus the production base URL must be changed here for it to work when deployed.
    // Ref: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#next-steps
    // base: process.env.NODE_ENV === "production" ? "/your-github-repo-name/" : "/",

    // Alternatively, you can pass a value in with `vite build --mode production` instead of relying on env vars.
    // base: mode === "whatever-command-you-want" ? "/your-github-repo-name/" : "/",

    // You can delete this or just leave it alone as this is only for demo purposes.

    // Uncomment this to allow the use of the `@` symbol as alias for /src
    // @todo Move import to the top if this is used
    // import { fileURLToPath, URL } from "url";
    // resolve: {
    //   alias: {
    //     "@": fileURLToPath(new URL("./src", import.meta.url)),
    //   },
    // },
  };
});
