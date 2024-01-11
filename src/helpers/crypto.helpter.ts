import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';

// const cryptr: Cryptr = new Cryptr(process.env.CRYPTR_SECRET!);
const cryptr: Cryptr = new Cryptr("123"); //TODO: change this to use the env variable


// @encryption @aes-256-gcm
export const encryptData = <T>(data: T, seconds = 60): string => {
    const time: number = new Date().getTime() + seconds * 1000;
    const str = `${JSON.stringify(data)}|${time}`;
    const encryptedCode: string = cryptr.encrypt(str);
    return encryptedCode;
};

// @hash @salt @blowfish
export const hashWithSalt = (data: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
};

// @hash @salt @blowfish
export const validateSaltedHash = (data: string, hashed: string): boolean => {
    return bcrypt.compareSync(data, hashed);
};


// @encryption @aes-256-gcm
export const decryptData = <T>(encrypted: string): T | null => {
    const decryptedCode: string[] = cryptr.decrypt(encrypted).split('|');
    if (decryptedCode.length < 2) throw new Error('Invalid encrypted code'); //TODO: different way of handling this
    const limitTime: number = Number(decryptedCode[decryptedCode.length - 1]);
    const actualTime: number = new Date().getTime();

    if (actualTime > limitTime) {
        return null;
    }
    // We make an easier out for the most common case
    if (decryptedCode.length == 2)
        return JSON.parse(decryptedCode[0]) as T;
    
    // Now, here is the thing, if the data we encrypted had | in it, then when we split by | we ended up with more than 2 string, so we have to fix this
    let dataString = '';
    for (let i = 0; i < decryptedCode.length - 1; i++) {
        dataString = dataString + decryptedCode[i];
    }
    
    return JSON.parse(dataString) as T;
};