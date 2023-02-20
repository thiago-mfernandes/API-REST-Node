//plugin - todo plugin precisa ser uma funcao assincrona

import { FastifyInstance } from "fastify"
import { knex 
} from "../database"
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from "../middlewares/check-session-id-exists"

//recebo como parametro o app do server, e declaro as chamadas
export async function transactionsRoutes(app: FastifyInstance) {

  app.get(
    '/', 
    { 
      preHandler: [checkSessionIdExists],
    } ,
    async(request, reply) => {

      const { sessionId } = request.cookies
      
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()
      //console.log(transactions)
      return { transactions }
    },
  )



  app.get(
    '/:id', 
    {
      preHandler: [checkSessionIdExists] 
    }, 
    async(request) => {
      //faco uma tipagem
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })
      //passo meu req.params pra validar no schema de validacao, e pego o id
      const { id } = getTransactionParamsSchema.parse(request.params)
      //busco na table transaction o campo id, passando o id de busca como segundo parametro e executo o metodo first, que eh pra retornar apenas o primeiro valor, pq meu id eh um valor unico
      const { sessionId } = request.cookies
      const transaction = await knex('transactions')
        .where({
          'session_id': sessionId,
          'id': id,
        })
        .first()

      return { transaction }
  })



  app.get(
    '/summary', 
    {
      preHandler: [checkSessionIdExists] 
    }, 
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount'})
        .first()
      return { summary }
  })



  //passo pra minha arrow function um parametro req, pra pegar os dados do body
  app.post('/', async(request, reply) => {
    
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(request.body)
    //procuro na rquisicao, nos cookies se existe um valor sessionID
    let sessionId = request.cookies.sessionId;
    //se nao existe eu crio um valor com UUID
    if(!sessionId) {
      sessionId = randomUUID()
      //e salvo nos cookies um valor com chave sessionId passando o valor sessionId
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
      })
    }

    await knex('transactions')
      .insert({
        id: randomUUID(),
        title,
        //se for credito, vai pra tabela na linha amount
        //se for debito, faz o valor * -1 e torna o valor negativo, e vira um valor de debito
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId
      })

    return reply.status(201).send()
  })
}