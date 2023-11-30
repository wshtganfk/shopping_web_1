interface BackendResponse{
    success: boolean;
    message: string;
    data: object;
    token: string;
}
interface UserLogin{
    username:string;
    password:string;
}
interface UserRegiser{
    username:string;
    email:string;
    password:string;
    
}

interface InputOrder{
    productId:BigInt;
    quantity:number;
}

interface InputWatchList{
    productId:BigInt;
}

interface InputProduct{
    name:string;
    description:string;
    wholesale_price:number;
    retail_price:number;
    quantity:number;
}