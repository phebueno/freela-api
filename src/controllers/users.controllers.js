import { getAllUsersDB, getUserProfileByIdDB } from "../repositories/users.repository.js";

export async function getUserProfile(req,res){
    try {
        const userData = await getUserProfileByIdDB(req.params);
        res.send(userData.rows[0].json_build_object);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getAllUsers(req,res){
    try {
        const userData = await getAllUsersDB()
        res.send(userData.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}