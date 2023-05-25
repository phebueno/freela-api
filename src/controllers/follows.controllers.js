import { db } from "../database/database.connection.js";

export async function followUser(req,res){
    //AUTH vai dar userId (followerId) por locals
    const followerId = 3;
    const accountId = req.params.userId;
    if(Number(followerId)===Number(accountId)) return res.status(409).send("Você não pode seguir a si mesmo!")
    try {
        const follow = await db.query(
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
        if(!follow.rowCount) return res.status(404).send("Usuário não encontrado!");
        res.statis(201).send("Seguindo o usuário!");
    } catch (err) {
        if(err.constraint='followuniq') return res.status(409).send("Você já segue este usuário!")
        res.status(500).send(err.message)
    }
}

export async function unfollowUser(req,res){
    //AUTH vai dar userId (followerId) por locals
    const followerId = 3;
    const accountId = req.params.userId;
    if(Number(followerId)===Number(accountId)) return res.status(409).send("Você não pode deixar de seguir a si mesmo!")
    try {
        const unfollow = await db.query(
            `
            DELETE FROM follows WHERE "accountId" IN 
                (SELECT id FROM users WHERE id=$2)
                    AND "followerId" = $1
            ;
              `,
            [followerId, accountId]
          );
        if(!unfollow.rowCount) return res.status(404).send("Usuário não encontrado!");
        res.statis(204).send("Deixando de seguir o usuário!");
    } catch (err) {
        res.status(500).send(err.message)
    }
}