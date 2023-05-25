import { db } from "../database/database.connection.js";

export function getUserProfileByIdDB(params){
    const {id} = params;

    return db.query(`
        SELECT id, username,"imgProfile",bio,"createdAt" 
            FROM users 
            WHERE id=$1
            `
            ,[id]);
}

export function getAllUserProfileDB(params){
    return db.query(`
        SELECT id, username,"imgProfile",bio FROM users
        `);
}