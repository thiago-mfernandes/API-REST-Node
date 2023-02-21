import { expect, test, beforeAll, afterAll, describe, it, beforeEach } from 'vitest'
//import supertest from 'supertes' troquei o nome pra ficar mais semantico
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
/**
 * o texto é composto por 3 variavies importantes:
 * 1.o enunciado, qual é o proposito do teste
 * 2.a operacao
 * 3.a validacao
 */

describe('Transactions Routes', () => {
  
  beforeAll(async () => {
    //essa funcao vai aguardar meu fastify cadastrar todos os plugins, que sao assincronos
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  //como nao existe um banco de dados para o ambiente de teste, entao, antes de cada teste:
  beforeEach(() => {
    //é ideal que para cada teste eu tenho meu banco de dados zerado
    execSync('npm run knex migrate:rollback --all')
    //execSync executa comandos como se fosse um terminal, entao eu rodo as migrations
    execSync('npm run knex migrate:latest')

    //a cada teste, eu apago o banco, e crio de novo
  })
  
  it('user should be able to create a new transaction', async () => {
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

  it('should be able to list all transactions', async () => {
    //um teste nao pode depender de outro.
    //Nenhuma transacao existe ainda aqui. Entao, para listar uma transacao preciso cria-la primeiramente

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test New Transaction',
        amount: 5000,
        type: 'credit',
      })
    //pego o identificador da transacao
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      //faco uma requisicao pro servidor
      .get('/transactions')
      //passando o cookie do usuario
      .set('Cookie', cookies)
      .expect(200)
    
    //valido os dados que estao sendo retornador na resposta da requisicao
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Test New Transaction',
        amount: 5000
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test New Transaction',
        amount: 5000,
        type: 'credit',
      })
    
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      //faco uma requisicao pro servidor
      .get('/transactions')
      //passando o cookie do usuario
      .set('Cookie', cookies)
      .expect(200)
    
    const transactionId = listTransactionsResponse.body.transactions[0].id
    //console.log(transactionId)

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)
    
    //valido os dados que estao sendo retornados na resposta da requisicao: olhar o retorno no transactions.ts
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Test New Transaction',
        amount: 5000
      }),
    )
  })

  it('should be able to get the summary', async () => {
    //criar duas transacoes para testar:

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credit',
      })
    
    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      //faco uma requisicao pro servidor
      .get('/transactions/summary')
      //passando o cookie do usuario
      .set('Cookie', cookies)
      .expect(200)
    
    //valido os dados que estao sendo retornador na resposta da requisicao
    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
