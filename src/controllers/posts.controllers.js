import { db } from "../database/database.connection.js";
import {
  deleteLikePostDB,
  insertLikePostDB,
  insertPostDB,
} from "../repositories/posts.repository.js";

export async function newPost(req, res) {
  const userId = res.locals.user.id;
  try {
    await insertPostDB(req.body, userId);
    res.status(201).send("Posted!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function likePost(req, res) {
  const userId = res.locals.user.id;
  try {
    const post = await insertLikePostDB(req.params, userId);
    if (!post.rowCount) return res.status(404).send("Post não encontrado!");
    res.status(201).send("Like!");
  } catch (err) {
    if ((err.constraint = "likeuniq"))
      return res.status(409).send("Post já curtido!");
    res.status(500).send(err.message);
  }
}

export async function unlikePost(req, res) {
  const userId = res.locals.user.id;
  try {
    const post = await deleteLikePostDB(req.params, userId);
    if (!post.rowCount) return res.status(404).send("Like não existe!");
    res.status(204).send("Unlike!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
