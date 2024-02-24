import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';

export default class CryptoHelper {
    private static instance: CryptoHelper;

    public static getInstance(): CryptoHelper {
        if (!CryptoHelper.instance) {
            CryptoHelper.instance = new CryptoHelper();
        }
        return CryptoHelper.instance;
    }

    // const cryptr: Cryptr = new Cryptr(process.env.CRYPTR_SECRET!);
    private cryptr: Cryptr = new Cryptr("123"); //TODO: change this to use the env variable


    // @hash @salt @blowfish
    public hashWithSalt = (data: string): string => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(data, salt);
    };

    // @hash @salt @blowfish
    public validateSaltedHash = (data: string, hashed: string): boolean => {
        return bcrypt.compareSync(data, hashed);
    };

}