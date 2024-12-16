# Projeto de Testes Automatizados - GitHub

Este projeto realiza testes automatizados de login, navegação e criação de repositórios no GitHub utilizando [Puppeteer](https://github.com/puppeteer/puppeteer) e [Jest](https://jestjs.io/).

## Tecnologias Utilizadas
- **Node.js**: v22.11.0
- **Puppeteer**: ^20.3.0
- **Jest**: ^29.7.0
- **dotenv**: ^16.4.1

## Requisitos
- **Node.js**: Certifique-se de que a versão do Node.js instalada no sistema é **v22.11.0**. Para gerenciar versões do Node.js, você pode usar ferramentas como [nvm](https://github.com/nvm-sh/nvm).
- **GitHub Account**: É necessário uma conta no GitHub para realizar os testes de login e criação de repositórios.

## Configuração do Ambiente

1. Clone o repositório para sua máquina:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

   **Nota**: Certifique-se de que a versão do Puppeteer instalada seja exatamente **20.3.0**, pois outras versões podem apresentar incompatibilidades.

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo e preencha com seus dados do GitHub:

   ```env
   EMAIL=seu_email
   PASSWORD=sua_senha
   ```

   **Atenção**: Mantenha o arquivo `.env` seguro e evite compartilhá-lo publicamente.

## Comandos Disponíveis

- **Executar os testes**:

   ```bash
   npm test
   ```

   Este comando executará todos os testes definidos no projeto, incluindo login, navegação, criação de repositórios e logout.

## Estrutura do Projeto

```
.
├── src
|   ├── funcoes
|        ├── aguardarTwoFactorAuth.js
|        ├── criarRepositorio.js
|        ├── iniciarLogout.js
|        ├── irRepositorio.js
|        ├── selecionarRepositorioAleatorio.js
|        ├── tirarPrintErro.js
│   ├── test
│        ├── github.test.js
├── .env
├── package.json
├── README.md
└── img
```
- **funcoes/**: Pasta onde são armazenadas as funções auxiliares que são utilizadas pelos testes.
   -aguardarTwoFactorAuth.js: Função que aguarda a autenticação de dois fatores (se necessário) no processo de login.
   -criarRepositorio.js: Função que automatiza o processo de criação de um repositório no GitHub.
   -iniciarLogout.js: Função que realiza o logout do usuário na plataforma.
   -irRepositorio.js: Função que navega até a página de repositórios do GitHub.
   -selecionarRepositorioAleatorio.js: Função que seleciona aleatoriamente um repositório na lista de repositórios.
   -tirarPrintErro.js: Função que tira screenshots de erro durante os testes.
- **/test/**: Contém os testes que validam o comportamento das funções e da aplicação.
- **.env**: Contém as variáveis de ambiente com as credenciais de login.
- **img/**: Diretório onde os screenshots são salvos durante os testes.

## Considerações Importantes

1. **Versões de Dependências**: Certifique-se de instalar as versões indicadas das bibliotecas para evitar problemas de compatibilidade.
2. **Autenticação de Dois Fatores**: Se sua conta do GitHub estiver com autenticação de dois fatores ativada, será necessário inserir o código manualmente durante o teste de login.
3. **Screenshots**: Em caso de erro, capturas de tela serão salvas no diretório `img/` para facilitar a análise.

## Troubleshooting
- **Erro ao iniciar Puppeteer**: Verifique se as versões do Node.js e do Puppeteer estão corretas.
- **Falha no login**: Certifique-se de que as credenciais no arquivo `.env` estão preenchidas corretamente sem espaços.


---

**Autor:** Amanda da Croce Armiliato  
**Contato:** dacroce.a07@gmail.com

