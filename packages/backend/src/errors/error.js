class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = 'No found error';
    }
}

export { NotFoundError };