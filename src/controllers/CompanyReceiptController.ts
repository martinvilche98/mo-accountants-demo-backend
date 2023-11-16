import { Headers, Controller, Post, Get, Body, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import AuthenticationService from 'src/services/AuthenticationService';
import CompanyReceiptService from 'src/services/CompanyReceiptService';
import { SubmitCompanyReceiptValidator } from 'src/validators/CompanyReceiptValidators';


@Controller('receipts')
export default class CompanyReceiptController {
    
    constructor(
        private authenticationService: AuthenticationService,
        private companyReceiptService: CompanyReceiptService,
    ) {}

    @Post('submit')
    async submit_new_company_report(@Body() body: SubmitCompanyReceiptValidator, @Headers() headers, @Res() res: Response): Promise<Response> {
        const authorizedUser = await this.authenticationService.verify_token(headers['authorization'])
        let newReport = null
        try{
            newReport = this.companyReceiptService.submitNewReport(body)
        }
        catch(e){
            console.log(e);
            return res.status(400).send(e.message)
        }
        return res.status(200).send({
            status: "ok",
        })
    }

    @Get('pending')
    async retrieve_reports(@Headers() headers, @Res() res: Response): Promise<Response> {
        const authorizedUser = await this.authenticationService.verify_token(headers['authorization'])
        let pendingReceipts = null
        try{
            pendingReceipts = await this.companyReceiptService.listPendingReceipts()
        }
        
        catch(e){
            console.log(e);
            return res.status(400).send(e.message)
        }
    
        return res.status(200).send({
            status: "ok",
            receipts: pendingReceipts
        })
    }

    @Post('approve/:id')
    async approve_receipt(@Headers() headers, @Param('id') id, @Res() res: Response): Promise<Response> {
        const authorizedUser = await this.authenticationService.verify_token(headers['authorization'])
        let approvedReceipt = null
        try{
            approvedReceipt = await this.companyReceiptService.approveReceipt(id)
        }
        catch(e){
            console.log(e);
            return res.status(400).send(e.message)
        }
        return res.status(200).send({
            status: "ok",
            receipts: approvedReceipt
        })
    }

}
