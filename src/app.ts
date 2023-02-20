import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

// GET, POST PUT, PATCH, DELETE
app.register(cookie)

//pra adicionar meu plugin, utilizo register
app.register(transactionsRoutes, {
  //esse prefixo eh uma configuracao pra que em todas as minhas rotas eu caia no prefixo da rota(transactions) e nao precise delcarar la na rota essa parte da url novamente. Ex.: /transactions

  //fica somente: /
  prefix: '/transactions'
})