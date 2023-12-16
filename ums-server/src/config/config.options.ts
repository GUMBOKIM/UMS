import { ConfigModuleOptions } from '@nestjs/config';
import * as process from 'process';

export default {
  envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
  isGlobal: true,
} as ConfigModuleOptions;
