const tirarPrintErro = async (teste, page) => {
    const filePath = `img/${teste}_erro.png`;
    await page.screenshot({ path: filePath });
    console.log(`Screenshot salva: ${filePath}`);
};

module.exports = tirarPrintErro;