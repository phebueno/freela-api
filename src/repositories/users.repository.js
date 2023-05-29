import { db } from "../database/database.connection.js";

export function getUserProfileByIdDB(params){
    const {id} = params;
//VOCÊ ESTÁ AQUI

return db.query(`SELECT json_build_object(
  'id', u.id,
  'username', u.username,
  'imgProfile', u."imgProfile",
	'bio', u.bio,
    'createdAt', u."createdAt",
  'posts', COALESCE((SELECT json_agg(row_to_json("posts")) FROM
    (SELECT p.*, COALESCE(COUNT(l."postId"), 0) AS "likesCount"
     FROM posts p
     LEFT JOIN likes l ON p.id = l."postId"
     WHERE p."userId" = $1
     GROUP BY p.id
     ORDER BY p."createdAt" DESC) "posts"), '[]'::json)
)
FROM users u
WHERE u.id = $1;	`,[id])
}

export function getAllUsersDB(){
    return db.query(`
        SELECT id, username,"imgProfile",bio FROM users
        `);
}