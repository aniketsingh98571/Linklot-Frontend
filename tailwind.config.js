export default {
  corePlugins: {
    preflight: false,
  },
  /**
   * NOTE:
   * We should never include CSS files in content configuration which Tailwind is generating.
   * Ref: https://tailwindcss.com/docs/content-configuration#pattern-recommendations
   * Since, index.css contains tailwind utilities and classes, we want tailwind compiler to parse it.
   * So, that's why as an exception, we have index.css here.
   */
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./src/**/index.css"],
  theme: {
    extend: {
      backgroundColor: {
        "linklot-background-black": "#181818",
        "linklot-background-white": "#FFFFFF",
        "linklot-background-gray": "#F7F7FA",
        "linklot-input-background-light": "#FCFCFC",
        "linklot-hashtags-background": "#F0F0F5",
      },
      borderColor: {
        "linklot-border-gray": "#D5D7DA",
      },
      colors: {
        "linklot-text-black": "#000000",
        "linklot-text-white": "#FFFFFF",
        "linklot-text-title": "#181D27",
        "linklot-text-subtitle": "#535862",
        "linklot-card-button-text": "#5E5E66",
        "linklot-hashtags-text": "#9696A3",
        "linklot-tags-text": "#767676",
        "linklot-icon-color": "#717680",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
