import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import AuthenticationService from 'src/services/AuthenticationService';
import { AuthValidation } from 'src/validators/AuthenticationValidators';

@Controller('auth')
export default class AuthenticationController {
    
    constructor(private authenticationService: AuthenticationService) {}

    @Post('token')
    async request_token(@Body() body: AuthValidation, @Res() res: Response): Promise<Response> {
        let tokenJWT = null
        try{
            tokenJWT = await this.authenticationService.authenticate(body)
        }
        catch(e){
            console.log(e);
            return res.status(400).send(e.message)
        }
        return res.status(200).send({
            access: tokenJWT
        })
    }

}
