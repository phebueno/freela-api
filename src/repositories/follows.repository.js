import { db } from "../database/database.connection.js";

export function insertFollowDB(followerId,accountId){
    return db.query(
        `
              INSERT INTO follows ("followerId", "accountId", "createdAt")
                  SELECT u1.id, u2.id, NOW()
                  FROM users u1, users u2
                      WHERE u1.id <> u2.id
                          AND u1.id=$1
                          AND u2.id=$2;
              ;
                `,
        [followerId, accountId]
      );
}

export function deleteFollowDB(followerId,accountId){
    return db.query(
        `
              DELETE FROM follows WHERE "accountId" IN 
                  (SELECT id FROM users WHERE id=$2)
                      AND "followerId" = $1
              ;
                `,
        [followerId, accountId]
      );
}

export function getFollowersByIdDB(params){
    const accountId = params.userId;
    return db.query(
        `
          SELECT "followerId" AS id, users.username, users."imgProfile", users.bio 
              FROM follows
                  JOIN users ON follows."followerId"=users.id
              WHERE "accountId"=$1`,
        [accountId]
      );
}

export function getFollowsByIdDB(params){
    const accountId = params.userId;
    return db.query(
        `
        SELECT "accountId" AS id, users.username, users."imgProfile", users.bio 
            FROM follows
                JOIN users ON follows."accountId"=users.id
                WHERE "followerId"=$1`,
        [accountId]
      );
}