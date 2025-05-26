import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';


export class CreateOrderDto {
    
    @IsString()
    @IsNotEmpty()
    vendor: string;
    
    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    // @IsOptional()
    // @IsNumber()
    // @Transform(({ obj }) => {
    //     // obj refers to the entire CreateOrderDto instance
    //     // Ensure unitPrice and quantity are numbers before calculation
    //     const unitPrice = parseFloat(obj.unitPrice);
    //     const quantity = parseFloat(obj.quantity);

    //     if (isNaN(unitPrice) || isNaN(quantity)) {
    //     throw new Error('unitPrice or quantity is not a valid number');
    //     }
    //     return unitPrice * quantity;
    // })
    // totalPrice: number;

    // for datetime
    @IsDateString()
    orderDateTime: Date; 
}
