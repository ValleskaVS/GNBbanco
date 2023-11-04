require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
app.get("/alunos/:id", async (req, res) => {
  const alunos = await db.selectCustomer(req.params.id);
  res.json(alunos);
});
/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna a lista de todos os alunos
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 */
app.get("/alunos", async (req, res) => {
  const alunos = await db.selectCustomers();
  res.json(alunos);
});
/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               idade:
 *                 type: integer
 *               nota_primeiro_semestre:
 *                 type: number
 *               nota_segundo_semestre:
 *                 type: number
 *               nome_professor:
 *                 type: string
 *               numero_sala:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 */
app.post("/alunos", async (req, res) => {
  await db.insertCustomer(req.body);
  res.sendStatus(201);
});
/**
 * @swagger
 * /alunos/{id}:
 *   patch:
 *     summary: Atualiza um aluno pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do aluno a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               idade:
 *                 type: integer
 *               nota_primeiro_semestre:
 *                 type: number
 *               nota_segundo_semestre:
 *                 type: number
 *               nome_professor:
 *                 type: string
 *               numero_sala:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 */

app.patch("/alunos/:id", async (req, res) => {
  await db.updateCustomer(req.params.id, req.body);
  res.sendStatus(200);
});
/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do aluno a ser removido
 *     responses:
 *       204:
 *         description: Aluno removido com sucesso
 */
app.delete("/alunos/:id", async (req, res) => {
  await db.deleteCustomer(req.params.id);
  res.sendStatus(204);
});

app.listen ({
  port: process.env.PORT ?? 3000,
})

console.log("Backend rodando");
