import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  EXPIRES_IN: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    EXPIRES_IN: joi.string().default('120s')
  })
  .unknown(true);

const validationResult = envsSchema.validate(process.env);

if (validationResult.error) {
  throw new Error(`Config validation error: ${validationResult.error.message}`);
}

const envVars: EnvVars = validationResult.value;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  expiresIn: envVars.EXPIRES_IN
};
