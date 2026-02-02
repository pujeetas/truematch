import bcrypt from "bcryptjs"
import jwt, { type JwtPayload } from "jsonwebtoken"



export const hashPassword = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async(password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}

export const generateToken = (userId: string): string => {
    return jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: "7d"})
}

export const verifyToken = (token: string): {userId : string} => {
    return jwt.verify(token, process.env.JWT_SECRET!) as {userId:string}
}