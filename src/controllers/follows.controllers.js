import { db } from "../database/database.connection.js";
import { getUserByIdDB } from "../repositories/auth.repository.js";
import {
  deleteFollowDB,
  getFollowersByIdDB,
  getFollowsByIdDB,
  insertFollowDB,
} from "../repositories/follows.repository.js";

export async function followUser(req, res) {
  const followerId = res.locals.user.id;
  const accountId = req.params.userId;
  if (Number(followerId) === Number(accountId))
    return res.status(409).send("Você não pode seguir a si mesmo!");
  try {
    const follow = await insertFollowDB(followerId, accountId);
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
  const followerId = res.locals.user.id;
  const accountId = req.params.userId;
  if (Number(followerId) === Number(accountId))
    return res.status(409).send("Você não pode deixar de seguir a si mesmo!");
  try {
    const unfollow = await deleteFollowDB(followerId, accountId);
    if (!unfollow.rowCount) {
      const user = await getUserByIdDB(accountId);
      if (!user.rowCount)
        return res.status(404).send("Usuário não encontrado!");
      return res.status(409).send("Vocẽ não segue esse usuário!");
    }

    res.status(204).send("Deixando de seguir o usuário!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getFollowers(req, res) {
  const accountId = req.params.userId;
  try {
    const user = await getUserByIdDB(accountId);
    if (!user.rowCount) return res.status(404).send("Usuário não encontrado!");
    const followers = await getFollowersByIdDB(req.params);
    res.status(200).send(
      {
        username: user.rows[0].username, 
        followers: followers.rows 
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getFollows(req, res) {
  const accountId = req.params.userId;
  try {
    const user = await getUserByIdDB(accountId);
    if (!user.rowCount) return res.status(404).send("Usuário não encontrado!");
    const follows = await getFollowsByIdDB(req.params);
    res.status(200).send({
      username: user.rows[0].username, 
      follows: follows.rows 
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
