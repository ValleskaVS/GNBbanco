async function connect() {
  if (global.connection) return global.connection.connect();

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  const aluno = await pool.connect();
  console.log("Conexão criada!");

  const res = await aluno.query("select now()");
  console.log(res.rows[0]);
  aluno.release();

  global.connection = pool;
  return pool.connect();
}

connect();

async function selectCustomers() {
  const aluno = await connect();
  const res = await aluno.query("SELECT * FROM alunos");
  return res.rows;
}

async function selectCustomer(id) {
  const aluno = await connect();
  const res = await aluno.query("SELECT * FROM alunos WHERE ID=$1", [id]);
  return res.rows;
}
async function insertCustomer(customer) {
  const aluno = await connect();
  const sql =
    "INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor,numero_sala) VALUES ($1,$2,$3,$4,$5,$6)";
  const values = [
    customer.nome,
    customer.idade,
    customer.nota_primeiro_semestre,
    customer.nota_segundo_semestre,
    customer.nome_professor,
    customer.numero_sala,
  ];
  await aluno.query(sql, values);
}

async function updateCustomer(id, customer) {
  const aluno = await connect();
  const sql =
    "UPDATE alunos SET nome=$1, idade=$2, nota_primeiro_semestre=$3, nota_segundo_semestre=$4, nome_professor=$5,numero_sala=$6 WHERE id=$7";
  const values = [
    customer.nome,
    customer.idade,
    customer.nota_primeiro_semestre,
    customer.nota_segundo_semestre,
    customer.nome_professor,
    customer.numero_sala,
    id,
  ];
  await aluno.query(sql, values);
}

async function deleteCustomer(id) {
  const aluno = await connect();
  const sql = "DELETE FROM alunos WHERE id=$1";
  const values = [id];
  await aluno.query(sql, values);
}

module.exports = {
  selectCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
