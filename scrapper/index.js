const fs = require('fs').promises;
const browserModule = require('./browser');
const pageController = require('./pageController');

async function storeDataInJSON(data) {
    try {
        const jsonData = {
            PersonajesPrincipales_Frases: data.PersonajesPrincipales_Frases,
            PersonajesSecundarios_Frases: data.PersonajesSecundarios_Frases
        };

        // Almacenar los datos en un archivo JSON
        await fs.writeFile('frases.json', JSON.stringify(jsonData, null, 2));
        console.log('Data stored in JSON file');
    } catch (err) {
        console.error('Error writing to JSON file:', err);
    }
}


(async () => {
    // Inicia el navegador
    const browser = await browserModule.startBrowser();
    // Scraping de las páginas
    const data = await pageController.scrapePages(browser);
    // Cierra el navegador al finalizar el scraping
    await browser.close();
    // Almacena los datos en un archivo JSON
    await storeDataInJSON(data);
})();
