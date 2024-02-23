const pageScrapper = require('./pageScrapper');

async function scrapePages(browser) {
    const page = await browser.newPage();
    // Scrape frases de personajes principales
    console.log("Scraping frases de personajes principales...");
    const PersonajesPrincipales_Frases = await pageScrapper.scrapeCategoria(page, "PersonajesPrincipales", 'https://simpsons.fandom.com/es/wiki/Categor%C3%ADa:Personajes_principales');
    // Scrape frases de personajes secundarios
    console.log("Scraping frases de personajes secundarios...");
    const PersonajesSecundarios_Frases = await pageScrapper.scrapeCategoria(page, "PersonajesSecundarios", 'https://simpsons.fandom.com/es/wiki/Categor%C3%ADa:Personajes_secundarios');
    // Cierra la página después de usarla
    await page.close();
    return { PersonajesPrincipales_Frases, PersonajesSecundarios_Frases };
}

module.exports = {
    scrapePages
};