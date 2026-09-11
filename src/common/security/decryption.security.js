export const decryption = async (cipherText) => {
    const [ivHex, encryptedDataHex] = cipherText.split('::');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, iv);
    let decrypted = decipher.update(encryptedDataHex, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};