// Load .env variables.
import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'
configDotenv({path: resolve(__dirname, "../.env")})

import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { User } from '../src/models/User';



async function init(){
    
    if(process.argv.length < 4){
      console.error("Params required: <email> <password>");
      process.exit()
    }
  
    const email = process.argv[2]
    const password = process.argv[3]
    
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(password, salt, parseInt(process.env.PASSWD_ITERATIONS), 64, 'sha256');
    const NewUser = await User.create({
        email: email,
        first_name: 'System',
        last_name: 'Administrator',
        password: hashedPassword.toString('hex'),
        salt: salt,
        group: 'admin'
    }).then(e=>{
        console.log(`[OK] - ADMIN USER ${email} created successfully.`);
        process.exit()
    }).catch(e=>{
        console.log(e);
        process.exit()
    });
}

init()