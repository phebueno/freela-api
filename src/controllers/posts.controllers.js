import { db } from "../database/database.connection.js";

export async function newPost(req, res) {
  //AUTH vai dar userId por locals
  const userId = 1;
  const { imgPost, bodyPost } = req.body;
  try {
    await db.query(
      `
        INSERT INTO posts ("imgPost","bodyPost","userId", "createdAt") 
            VALUES ($1,$2, $3, NOW());
        `,
      [imgPost, bodyPost, userId]
    );
    res.status(201).send("Posted!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function likePost(req, res) {
  //AUTH vai dar userId por locals
  const userId = 1;
  const {postId} = req.params;
  try {
    const post = await db.query(
        `
        INSERT INTO likes ("likerId","postId","createdAt")
        SELECT $1, $2, NOW() FROM posts 
            WHERE id=$2
        ;
          `,
        [userId, postId]
      );
      console.log(post);
    if(!post.rowCount) return res.status(404).send("Post não encontrado!");
    res.status(201).send("Like!");
  } catch (err) {
    if(err.constraint='likeuniq') return res.status(409).send("Post já curtido!");
    res.status(500).send(err.message);
  }
}

export async function unlikePost(req, res) {
  //AUTH
  const userId = 3;
  const {postId} = req.params;
  try {
    const post = await db.query(
        `
        DELETE FROM likes 
          WHERE "postId" IN 
            (SELECT id FROM posts WHERE id=$2)
          AND "likerId" = $1
        ;
          `,
        [userId, postId]
      );
    if(!post.rowCount) return res.status(404).send("Like não existe!")
    res.status(204).send("Unlike!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
