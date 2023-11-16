import {Company} from "src/models/Company";
import {CompanyReceipt} from "src/models/CompanyReceipt";

const {
	UnknownException,
} = require('../exceptions')

export default class CompanyReceiptService{

    async submitNewReport(data){
        let company = await Company.findOne({where: {fiscal_number: data.fiscal_number}}).catch(
            e=>console.log(e)
        )
        if(!company)
            company = await Company.create({
                company_name: data.company_name,
                fiscal_number: data.fiscal_number,
                customer_number: data.customer_number,
            })

        for (let i = 0; i < data.receipts.length; i++) {
            data.receipts[i]['company_id'] = company.id
            data.receipts[i]['is_approved'] = false
        }

        let error = false
        await CompanyReceipt.bulkCreate(data.receipts).catch(e=>{
            error = true
            console.log(e)
        })
        if(error)
            throw new UnknownException()
        return true
    }

    async listPendingReceipts(){
        let receiptData =  await CompanyReceipt.findAll({
            where: {is_approved: false},
        }).catch(e=>console.log(e))

        let found = null
        let toReturn = []
        
        for (let i = 0; i < receiptData.length; i++) {
            found = await Company.findOne({where: {id: receiptData[i].company_id}}).catch(e=>console.log(e))
            toReturn.push(
                {
                    id: receiptData[i].id,
                    company_name: found.company_name,
                    fiscal_number: found.fiscal_number,
                    customer_number: found.customer_number,
                    emitted_at: receiptData[i].emitted_at,
                    tax_amount: receiptData[i].tax_amount,
                    tax_percentage: receiptData[i].tax_percentage,
                    is_approved: receiptData[i].is_approved,
                }
            )
        }
        return toReturn
    }
    
    async approveReceipt(receipt_id: string){
        let found =  await CompanyReceipt.findOne({
            where: {id: receipt_id},
        }).catch(e=>console.log(e))
        found.is_approved = true
        found.save()
        return found
    }
}