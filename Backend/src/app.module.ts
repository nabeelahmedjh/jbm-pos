import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorsModule } from './vendors/vendors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { LedgersModule } from './ledgers/ledgers.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRootAsync({
    imports: [],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
  }),
   VendorsModule,
   PaymentsModule,
   OrdersModule,
   LedgersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
