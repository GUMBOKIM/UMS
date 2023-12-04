import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { Session } from '../auth/session/session.entity';

export const sessionConfig = async (app: INestApplication<any>) => {
  // TODO: 추후 Redis로 변경
  const sessionRepository = app.get(DataSource).getRepository(Session);
  app.use(
    session({
      name: 'UMS_SESSION_ID',
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  // session repository clear
  await sessionRepository.clear();
};
