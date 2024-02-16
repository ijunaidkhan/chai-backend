class ApiError extends Error {
    constructor(
        message = "something went wrong", 
        statusCode = 500, 
        errors = [], 
        stack = ""
        ){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indicates whether it's a trusted error
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }