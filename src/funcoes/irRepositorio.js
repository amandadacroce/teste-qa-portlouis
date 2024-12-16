const irRepositorio = async (page) => {
    try {
        // Botão de perfil
        const botaoPerfil = await page.waitForXPath('//button[contains(@aria-label, "user")]', { visible: true });
        await botaoPerfil.click();
        console.log('Botão de perfil clicado.');
        // await page.waitForNavigation({ waitUntil: "load" });
        // Botão de repositórios
        await page.waitForTimeout(500);
        const botaoRepositorio = await page.waitForXPath('//a[contains(@href, "?tab=repositories")]', { visible: true });
        await botaoRepositorio.click();
        console.log('Botão de repositórios clicado.');

        // Aguarda a página carregar
        await page.waitForNavigation({ waitUntil: "load" });

        // Nome do usuário usando a classe "p-nickname vcard-username d-block"
        const userName = await page.waitForXPath('//span[contains(@class, "p-nickname vcard-username d-block")]', { visible: true });
        const userNameTexto = await userName.evaluate(el => el.textContent.trim());

        console.log(`Nome do usuário encontrado: ${userNameTexto}`);
        return true;
    } catch (error) {
        //  await tirarPrintErro('irRepositorio');
        throw new Error('Erro ao navegar até os repositórios: ' + error.message);
    }
};

module.exports = irRepositorio;