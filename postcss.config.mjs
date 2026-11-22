// Connects Tailwind CSS to the build. PostCSS is the tool that processes
// app/globals.css; this tells it to run Tailwind on the way through.
//
// This replaced the "@tailwindcss/turbopack" loader that create-next-app
// wrote into next.config.ts. With that loader, a running "npm run dev" did
// not notice when globals.css was saved, so style changes only appeared
// after a restart. This is the setup Tailwind's own install guide uses.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
