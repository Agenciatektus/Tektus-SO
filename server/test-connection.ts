import { db } from './db';

async function testConnection() {
  try {
    // Tenta fazer uma consulta simples
    const result = await db.$queryRaw`SELECT 1`;
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    console.log('Resultado do teste:', result);
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  } finally {
    await db.$disconnect();
  }
}

testConnection(); 