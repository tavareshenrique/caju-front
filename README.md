
<h1 align="center">
  <img alt="Daily Diet API" title="Daily Diet API" src="https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/public/assets/images/logo-caju.png" width="300px" />
</h1>

# Teste de Front-End da Caju

Esse é a conclusão do desafio técnico da vaga de Front-End da Caju Benefícios. Abaixo vou listar as especificações e requisitos para a conclusão do teste, e coisas foram feitas fora do solicitado.

## Especificações

Foi solicitado as seguintes funcionalidades abaixo, e todas foram implementadas, são elas:

### Tela Dashboard

:white_check_mark: Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
:white_check_mark: Filtrar os cards por coluna, usando o status.
:white_check_mark: Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
:white_check_mark: Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
:white_check_mark: Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
:white_check_mark: Implementar `DELETE` ao clicar no lixeira no card.
:white_check_mark: O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW`
:white_check_mark: O botão `Revisar novamente` só deve aparecer em admissões com o status `REPROVED` ou `APPROVED`
:white_check_mark: Implementar um loading na tela ao realizar requisições.
:white_check_mark: Todas as ações devem ter modal de confirmação e uma notificação de sucesso ou erro
:white_check_mark: Adicionar máscara de CPF no campo de pesquisa.
:white_check_mark: Atualizar os dados (refetch) ao clicar no ícone de atualizar


### Tela Cadastro

:white_check_mark:  Implementar validação no campo de `email` para que aceite apenas emails válidos
:white_check_mark:  Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
:white_check_mark:  Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
:white_check_mark:  Implementar `POST` ao preencher todos os campos corretamentes.
:white_check_mark:  Redirecionar ao `/dashboard` ao criar uma nova admissão.

## Novas Funcionalidades

Provavelmente vou esquecer algumas coisas, mas vou tentar listar as principais, mas com certeza vão perceber coisas durante o uso.

### Drag and Drop
Uma nova funcionalidade que foi implementada, que é o Drag and Drop, onde é possível arrastar e soltar os cards para alterar o status de uma admissão.

![Drag and Drop](https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/.previews/Drag-And-Drop-Action.gif)

### Docker

Foi adicionado o Docker para facilitar a execução da aplicação, e para isso foi criado um arquivo `Dockerfile` e um `docker-compose.yml` para facilitar a execução da aplicação.

### Opção de Delete no Search

Foi adicionado a opção de apagar o que foi digitado no campo de pesquisa, para facilitar a busca de novos CPFs, visando UX.

![CPF](https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/.previews/cpf.gif)

### Atomic Design

Dentro da pasta `src/components/atoms` foi criado **[Atomic Design](https://medium.com/pretux/atomic-design-o-que-%C3%A9-como-surgiu-e-sua-import%C3%A2ncia-para-a-cria%C3%A7%C3%A3o-do-design-system-e3ac7b5aca2c)** para facilitar a criação de novos componentes, isso facilita a manutenção e a criação de novos componentes.

![AC](https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/.previews/Atomic-Components.png)

### Toast

Foi adicionado um Toast para notificar o usuário quando uma ação foi realizada com erro.

![Toast](https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/.previews/toast.gif)

### ESLint

Resolvi usar minhas configurações do ESLint personalizada por convenção mesmo, já que não havia uma restrição para isso.

https://github.com/tavareshenrique/eslint-config-henrique

### Editor Config

Adicionei o arquivo `.editorconfig` para manter a padronização do código.

### PNPM

Resolvi usar o PNPM para instalar as dependências, é o que tenho usado atualmente, vejo umas boas vantagens nele, e como não havia uma restrição para isso, resolvi usar.

### Import Path

Resolvi usar `@` para importar os arquivos ao invés de `~` por convenção mesmo, já que não havia uma restrição para isso.

### Novo padrão do React DOM

Ajustei para usar o novo padrão de renderização do React DOM, que é o `createRoot(document.getElementById('root')!).render(<App />);`, que é o novo padrão do React.

## Testes

### Testes Unitários e de Integração

Foi implementado testes unitários e de integração, para garantir a qualidade do código, e para isso foi utilizado o [Vitest](https://vitest.dev/) e o [Testing Library](https://testing-library.com/).

> Por que foi usado o Vitest? Porque ele é um pouco mais rápido que o Jest, e além do mais, o projeto está usando Vite, então isso também ajuda na integração.

![Unit-Int](https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/.previews/unit-integration.gif)


### E2E

Foi implementado testes E2E, para garantir a qualidade do código, e para isso foi utilizado o [Playwright](https://playwright.dev/).

> Por que foi usado o Playwright? Resumindo, apenas por curiosidade, e validação de ferramenta, ainda não tinha tido a oportunidade de usar, e resolvi testar. Além disso, ele consegue rodar várias browsers ao mesmo tempo, o que é bem interessante.

![e2e](https://raw.githubusercontent.com/tavareshenrique/caju-front/refs/heads/main/.previews/e2e.gif)


## CI/CD

### CI

Foi implementado o CI com o Github Actions, para garantir a qualidade do código, e para isso foi utilizado o [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/). Resumindo, o CI vai rodar os testes unitários, de integração e E2E após qualquer commit na branch `main`.

### CD

Foi implementado o CD utilizando a Vercel para hospedar a aplicação, e para isso foi utilizado o [Vite](https://vitejs.dev/), [Vercel](https://vercel.com/). Resumindo, o CD vai fazer o deploy da aplicação após qualquer commit na branch `main`.

### Hospedagem

Vale destacar que houve uma hospedagem, a hospedagem Front-End é simples, como mencionado, foi utilizado a [Vercel](https://vercel.com/), e a hospedagem do Back-End foi utilizado o [Render](https://render.com/).

> Vale destacar que por ser um plano gratuito do Render, ele pode demorar um pouco para responder, ou então, pode ter tirado a aplicação do ar, então, recomendo que abra o server isolado através do link abaixo, e depois acesse a aplicação. Dessa forma, força o servidor a ficar online, mas não é garantia que funciona.

> O recomendado mesmo, por ser uma aplicação teste, é rodar localmente.

> Link do Server
> https://caju-server.onrender.com/registrations

> Link da Aplicação
> https://caju-front.vercel.app/#/dashboard

## Como rodar o projeto


Realize o clone do repositório e instale as dependências

```shell
git clone https://github.com/tavareshenrique/caju-front

cd caju-front
```

```shell
pnpm install
```

### Utilizando Docker

```shell
docker-compose up --build
```
> A flag `--build` é  utilizando no primeiro momento, depois não precisa mais, pode usar apenas `docker-compose up`

### Manualmente

Rode o Servidor

```shell
pnpm init:db
```

Execute a aplicação

```shell
pnpm dev
```

### Acesso

Se tudo ocorreu bem os seguintes serviços estarão disponiveis em:

> Aplicação: http://localhost:3001/#/dashboard

> Servidor: http://localhost:3000/#/dashboard

### Rodando Testes Localmente

Rodando Testes Unitários e de Integração

```shell
pnpm test
```

Rodando Testes E2E via GUI

```shell
pnpm test:e2e
```

Rodando Testes E2E via CLI

```shell
pnpm test:e2e:ci
```
