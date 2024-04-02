/** @format */

import Joi from 'joi';
import { Response, Request, NextFunction } from 'express';

const schema = Joi.object({
  password: Joi.string()
    .min(6)
    //   .max(16)
    .pattern(/(?=(?:.*[a-z]){1,16}).+/, 'lowercase')
    .pattern(/(?=(?:.*[A-Z]){1,16}).+/, 'uppercase')
    .pattern(/(?=(?:.*[0-9]){1,16}).+/, 'number')
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.base':
          case 'string.empty':
          case 'any.required':
          default:
            err.message = 'error';
            break;
          case 'string.min':
            err.message = 'password less than 6';
            break;
          // case 'string.max':
          //   err.message = 'password max 16';
          //   break;
          case 'string.pattern.name':
            switch (err.local.name) {
              case 'lowercase':
                err.message = 'password need at least 1 lowercase';
                break;
              case 'uppercase':
                err.message = 'password need at least 1 uppercase ';
                break;
              case 'number':
                err.message = 'password need at least 1 number';
                break;
            }
            break;
        }
      });

      return errors;
    }),
});

export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;
    await schema.validateAsync({
      password,
    });
    next();
  } catch (error) {
    next(error);
  }
};
