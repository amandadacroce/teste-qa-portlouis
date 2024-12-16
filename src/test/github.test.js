const puppeteer = require('puppeteer');
const fs = require('fs');
const { error, Console } = require('console');
require('dotenv').config(); // Carregar as variáveis do arquivo .env
const aguardarTwoFactorAuth = require('../funcoes/aguardarTwoFactorAuth');
const criarRepositorio = require('../funcoes/criarRepositorio');
const iniciarLogout = require('../funcoes/iniciarLogout');
const irRepositorio = require('../funcoes/irRepositorio');
const selecionarRepositorioAleatorio = require('../funcoes/selecionarRepositorioAleatorio');
const tirarPrintErro = require('../funcoes/tirarPrintErro');


const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;


// Verifica e cria a pasta "img" se ela não existir
if (!fs.existsSync('img')) {
    fs.mkdirSync('img');
}

describe('Teste de abertura do navegador, login e acesso ao GitHub', () => {
    let browser, page;

    beforeAll(async () => {
        try {
            // Tentar abrir o navegador
            browser = await puppeteer.launch({ headless: false, slowMo: 100 });
            page = await browser.newPage();
            await page.goto('https://github.com');
            console.log('Navegador aberto com sucesso!');
        } catch (error) {
            throw new Error('Falha ao abrir o navegador: ' + error.message);
        }
    });

    afterAll(async () => {
        try {
            // Tenta fechar o navegador
            await browser.close();
            console.log('Navegador fechado com sucesso!');
        } catch (error) {
            throw new Error('Falha ao fechar o navegador: ' + error.message);
        }
    });


    test('Abrir nova aba e acessar o GitHub', async () => {
        try {
            // Validar que a URL da página é a do GitHub
            const currentUrl = page.url();
            expect(currentUrl).toBe('https://github.com/');
            console.log('Página do GitHub acessada com sucesso!');
        } catch (error) {
            throw new Error('Falha ao acessar o GitHub: ' + error.message);
        }
    });

    test('Login no GitHub', async () => {
        try {
            await page.click('a[href="/login"]');
            await page.waitForSelector('input[name="login"]', { timeout: 10000 });
            await page.type('input[name="login"]', EMAIL);
            await page.type('input[name="password"]', PASSWORD);
            await page.click('input[type="submit"]');
            await page.waitForNavigation({ waitUntil: "load" });

            await aguardarTwoFactorAuth(page);

            const currentUrl = page.url();
            expect(currentUrl).toContain('https://github.com/');
        } catch (error) {
            // await tirarPrintErro('login', page);
            throw new Error('Falha ao fazer login: ' + error.message);
        }
    });


    test('Navegar até os repositórios após login', async () => {
        try {
            const repositorioNavegado = await irRepositorio(page);
            expect(repositorioNavegado).toBeTruthy();
            console.log('Navegação até os repositórios concluída com sucesso!');
        } catch (error) {
            //  await tirarPrintErro('repositorios', page);
            throw new Error('Erro ao navegar até os repositórios: ' + error.message);
        }
    });

    test('Navegar até os repositórios e acessar Pull Requests', async () => {
        try {
            // Selecionar um repositório aleatório e navegar para Pull Requests
            const repositorioSelecionado = await selecionarRepositorioAleatorio({ page });
            expect(repositorioSelecionado).toBeTruthy();
            console.log('Repositório aleatório acessado e Pull Requests abertos com sucesso!');
        } catch (error) {
            await tirarPrintErro('repositorio_e_pull_requests', page);
            throw new Error('Erro ao acessar repositórios e Pull Requests: ' + error.message);
        }
    });

    test('Criar novo repositório no GitHub', async () => {
        try {
            // Navegar até a página de repositórios
            const repositorioNavegado = await irRepositorio(page);
            expect(repositorioNavegado).toBeTruthy();
            console.log('Navegação até os repositórios concluída com sucesso!');
            const resultado = await criarRepositorio(page);
            expect(resultado).toBeTruthy();
        } catch (error) {
            // await tirarPrintErro('criar_novo_repositorio', page);
            throw new Error('Erro durante a criação do repositório: ' + error.message);
        }
    });

    test('Realizar logout no GitHub', async () => {
        try {
            // Iniciar o logout
            const logoutBemSucedido = await iniciarLogout({ page });
            expect(logoutBemSucedido).toBeTruthy();
            console.log('Logout realizado com sucesso!');
        } catch (error) {
            await tirarPrintErro('logout', page);
            throw new Error('Erro ao realizar logout: ' + error.message);
        }
    });

});


