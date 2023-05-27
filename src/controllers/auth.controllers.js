import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getUserByEmailDB, newSessionDB, newUserDB } from "../repositories/auth.repository.js";

export async function signup(req, res) {
  const { password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const addUser = await newUserDB(req.body, passwordHash);
    if (!addUser.rowCount) return res.status(409).send("Email já cadastrado!");
    res.status(201).send("Usuário cadastrado!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { password } = req.body;
  try {
    const login = await getUserByEmailDB(req.body);

    if (!login.rowCount) return res.status(401).send("Email não cadastrado.");
    if (!bcrypt.compareSync(password, login.rows[0].password))
      return res.status(401).send("Senha incorreta.");

    //Criação de sessão
    const token = uuid();
    await newSessionDB(token, login);
    res.send({ id: login.rows[0].id, username: login.rows[0].username, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
