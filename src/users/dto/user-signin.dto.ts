import { IsNotEmpty,IsEmail, MinLength } from "class-validator";

export class UserSigninDto{    
    @IsNotEmpty({message:"emailcannot be null"})
    @IsEmail({},{message:"enter the valid email"})
    email:string;

    @IsNotEmpty({message:"emailcannot be null"})
    @MinLength(5,{message:"password must be atleast must be atleast 5"})
    password:string;
}