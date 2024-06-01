import { Pool } from 'pg';

const pool = new Pool({
  user: 'nandy',
  host: 'localhost',
  database: 'nandy',
  password: 'sport8799',
  port: 5432, 
});

// Teste de conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Erro ao conectar ao PostgreSQL', err);
  } else {
      console.log('Conectado ao PostgreSQL em', res.rows[0].now);
  }
});


export default pool;

// em um projeto eu carregaria as variaveis em um .env, mas vou deixar aqui :0
