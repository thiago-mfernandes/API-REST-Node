é necessario instalar a tipagem: npm i -D @types/node

npm i tsx -D: converter o typescript para js e executar no node automatizado
incluir no package: tsx src/server.ts

# requisitos funcionais: o que o usuario pode e nao pode?

- [ ] O usuario deve poder criar uma nova transacao;
- [ ] O usuario deve poder obter um resumo da sua conta;
- [ ] O usuario deve poder listar todas as transacoes que ja ocorrera;
- [ ] O usuario deve poder visualizar uma transacao unica;

# requisitos negocio

- [ ] A transacao pode ser do tipo credito que somará ao valor total, ou debito que subtraira do valor total.
- [ ] Deve ser possivel identificarmos o usuario entre as requisicoes.
- [ ] O usuario só pode visualizar o qual ele criou

# requisitos nao funcionais: como vamos atingir os requisitos funcionais e de negocios?

- [ ]