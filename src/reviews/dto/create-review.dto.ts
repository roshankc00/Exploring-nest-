import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message:"Paramroductid cant be empty"})
    @IsNumber({},{message:"productid must be number"})
    productId:number;

    @IsNotEmpty({message:"rating should not be empty"})
    @IsNumber({},{message:"rating should be number"})
    ratings:number
     

    @IsNotEmpty({message:"comment mustnot be empty"})
    @IsString({message:"comment must be string"})
    comment:string;

}
