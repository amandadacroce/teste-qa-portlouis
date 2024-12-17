const selecionarRepositorioAleatorio = async ({ page }) => {
    try {
        console.log("Iniciando seleção de repositório aleatório.");

        await page.waitForTimeout(5000);
        const listaRepositoriosXpath = '//a[contains(@itemprop, "codeRepository")]';
        await page.waitForXPath(listaRepositoriosXpath);


        const listaRepositorios = await page.$x(listaRepositoriosXpath);
        const tamanhoListaRepositorios = listaRepositorios.length;

        if (tamanhoListaRepositorios === 0) {
            throw new Error("Nenhum repositório encontrado.");
        }


        const indiceAleatorio = Math.floor(Math.random() * tamanhoListaRepositorios);
        const repositorioSelecionado = listaRepositorios[indiceAleatorio];
        await repositorioSelecionado.evaluate((el) => el.click());

        console.log(`Repositório selecionado: índice ${indiceAleatorio}.`);
        await page.waitForNavigation({ waitUntil: "load" });

        const pullRequestsXpath = '//a[contains(@data-selected-links, "pulls")]';
        const botaoPullRequests = await page.waitForXPath(pullRequestsXpath, { visible: true });
        await botaoPullRequests.click();
        console.log("Navegação para a página de Pull Requests concluída.");

        await page.waitForXPath('//a[contains(@href, "compare")]', { visible: true });
        console.log("Página de Pull Requests carregada com sucesso.");

        return true;
    } catch (error) {
        console.error("Erro ao acessar repositório aleatório:", error.message);
        await page.screenshot({ path: `img/erro_selecionar_repositorio.png` });
        throw new Error(`Erro ao acessar repositório aleatório: ${error.message}`);
    }
};

module.exports = selecionarRepositorioAleatorio;
