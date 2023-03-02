import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommonModule, SSConfig } from '@ss/common';
import { DatabasesCollections, DataModule, DbConnectionOptions } from '@ss/data';
import { Schema } from 'mongoose'
import { StorageModule } from "@ss/storage"
import { AuthModule } from '@ss/auth';
import { GrantRule, RulesModule } from "@ss/rules"
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from '@ss/api';



const conf = new SSConfig('bus');
// conf.broker = { transport: Transport.REDIS, options: { host: `${process.env.REDIS_HOST ?? 'localhost'}`, port: tryParseInt(process.env.REDIS_PORT, 6379) } };
const dbConnectionOptions = new DbConnectionOptions()
dbConnectionOptions.prefix = 'wat_'
const collections: DatabasesCollections = {

    'DB_DEFAULT': {
        collections: {
            'settings': { schema: new Schema({ _id: String }, { strict: false }) },
            'camp': { schema: new Schema({ _id: String }, { strict: false }) },
            'department': { schema: new Schema({ _id: String }, { strict: false }) },
            'contentitems': { schema: new Schema({ _id: String }, { strict: false }) },
        },
        dbConnectionOptions

    }
}

@Module({
    imports: [
        CommonModule.register(conf,),
        DataModule.register(collections),
        RulesModule.register(GrantRule,[{ name:'api',path:'/api',fallbackAuthorization:'grant'}]),
        AuthModule.register({ secret: "iskambilsecretlolhhh" }),
        ScheduleModule.forRoot(),
        StorageModule,
        ApiModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
