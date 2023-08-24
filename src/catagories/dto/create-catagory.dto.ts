import { IsNotEmpty,IsString, MinLength } from "class-validator";
export class CreateCatagoryDto {
    @IsNotEmpty({message:"emailcannot be null"})
    @IsString({message:"title must be string"})
    title:string;

    @IsNotEmpty({message:"emailcannot be null"})
    @IsString({message:"desciption must be string"})
    @MinLength(5,{message:"password must be atleast must be atleast 5"})
    description:string;

}
