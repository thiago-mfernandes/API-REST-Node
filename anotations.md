é necessario instalar a tipagem: npm i -D @types/node

npm i tsx -D: converter o typescript para js e executar no node automatizado
incluir no package: tsx src/server.ts

# requisitos funcionais: o que o usuario pode e nao pode?

- [x] O usuario deve poder criar uma nova transacao;
- [x] O usuario deve poder obter um resumo da sua conta;
- [x] O usuario deve poder listar todas as transacoes que ja ocorrera;
- [x] O usuario deve poder visualizar uma transacao unica;

# requisitos negocio

- [x] A transacao pode ser do tipo credito que somará ao valor total, ou debito que subtraira do valor total.
- [x] Deve ser possivel identificarmos o usuario entre as requisicoes.
- [ ] O usuario só pode visualizar o qual ele criou

# requisitos nao funcionais: como vamos atingir os requisitos funcionais e de negocios?

- [ ]

## tipos de teste:
// unitarios - uma unidade, um componente da aplicacao
// integracao: comunicacao entre duas ou mais unidades
// e2e - ponta a ponta: simulam um usuario operando na aplicacao

// o usuario do back-end é o front-end: chamadas http, websockets, desde a rota ateh o banco de dados

// piramide de testes: e2e (nao dependem de nenhuma tecnologia, nao dependem de arquitetura)

//maior quantidade de testes unitarios na base da piramide
//alguns testes de integracao 
//um ou poucos testes e2e

## deploy
instalar ``npm i tsup -D``
add scrpt: "build": "tsup src --out-dir build"
rodar no terminal: node build/server.js e testar pra ver se o codigo esta funcionando
incluir a pasta build no gitignore