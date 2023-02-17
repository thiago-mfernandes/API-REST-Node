import { Knex } from "knex";

//up: o que essa migration faz?
export async function up(knex: Knex): Promise<void> {
  //metodo para criar a tabela, segundo paramentro a funcao que recebe um param table
  await knex.schema.createTable('transactions', (table) => {
    //aqui eu consigo acessar os tipo de campos a serem criados:
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

//down: deu merda! faz o contrario do que foi feito no up, desfaz, remove, deleta..
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

