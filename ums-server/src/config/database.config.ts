import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Company } from '../entity/company';
import { Part } from '../entity/part';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Member } from '../entity/member';
import { Stock } from '../entity/stock';
import ForwardEntities from '../entity/forward';
import ReceiveEntities from '../entity/receive';

export default () => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
    }),
    entities: [
      Company,
      Part,
      Member,
      Stock,
      ...ForwardEntities,
      ...ReceiveEntities,
    ],
    synchronize: true,
  } as TypeOrmModuleOptions;
};
