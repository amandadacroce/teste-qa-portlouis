const criarRepositorio = async (page) => {
    try {
        console.log("Objeto 'page' recebido", page);

        await page.goto("https://github.com/new");


        const xpathInputNome = '//input[@aria-describedby="RepoNameInput-is-available RepoNameInput-message"]';
        const campoNomeRepositorio = await page.waitForXPath(xpathInputNome, { visible: true });


        const xpathBotaoSugestaoNome = '//button[contains(@class, "Box-sc-g0xbh4-0 dNphdf prc-Button-ButtonBase-c50BI")]';
        const botaoSugestaoNome = await page.$x(xpathBotaoSugestaoNome);
        await botaoSugestaoNome[0].click();


        await page.waitForTimeout(1000);


        const nomeRepositorio = await campoNomeRepositorio.evaluate(el => el.value);
        console.log(`Nome do repositório preenchido: ${nomeRepositorio}`);

        // Aguarda 2 segundos para evitar problemas de validação
        await page.waitForTimeout(2000);


        const xpathBotaoCriar = '//button[contains(@class, "Box-sc-g0xbh4-0 jLvIcQ prc-Button-ButtonBase-c50BI")]';
        const botaoCriarRepositorio = await page.$x(xpathBotaoCriar);
        await botaoCriarRepositorio[0].click();
        console.log("Botão de criar repositório clicado.");


        await page.waitForNavigation({ waitUntil: "load" });

        await page.screenshot({ path: `src/img/${nomeRepositorio}_criado.png` });
        console.log(`Repositório "${nomeRepositorio}" criado com sucesso e screenshot salvo.`);

        return true;
    } catch (error) {
        console.error("Erro ao criar o repositório:", error.message);
        await page.screenshot({ path: `img/erro_${error.message}.png` });
        throw new Error(`Erro ao criar o repositório: ${error.message}`);
    }
};

module.exports = criarRepositorio;