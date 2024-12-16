const iniciarLogout = async ({ page }) => {
    try {
        // Clica no botão do perfil do usuário
        const botaoPerfil = await page.waitForXPath('//button[contains(@aria-label, "user")]', { visible: true });
        await botaoPerfil.click();
        console.log('Botão de perfil clicado.');
        // await page.waitForNavigation({ waitUntil: "load" });
        // Botão de repositórios
        await page.waitForTimeout(500);

        // Clica no botão de logout
        const botaoLogout = await page.waitForXPath(
            '//span[text()="Sign out"]',
            { visible: true }
        );
        await botaoLogout.evaluate((btn) => btn.click());

        // Clica no botão de confirmação do logout
        const botaoConfirmarLogout = await page.waitForXPath(
            '(//input[@type="submit"])[1]',
            { visible: true }
        );
        await botaoConfirmarLogout.click();

        // Aguarda a navegação após o logout
        await page.waitForNavigation({ waitUntil: "load" });

        // Valida se o botão de "Sign In" está visível após o logout
        const botaoSignIn = await page.waitForXPath(
            '//a[contains(@class, "HeaderMenu-link HeaderMenu-button d-inline-flex d-lg-none flex-order-1 f5 no-underline border color-border-default rounded-2 px-2 py-1 color-fg-inherit js-prevent-focus-on-mobile-nav")]',
            { visible: true }
        );

        if (!botaoSignIn) {
            throw new Error('Falha no logout. O botão "Sign In" não foi encontrado.');
        }

        console.log('Logout realizado com sucesso! O botão "Sign In" está visível.');

        return true; // Garantir que retorne true ao final
    } catch (error) {
        throw new Error('Erro ao realizar logout: ' + error.message);
    }
};

module.exports = iniciarLogout;