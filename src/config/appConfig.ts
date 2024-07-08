import dotenv from 'dotenv';
import Joi from 'joi';
import { DatabaseConfig } from './interfaces/databaseConfig';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

class AppConfig {
  private schema: Joi.ObjectSchema;
  private env: { [key: string]: unknown };

  constructor() {
    this.schema = Joi.object({
      PORT: Joi.number().default(3001),
      LOG_LEVEL: Joi.string().valid('info', 'warn', 'error', 'debug').default('info'),
      DATABASE_HOST: Joi.string().default('localhost'),
      DATABASE_PORT: Joi.number().default(5432),
      DATABASE_USERNAME: Joi.string().required().default('postgres'),
      DATABASE_PASSWORD: Joi.string().required().default('postgres'),
      DATABASE_NAME: Joi.string().required().default('parking_db'),
    });

    const { error, value: envVars } = this.schema.validate(process.env, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.env = envVars;
  }

  public getDatabaseConfig(): DatabaseConfig {
    return {
      host: this.env.DATABASE_HOST as string,
      port: this.env.DATABASE_PORT as number,
      username: this.env.DATABASE_USERNAME as string,
      password: this.env.DATABASE_PASSWORD as string,
      database: this.env.DATABASE_NAME as string,
    };
  }

  public getServerPort(): number {
    return this.env.PORT as number;
  }

  public getLogLevel(): string {
    return this.env.LOG_LEVEL as string;
  }
}

export default new AppConfig();
