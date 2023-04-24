import * as Joi from 'joi';

export const emailValidationSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net', 'org'] },
});
