import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { calculationSchema, Calculator } from './schemas/calculation.schema';
import { ProductsModule } from './products/products.module';
import { Product, productSchema } from './products/entities/product.entity';
const uri =
  'mongodb+srv://vanayfefilov777:P27qqg60oh@cluster0.nddnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([
      { name: Calculator.name, schema: calculationSchema },
      { name: Product.name, schema: productSchema },
    ]),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
