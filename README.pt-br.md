# PostManager - Backend

O backend do projeto [Post Manager](https://github.com/nothingnothings/PostManager).

Resumidamente, é um backend REST API em Node.js com autenticação e lógica de criação de posts, conectado a um frontend em ReactJS, realizado o deploy do código na plataforma Railway.


![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/nothingnothings/PostManager-Backend/master?style=flat-square)
[![en](https://img.shields.io/badge/lang-en-red.svg?style=flat-square)](https://github.com/nothingnothings/PostManager-Backend)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg?style=flat-square)](https://github.com/nothingnothings/PostManager-Backend/blob/master/README.pt-br.md)



## Tecnologias

Algumas das linguagens, bibliotecas e pacotes empregados neste backend:

- Node
- Express.js (framework middleware-based para Node.js; usado para uma melhor configuração de endpoints)
- Node Package Manager (para inicializar e gerenciar o aplicativo Node.js)
- MongoDB (solução de armazenamento de banco de dados noSQL; armazenamento de objetos `user` e `post` em coleções em um banco de dados remoto MongoDB Atlas)
- `body-parser` (necessário para o parsing dos dados JSON enviados pelo frontend)
- `express-validator` (validação dos dados de entrada do usuário, no backend, com métodos como "isEmpty()" e "isLength()")
- `bcryptjs` (utilizado para o armazenamento de senhas criptografadas dentro dos documentos `user` no banco de dados MongoDB)
- `multer` - usado para receber arquivos de imagem de produtos, no endpoint "Adicionar um Produto" (desativado nesta versão de demonstração do aplicativo)
- `jsonwebtoken` (para a geração de JSON Web Tokens, que são armazenados no armazenamento local do navegador do usuário e, em seguida, verificados para autenticação)



## Estrutura de Diretórios do Projeto

A estrutura de diretórios do backend REST API:

```
.\
│
├── config\
│   ├── dev.js
│   ├── keys.js
│   └── prod.js
│
├── controllers\
│   ├── auth.js
│   └── feed.js
│
├── images\
│   ├── 504c296d-482d-4d6a-8821-9991b3ea47c6-0c64c92d97cf2c5f4ce1be7b81537d55.png
│   ├── 90fd0c3b-533d-4a9a-92c4-ab5af0cb6f6f-nodejs_original_wordmark_logo_icon_146412.png
│   ├── 9409c72d-3fb3-43e3-b499-396752769a5e-Unofficial_JavaScript_logo_2.svg.png
│   ├── aec4a1bc-c807-4b12-8772-dd7d7e4cf309-mongodb_original_wordmark_logo_icon_146425.png
│   ├── ca6cceac-4648-457b-9306-273b22427567-Unofficial_JavaScript_logo_2.svg.png
│   ├── d3ff5457-17c2-4b71-895e-4802b63cdd7a-logo-og.png
│   ├── d980ff73-f1da-488b-bc21-42efffcfa220-0c64c92d97cf2c5f4ce1be7b81537d55.png
│   ├── e17bbaa2-ef31-4d34-ab98-949ffafc7594-Unofficial_JavaScript_logo_2.svg.png
│   ├── eb3f5305-bd34-43e5-baa6-374b19358510-mobile-first-.jpg
│   └── f2036847-ce43-4135-8519-4c5b3d4030c1-Unofficial_JavaScript_logo_2.svg.png
│
├── middlewareHelpers\
│   └── is-auth.js
│
├── models\
│   ├── post.js
│   └── user.js
│
├── routes\
│   ├── auth.js
│   └── feed.js
│
├── .gitignore
├── app.js
├── package-lock.json
└── package.json
```

## Arquivos de Configuração do Projeto (package.json)

O arquivo `package.json` utilizado no projeto:

```
{
  "name": "nodeexpressbackend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-validator": "^6.13.0",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^4.2.0",
    "mongoose": "^6.0.13",
    "multer": "^1.4.3",
    "uuid": "^8.3.2"
  }
}


```

## Configuração

Para usar este projeto, clone-o usando o Git:

1. Execute `git clone` para clonar o projeto no seu repositório Git local
2. Execute `npm install` para instalar todas as dependências (`express`, `bcryptjs`, `mongodb`, etc.)
3. Execute `npm start` para iniciar o aplicativo
4. Use o servidor localmente ou implante-o na web, com a ajuda de um provedor de hospedagem (ex: Railway)
5. Para fins de demonstração, na página "Começar" (Autenticação), insira as credenciais `exemplo@exemplo.com` (email) e `exemplo` (senha) para acessar os vários recursos do aplicativo


## Destaques

- Conectado a uma Aplicação de Página Única (sem recarregamentos de página, REST API); fornecimento de um único arquivo HTML (arquivo index.html, "esqueleto" para os componentes ReactJS)
- Lógica de validação de input serverside, auxiliada pelo pacote `express-validator`
- Lógica de paginação simples para a lista de posts (botões "Next" e "Previous")
- Para fins de demonstração do deploy, apenas um único usuário está habilitado/criado no lado do servidor, com as credenciais `exemplo@exemplo.com` (campo de email) e `exemplo` (campo de senha). Além disso, os "Posts" feitos pelo usuário são redefinidos a cada 1 Hora (recurso "Scheduled Trigger" do MongoDB)
- O backend usa e gerencia os objetos "User" e "Post", que são armazenados em um banco de dados MongoDB (serviço MongoDB Atlas); o servidor Node.js e o banco de dados MongoDB também gerenciam a lógica de autenticação (login/cadastro) implementada no aplicativo
- Uso de variáveis de ambiente com o Railway para ocultar informações sensíveis (API_KEYS, JSON Web Token Secret, nomes de usuários e senhas do banco de dados, etc.)

## Inspiração

Inspirado pelos cursos "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)" e "React - The Complete Guide (incl Hooks, React Router, Redux)" de Maximilian Schwarzmüller.





