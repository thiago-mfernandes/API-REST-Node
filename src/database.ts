import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

// if(!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL env not found.')
// }

export const config: Knex.Config = {
  //passar o cliente(tipo de banco)
  client: 'sqlite',
  //infos relativas a conexao
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  //aqui eu configuro o tipo de extensao e local onde as migrations vao ser salvas
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  }
}

export const knex = setupKnex(config)