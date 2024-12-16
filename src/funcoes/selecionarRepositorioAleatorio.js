const selecionarRepositorioAleatorio = async ({ page }) => {
    try {
        console.log("Iniciando seleção de repositório aleatório.");
        // Espera carregar os repositórios
        await page.waitForTimeout(5000); // Usar 'pagina' em vez de 'page'
        const listaRepositoriosXpath = '//a[contains(@itemprop, "codeRepository")]';
        await page.waitForXPath(listaRepositoriosXpath);

        // Captura a lista de repositórios
        const listaRepositorios = await page.$x(listaRepositoriosXpath);
        const tamanhoListaRepositorios = listaRepositorios.length;

        if (tamanhoListaRepositorios === 0) {
            throw new Error("Nenhum repositório encontrado.");
        }

        // Seleciona um repositório aleatório
        const indiceAleatorio = Math.floor(Math.random() * tamanhoListaRepositorios);
        const repositorioSelecionado = listaRepositorios[indiceAleatorio];
        await repositorioSelecionado.evaluate((el) => el.click());

        console.log(`Repositório selecionado: índice ${indiceAleatorio}.`);
        await page.waitForNavigation({ waitUntil: "load" });

        // Navega até a página de Pull Requests
        const pullRequestsXpath = '//a[contains(@data-selected-links, "pulls")]';
        const botaoPullRequests = await page.waitForXPath(pullRequestsXpath, { visible: true });
        await botaoPullRequests.click();
        console.log("Navegação para a página de Pull Requests concluída.");

        // Aguarda carregamento
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