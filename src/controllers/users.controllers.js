import { db } from "../database/database.connection.js";

export async function getUserProfile(req,res){
    const {id} = req.params;
    try {
        const userData = await db.query('SELECT username,"imgProfile",bio,"createdAt" FROM users WHERE id=$1',[id]);
        //JUNTAR AOS POSTS!
        res.send(userData.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getAllUsers(req,res){
    try {
        const userData = await db.query('SELECT username,"imgProfile",bio FROM users');
        res.send(userData.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}