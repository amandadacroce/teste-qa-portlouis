const irRepositorio = async (page) => {
    try {
        const botaoPerfil = await page.waitForXPath('//button[contains(@aria-label, "user")]', { visible: true });
        await botaoPerfil.click();
        console.log('Botão de perfil clicado.');

        await page.waitForTimeout(500);
        const botaoRepositorio = await page.waitForXPath('//a[contains(@href, "?tab=repositories")]', { visible: true });
        await botaoRepositorio.click();
        console.log('Botão de repositórios clicado.');


        await page.waitForNavigation({ waitUntil: "load" });


        const userName = await page.waitForXPath('//span[contains(@class, "p-nickname vcard-username d-block")]', { visible: true });
        const userNameTexto = await userName.evaluate(el => el.textContent.trim());

        console.log(`Nome do usuário encontrado: ${userNameTexto}`);
        return true;
    } catch (error) {
        throw new Error('Erro ao navegar até os repositórios: ' + error.message);
    }
};

module.exports = irRepositorio;