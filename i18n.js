
module.exports = {
  defaultLocale: "en",
  locales: ["en", "nl"],
  pages: {
    "*": ["common"]
  },
  "loadLocaleFrom": (lang, ns) => import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default)
}