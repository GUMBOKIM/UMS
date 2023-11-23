import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Company } from '../company';
import { Part } from '../part';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
      synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
    }),
    entities: [Company, Part],
  } as TypeOrmModuleOptions;
};
