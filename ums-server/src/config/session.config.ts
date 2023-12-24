import { Session } from '@auth/session/session.entity';
import { INestApplication } from '@nestjs/common';
import { TypeormStore } from 'connect-typeorm';
import session from 'express-session';
import { DataSource } from 'typeorm';

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
