const { Pool } = require('pg')
require('dotenv').config()

//Pool = gerenciador de conexões com o banco de dados

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

//Testar conexão quando o servidor iniciar
pool.on('connect', () => {
    console.log('Conexão com o banco de dados estabelecida')
})

//Se der erro na conexão, exibir o erro
pool.on('error', (err) => {
    console.error('Erro na conexão com o banco de dados', err)
    process.exit(1) //Encerrar o processo com um código de erro
})

module.exports = pool;