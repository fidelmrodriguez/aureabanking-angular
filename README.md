# Aurea Banking

Painel web de internet banking construído em Angular SSR, com autenticação via DummyJSON, rotas protegidas, perfis de acesso, dashboard financeiro, extrato, transferências, pagamentos, notificações, auditoria e tema claro/escuro.

## Netlify
https://aureabanking-angular.netlify.app/

## Recursos

- Login integrado à DummyJSON.
- Autenticação persistida com token.
- Interceptor HTTP com Bearer token.
- Guard de autenticação e guard de permissão por perfil.
- Dashboard com saldo, investimentos, cartões e gráficos SVG.
- Extrato com filtros avançados.
- Transferência entre contas com validações.
- Agendamento de pagamentos.
- Notificações em dropdown na topbar.
- Página dedicada de notificações.
- Perfil, preferências e troca de tema.
- Perfis cliente, gerente e admin.
- Auditoria de ações.
- Layout responsivo.
- Topbar fixa no mobile com menu hambúrguer e dropdown.
- Componentes próprios para feedback visual, sem `alert`, `confirm`, `prompt` ou modal nativo do navegador.

## Stack

- Angular 19 com SSR
- TypeScript
- Reactive Forms
- HttpClient
- Guards, interceptors e resolvers
- Signals
- RxJS
- Jasmine/Karma
- DummyJSON

## Requisitos

- Node.js 20.16.0 ou superior.
- npm 10 ou superior.

## Como clonar e rodar

```bash
git clone <url-do-repositorio>
cd aurea-banking-angular-ssr
npm install
npm run dev
```

Acesse `http://localhost:4200`.

## Credenciais padrão

Use os dados preenchidos na tela de login:

```txt
Usuário: User
Senha: 1234
```

O nome exibido dentro do sistema é `User`.

## Scripts disponíveis

```bash
npm run dev       # inicia o ambiente de desenvolvimento
npm run build     # gera a versão de produção com SSR
npm run serve:ssr # executa o servidor SSR gerado
npm test          # executa os testes unitários
```

## Build SSR

```bash
npm run build
npm run serve:ssr
```

## Testes

```bash
npm test
```
