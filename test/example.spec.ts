import { expect, test, beforeAll, afterAll } from 'vitest'
//import supertest from 'supertes' troquei o nome pra ficar mais semantico
import request from 'supertest'
import { app } from '../src/app'
/**
 * o texto é composto por 3 variavies importantes:
 * 1.o enunciado, qual é o proposito do teste
 * 2.a operacao
 * 3.a validacao
 */

beforeAll(async () => {
  //essa funcao vai aguardar meu fastify cadastrar todos os plugins, que sao assincronos
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('user should be able to create a new transaction', async () => {
  //fazer a chamada http p/ criar uma nova transacao
  const response = await request(app.server)
    .post('/transactions')
    .send({
      title: 'Test New Transaction',
      amount: 5000,
      type: 'credit',
    })
  
    expect(response.statusCode).toEqual(201)
})