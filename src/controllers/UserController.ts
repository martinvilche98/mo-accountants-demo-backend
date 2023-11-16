import { Headers, Controller, Post, Get, Body, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import UserService from 'src/services/UserService';
import AuthenticationService from 'src/services/AuthenticationService';
import { CreateUserValidator } from 'src/validators/UserValidators';

@Controller('users')
export default class UserController {
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {}

    @Post()
    create_new_user(@Body() body: CreateUserValidator, @Res() res: Response): Response {
        this.userService.createNew(body)
        return res.send("OK")
    }

    @Get('me')
    async retrieve_logged_user_data(@Headers() headers, @Res() res: Response): Promise<Response> {
        let authorizedUser = null
        try{
            authorizedUser = await this.authenticationService.verify_token(headers['authorization'])
        }
        catch(e){
            console.log(e);
            return res.status(400).send(e.message)
        }
        return res.status(200).send({
            user: authorizedUser
        })
    }

}
