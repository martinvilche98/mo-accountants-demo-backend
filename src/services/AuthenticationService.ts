import { pbkdf2Sync} from 'node:crypto';
import {User} from "src/models/User";
import {sign as jwtsign} from 'jsonwebtoken';
import {verify as jwtverify} from 'jsonwebtoken'


const {
	InvalidCredentialsException,
    BadTokenException,
} = require('../exceptions')

export default class AuthenticationService{

    /**
     * Authenticates User with username and password.
     * @param data data sent by client, must contain username and password.
     * @returns token, user_id pair of authenticated user.
     */
    async authenticate(data){
        if(!data.email || !data.password)
            throw new InvalidCredentialsException()
        const user = await User.findOne({ where: { email: data.email } })
        if(!user)
            throw new InvalidCredentialsException()
        // PASSWORD COMPARISON -----------------------------------------------------------
        const checkPassword = pbkdf2Sync(data.password, user.salt, parseInt(process.env.PASSWD_ITERATIONS), 64, 'sha256');
        if(checkPassword.toString('hex') != user.password)
            throw new InvalidCredentialsException()
        // -------------------------------------------------------------------------------
        const new_token = jwtsign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "2 days" });
        return new_token
    }

    async verify_token(token){
        let decoded = null
        try{
            decoded = jwtverify(token, process.env.JWT_SECRET);
        }
        catch (e){
            console.log(e);
            throw new BadTokenException()
        }
        if(!decoded)
            throw new BadTokenException()
        const authUser = await User.findOne({ where: { id: decoded.id } })
        return {
            email: authUser.email,
            first_name: authUser.first_name,
            last_name: authUser.last_name,
            group: authUser.group
        }
    }


}