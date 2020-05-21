<p align="center"><img src=".github/logo.png" width="400"></p>


<p  align="center">Este codigo representa a minha solução do teste proposto pela <a  href="https://www.gowork.com.br/">GoWork</a></p>

## 🚀 Sobre o projeto
Coplace é uma aplicação para gerenciamento de clientes de coworking desenvolvida como resolução ao [teste para a vaga de fullstack na empresa GoWork](https://github.com/ctg325/teste-gowork), desenvolvida com [React para o front-end]() e duas versões para o back-end, uma em [PHP com Laravel]() e outra em [NodeJS e Express]().

 - [Back-end NodeJS]()
 - [Resolução do teste]()
 - [Tecnologias]()
 - [Instalação e execução]()
 - [Documentação da API]()
 - [Próxima etapa]()

## 🧑🏻‍💻 Back-end NodeJS
O projeto foi desenvolvido seguindo os princípios de [TDD](https://pt.wikipedia.org/wiki/Test-driven_development) 👮🏻‍♂️, possuindo 28 testes atualmente e desempenho de 100%.

Trata-se de uma API REST desenvolvida com [Express](https://expressjs.com/pt-br/) possuindo tratamento de erros personalizado permitindo a captura de tracebacks 🔥 com [Sentry](https://sentry.io/).

A aplicação possui [sistema de autenticação realizado com JWT](https://www.npmjs.com/package/jsonwebtoken) 🕵🏻‍♂️ e contempla a funcionalidade de [upload de imagens](https://www.npmjs.com/package/multer) .

Para garantir maior segurança nos dados consumidos pela API, foi utilizado o [um construtor de schema para análise e validação de dados](https://www.npmjs.com/package/yup).

O armazenamento dos dados é feito em um banco de dados relacional, o [PostreSQL](https://www.postgresql.org/) e a ORM escolhida para o consumo dos dados foi o [Sequelize](https://www.npmjs.com/package/sequelize).

## 🤯 Resolução do teste

A aplicação hoje contempla:

✅  Cadastro de Unidades (Escritorios)
> Foi criado o endpoint ```/offices``` onde o usuário pode consumir os dados das unidades já disponíveis e também cadastrar novas unidades.

✅  Cadastro de Planos de Coworking, contendo Nome do Plano, Valor Mensal

> Foi criado o endpoint ```/plans``` onde o usuário realiza a gestão dos planos oferecidos pela empresa.

✅  Cadastro de Clientes (Pessoa Fisica e Juridica) vinculado com Plano Contratado e Unidade

> Foi criado o endpoint ```/customers``` onde o usuário poderá listar seus clientes atuais e também adicionar novos.

✅  Cadastro de Funcionarios do Cliente/Pessoas que podem usar o Coworking

> Foi criado o endpoint ```/employees``` onde o usuário realizará a gestão de funcionários de seus clientes.

## 🛸 Tecnologias
Esse projeto foi desenvolvido:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://github.com/expressjs/express)
- [Sequelize]([https://sequelize.org/](https://sequelize.org/))
- [Sentry]([https://www.npmjs.com/package/@sentry/node](https://www.npmjs.com/package/@sentry/node))
- [Multer]([https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer))

## 🛠 Instalação e execução
### Pré-requisitos

-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/)

**Faça um clone desse repositório**

-   Rode  `yarn`  para instalar sua dependências;
-   Rode  `cp .env.example .env`  e preencha o arquivo  `.env`  com suas variáveis ambiente;
-   Rode  `docker-compose up -d`  para montar o ambiente;
-   Rode  `yarn sequelize db:migrate`  para executar as migrations;
-   Rode  `yarn dev`  para iniciar o servidor;

**Testes**

- Rode ``yarn test``

## 🚗 Rotas da API

### POST  ``/api/auth``
> Realiza a autenticação do usuário administrador
>
|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``application/json`` | ``application/json``

### GET ``/api/offices``
> Realiza a listagem de unidades/escritórios
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``null`` | ``application/json``

### POST ``/api/offices``
> Realiza o cadastramento de unidade/escritório
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``application/json`` | ``application/json``

### GET ``/api/plans``
> Realiza a listagem de planos
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``null`` | ``application/json``

### POST ``/api/plans``
> Realiza o cadastramento de planos
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``application/json`` | ``application/json``

### GET ``/api/customers``
> Realiza a listagem de clientes
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``null`` | ``application/json``

### POST ``/api/customers``
> Realiza o cadastramento de clientes
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``application/json`` | ``application/json``

### GET ``/api/employees/{1}``
> Realiza a listagem de funcionários de um cliente
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``ID do cliente`` | ``null`` | ``application/json``

### POST ``/api/employees``
> Realiza o cadastramento de um funcionário
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``application/json`` | ``application/json``

### POST ``/api/upload``
> Realiza o upload de um arquivo
>

|Params | Query | Body | Response
|--|--|--|--|
|``null``  | ``null`` | ``multipart/form-data`` | ``application/json``

## 📌 Próxima etapa

**Unidades**
- Deleter unidade
- Editar unidade

**Planos**
- Deleter unidade
- Editar unidade

**Clientes**
- Deleter unidade
- Editar unidade

**Funcionários**
- Deleter unidade
- Editar unidade

**Administrador**
- Cadastro

***
Feito com ♥️ by Brendenson - [Github](https://github.com/trylix) | [LinkedIn](https://www.linkedin.com/in/dobrendenson)
