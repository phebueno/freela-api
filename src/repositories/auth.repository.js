import { db } from "../database/database.connection.js";

export function newUserDB(body, passwordHash) {
  const { username, email, imgProfile, bio } = body;
  return db.query(
    `INSERT INTO users (username,email,password, "imgProfile", bio, "createdAt")
              VALUES ($1,$2,$3,$4,$5,NOW())
              ON CONFLICT DO NOTHING`,
    [username, email, passwordHash, imgProfile, bio]
  );
}

export function getUserByEmailDB(body) {
    const { email } = body;
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
  }
  
  export function newSessionDB(token,login){
      return db.query(
          `INSERT INTO sessions ("userId",token,"createdAt")
                VALUES ($1,$2,NOW())`,
          [login.rows[0].id, token]
        );
  }

  export function getUserFromSessionTokenDB(token){
    return db.query(
      `SELECT * FROM users 
          WHERE id=
          (SELECT "userId" FROM sessions 
          WHERE token=$1
  )`,[token])
  }

  export function getUserByIdDB(userId){
    return db.query(
      `SELECT * FROM users 
          WHERE id=$1
  `,[userId])
  }
  
  