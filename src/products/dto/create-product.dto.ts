import { IsArray, IsNotEmpty,IsNumber,IsPositive,IsString, Min, MinLength } from "class-validator";

    export class CreateProductDto {
    @IsNotEmpty({message:"email cannot be null"})
    @IsString({message:"title must be string"})
    title:string;

    @IsNotEmpty({message:"description cannot be null"})
    @IsString({message:"desciption must be string"})
    @MinLength(5,{message:"password must be atleast must be atleast 5"})
    description:string;
    
    
    @IsNotEmpty({message:"price cannot be null"})
    @IsPositive({message:"price must be positive"})
    @IsNumber({maxDecimalPlaces:2},{message:"price must be number & maximum decimal precision is 2 "})  
    @Min(0,{message:"price must be positive"})
    price:number
    
    
    @IsNotEmpty({message:"stock cannot be null"})
    @IsNumber({maxDecimalPlaces:2},{message:"stock must be number & maximum decimal precision is 2 "})  
    @IsPositive({message:"stock must be positive"})
    @Min(0,{message:"stock must be positive"})
    stock:number
    
    @IsNotEmpty({message:"images cannot be null"})
    @IsArray({message:"images must be array"})
    images:string[]    
    
    
    
    @IsNumber({},{message:"category must be number "})  
    @IsNotEmpty({message:"images cannot be null"})
    @IsNumber({},{message:"category must be number"})  
    categoryId:number












}
