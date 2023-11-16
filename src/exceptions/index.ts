class UnknownException extends Error{

    constructor(){
        super()
        this.name = "UnknownException";
        this.message = JSON.stringify({
            status:{
                code: "ERR_UNKNOWN_ERROR",
                message: "Task returned an unknown error."
            }
        })
    }
}
export {UnknownException}

class InvalidJsonException extends Error{

    constructor(){
        super()
        this.name = "InvalidJsonException";
        this.message = JSON.stringify({
            status:{
                code: "ERR_INVALID_JSON",
                message: "Message sent is not a valid JSON."
            }
        })
    }
}
export {InvalidJsonException}

class InvalidUsecaseException extends Error{

    constructor(){
        super()
        this.name = "InvalidUsecaseException";
        this.message = JSON.stringify({
            status:{
                code: "ERR_INVALID_USECASE",
                message: "Usecase sent invalid. Please check documentation."
            }
        })
    }
}
export {InvalidUsecaseException}

class InvalidFieldsException extends Error{

    constructor(){
        super()
        this.name = "InvalidFieldsException";
        this.message = JSON.stringify({
            status:{
                code: "ERR_INVALID_FIELDS",
                message: "Wrong format or Required Fields are missing."
            }
        })
    }
}
export {InvalidFieldsException}

class InvalidCredentialsException extends Error{

    constructor(){
        super()
        this.name = "InvalidCredentialsException";
        this.message = JSON.stringify({
            status:{
                code: "ERR_INVALID_CREDENTIALS",
                message: "Invalid Credentials."
            }
        })
    }
}
export {InvalidCredentialsException}

class BadTokenException extends Error{

    constructor(){
        super()
        this.name = "BadTokenException";
        this.message = JSON.stringify({
            status:{
                code: "ERR_ACCESS_TOKEN",
                message: "Wrong or Expired Token was given."
            }
        })
    }
}
export {BadTokenException}