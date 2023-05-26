import { getUserFromSessionTokenDB } from "../repositories/auth.repository.js";

export async function validateAuth(req,res,next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    const session = await getUserFromSessionTokenDB(token);
    if(!session.rowCount) return res.sendStatus(401);
    res.locals = {user:session.rows[0]};
    next();
}