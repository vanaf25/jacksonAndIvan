import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    price: number;
}
export const productSchema = SchemaFactory.createForClass(Product);
