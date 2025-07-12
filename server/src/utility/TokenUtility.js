import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_EXPIRE_TIME, JWT_KEY } = process.env

export const EncodedToken = (email,user_id, role) => {
    let KEY = JWT_KEY
    let EXPIRE  = {expiresIn: JWT_EXPIRE_TIME}
    let PAYLOAD = {
        email : email,
        user_id : user_id,
        role : role
    }
    return  jwt.sign(PAYLOAD, KEY, EXPIRE)
}


export const DecodedToken = (token) => {
    try{
        return jwt.verify(token, JWT_KEY)
    }
    catch(err){
        return null
    }
}