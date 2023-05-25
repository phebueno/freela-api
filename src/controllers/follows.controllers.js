import { db } from "../database/database.connection.js";
import { deleteFollowDB, getFollowersByIdDB, getFollowsByIdDB, insertFollowDB } from "../repositories/follows.repository.js";

export async function followUser(req, res) {
  //AUTH vai dar userId (followerId) por locals
  const followerId = 7;
  const accountId = req.params.userId;
  if (Number(followerId) === Number(accountId))
    return res.status(409).send("Você não pode seguir a si mesmo!");
  try {
    const follow = await insertFollowDB(followerId,accountId);
    if (!follow.rowCount)
      return res.status(404).send("Usuário não encontrado!");
    res.status(201).send("Seguindo o usuário!");
  } catch (err) {
    if ((err.constraint = "followuniq"))
      return res.status(409).send("Você já segue este usuário!");
    res.status(500).send(err.message);
  }
}

export async function unfollowUser(req, res) {
  //AUTH vai dar userId (followerId) por locals
  const followerId = 7;
  const accountId = req.params.userId;
  if (Number(followerId) === Number(accountId))
    return res.status(409).send("Você não pode deixar de seguir a si mesmo!");
  try {
    const unfollow = await deleteFollowDB(followerId,accountId)
    if (!unfollow.rowCount)
      return res.status(404).send("Usuário não encontrado!");
    res.status(204).send("Deixando de seguir o usuário!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getFollowers(req, res) {
  const accountId = req.params.userId;
  try {
    const followers = await getFollowersByIdDB(req.params)
    if (!followers.rowCount) {
      //verifica se usuário é valido (pode virar middleware)
      const user = await db.query(`SELECT * FROM users WHERE id=$1`, [accountId]);
      if (!user.rowCount) return res.status(404).send("Usuário não encontrado!");
    }
    res.status(200).send(followers.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getFollows(req, res) {
    const accountId = req.params.userId;
    try {
      const followers = await getFollowsByIdDB(req.params);
      if (!followers.rowCount) {
        //verifica se usuário é valido (pode virar middleware)
        const user = await db.query(`SELECT * FROM users WHERE id=$1`, [accountId]);
        if (!user.rowCount) return res.status(404).send("Usuário não encontrado!");
      }
      res.status(200).send(followers.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
}
