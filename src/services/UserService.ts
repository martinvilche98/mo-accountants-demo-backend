import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { User } from 'src/models/User';

const {
	BadTokenException,
} = require('../exceptions')

export default class UserService{

    async createNew(data){
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = pbkdf2Sync(data.password, salt, parseInt(process.env.PASSWD_ITERATIONS), 64, 'sha256');
        
        const NewUser = await User.create({
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashedPassword.toString('hex'),
            salt: salt,
        }).catch(e=>{
            console.log(e);
        });

        return NewUser
    }
}