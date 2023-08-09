import { registerAs } from '@nestjs/config';
import * as joi from 'joi';

export enum Environment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

interface IAppConfig {
  NODE_ENV: Environment;
  HOST: string;
  PORT: number;
}

export const AppConfig = registerAs<IAppConfig>('app', () => {
  const values = {
    NODE_ENV: process.env.NODE_ENV as Environment,
    HOST: process.env.HOST,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  };

  const schema = joi.object({
    NODE_ENV: joi
      .string()
      .required()
      .valid(...Object.values(Environment)),
    HOST: joi.string().required(),
    PORT: joi.number().required(),
  });

  const { error } = schema.validate(values);

  if (error) {
    throw new Error(
      `Validtion Error - App Configuration is missing environment variables? ${error}`,
    );
  }

  return values;
});
