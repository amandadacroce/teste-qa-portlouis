const criarRepositorio = async (page) => {
    try {
        console.log("Objeto 'page' recebido", page);
        // Acessa a página de criação de novo repositório
        await page.goto("https://github.com/new");

        // Espera o campo de nome de repositório aparecer
        const xpathInputNome = '//input[@aria-describedby="RepoNameInput-is-available RepoNameInput-message"]';
        const campoNomeRepositorio = await page.waitForXPath(xpathInputNome, { visible: true });

        // Localiza o botão que preenche o nome do repositório com a sugestão
        const xpathBotaoSugestaoNome = '//button[contains(@class, "Box-sc-g0xbh4-0 dNphdf prc-Button-ButtonBase-c50BI")]';
        const botaoSugestaoNome = await page.$x(xpathBotaoSugestaoNome);
        await botaoSugestaoNome[0].click(); // Clica para preencher o campo com o nome sugerido

        // Espera o campo de nome de repositório ser preenchido com o nome sugerido
        await page.waitForTimeout(1000); // Espera o preenchimento do nome sugerido

        // Captura o nome preenchido
        const nomeRepositorio = await campoNomeRepositorio.evaluate(el => el.value);
        console.log(`Nome do repositório preenchido: ${nomeRepositorio}`);

        // Aguarda 2 segundos para evitar problemas de validação
        await page.waitForTimeout(2000);

        // Localiza o botão de criação de repositório e clica nele
        const xpathBotaoCriar = '//button[contains(@class, "Box-sc-g0xbh4-0 jLvIcQ prc-Button-ButtonBase-c50BI")]';
        const botaoCriarRepositorio = await page.$x(xpathBotaoCriar);
        await botaoCriarRepositorio[0].click();
        console.log("Botão de criar repositório clicado.");

        // Aguarda o carregamento da página
        await page.waitForNavigation({ waitUntil: "load" });

        // Salva um print da tela confirmando a criação
        await page.screenshot({ path: `img/${nomeRepositorio}_criado.png` });
        console.log(`Repositório "${nomeRepositorio}" criado com sucesso e screenshot salvo.`);

        return true;
    } catch (error) {
        console.error("Erro ao criar o repositório:", error.message);
        await page.screenshot({ path: `img/erro_${error.message}.png` });
        throw new Error(`Erro ao criar o repositório: ${error.message}`);
    }
};

module.exports = criarRepositorio;