import { getAllUserProfileDB, getUserProfileByIdDB } from "../repositories/users.repository.js";

export async function getUserProfile(req,res){
    try {
        const userData = await getUserProfileByIdDB(req.params);
        //JUNTAR AOS POSTS!
        res.send(userData.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getAllUsers(req,res){
    try {
        const userData = await getAllUserProfileDB()
        res.send(userData.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}