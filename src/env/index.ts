import { config } from 'dotenv'
import { z } from 'zod'


if(process.env.NODE_ENV === 'test') {
  //se eu estiver em abient de teste, executar as variaveis do arquivo do path:
  config({
    path: '.env.test'
  })
} else {
  config()
}

//process.env é um objeto
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

//meu parse recebe as informacoes la do meu arquivo env, verifica cada variavel, e se caso houver um erro, ele dispara um erro
const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data