async function scrapeCategoria(page, principales_o_secundarios, categoriaUrl) {
    await page.goto(categoriaUrl);
    await page.waitForSelector('.category-page__members');

    const links = await page.evaluate(() => {
        const linkElements = document.querySelectorAll('.category-page__members a');
        const filteredLinks = [];
        linkElements.forEach(linkElement => {
            if (!linkElement.querySelector('img')) {
                const name = linkElement.textContent.trim();
                const url = linkElement.href + '/Frases';
                filteredLinks.push({ name, url });
            }
        });
        return filteredLinks;
    });

    const frases = [];

    for (const link of links) {
        await page.goto(link.url);

        const noFrases = await page.evaluate(() => {
            const contentDiv = document.getElementById('content');
            return contentDiv && contentDiv.querySelector('.noarticletext');
        });

        if (noFrases) {
            console.log(`No hay frases disponibles para ${link.name}. Saltando al siguiente personaje...`);
            continue;
        }

        await page.waitForSelector('.mw-parser-output');
        await page.evaluate(() => {
            const figureElements = document.querySelectorAll('.mw-parser-output figure');
            figureElements.forEach(figure => {
                figure.remove();
            });
        });

        const listaFrases = await page.evaluate(() => {
            const listItems = Array.from(document.querySelectorAll('.mw-parser-output ul li:not(.toclevel-1):not(.toclevel-2)'));
            return listItems.map(item => item.textContent.trim().replace(/"/g, ''));
        });

        console.log(`Cantidad de frases recopiladas para ${link.name}:`, listaFrases.length);
        
        frases.push(...listaFrases.map(frase => ({ nombre: link.name, frase })));
    }

    console.log(`Cantidad total de frases de personajes ${principales_o_secundarios.toLowerCase()}:`, frases.length);
    
    return frases;
}

module.exports = {
    scrapeCategoria
};
