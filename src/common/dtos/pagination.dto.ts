import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
    @IsPositive()
    @IsNumber()
    @IsOptional()
    @Min(1)
    limit?: number;
    
    @IsPositive()
    @IsNumber()
    @IsOptional()
    offset?: number;
}