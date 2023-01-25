
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { bootstrap } from '@ss/common';

const services: MicroserviceOptions[] = [
  
];

bootstrap(AppModule, 3333, {
    microservices: services,
    socketAdapter: 'default',
    applicationName: 'iskambil-game-server'
})