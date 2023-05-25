import { db } from "../database/database.connection.js";

export function insertPostDB(body, userId) {
  const { imgPost, bodyPost } = body;
  return db.query(
    `
          INSERT INTO posts ("imgPost","bodyPost","userId", "createdAt") 
              VALUES ($1,$2, $3, NOW());
          `,
    [imgPost, bodyPost, userId]
  );
}

export function insertLikePostDB(params, userId) {
  const { postId } = params;
  return db.query(
    `
        INSERT INTO likes ("likerId","postId","createdAt")
        SELECT $1, $2, NOW() FROM posts 
            WHERE id=$2
        ;
          `,
    [userId, postId]
  );
}

export function deleteLikePostDB(params, userId) {
  const { postId } = params;
  return db.query(
    `
        DELETE FROM likes 
          WHERE "postId" IN 
            (SELECT id FROM posts WHERE id=$2)
          AND "likerId" = $1
        ;
          `,
    [userId, postId]
  );
}
