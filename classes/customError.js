class CustomError extends Error{

    constructor(message, statusCode){

        super(message);
        this.statusCode = statusCode;
        this.status = this.statusCode >= 400 && this.statusCode < 500 ? 'Fail' : 'Error';
        this.isOpertinal = true;

        Error.captureStackTrace(this, this.constructor);
        
    }

}

module.exports = CustomError