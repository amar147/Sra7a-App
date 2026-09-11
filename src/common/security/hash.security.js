import bcrypt from 'bcrypt'

export const hash = async(plaintext ,round=12)=>{
    return await bcrypt.hash(plaintext,round)
}
export const compare = async(plaintext ,ciphertext)=>{
    return await bcrypt.compare(plaintext,ciphertext)
}