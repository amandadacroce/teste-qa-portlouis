const aguardarTwoFactorAuth = async (page) => {
    console.log('Aguardando autenticação de dois fatores');
    let autenticado = false;

    for (let i = 0; i < 60; i++) {
        try {
            // Verifica se o elemento pós-login está visível
            await page.waitForXPath('//div[@class="AppHeader-user"]', { timeout: 1000 });
            autenticado = true;
            console.log('Autenticação de dois fatores concluída!');
            break;
        } catch {
            await page.waitForTimeout(1000); // Aguarda 1 segundo antes de tentar novamente
        }
    }

    if (!autenticado) {
        throw new Error('Autenticação de dois fatores não foi concluída no tempo limite.');
    }
};

module.exports = aguardarTwoFactorAuth;