/** @format */

import Joi from 'joi';
import { Response, Request, NextFunction } from 'express';

const schema = Joi.object({
  email: Joi.string().required().email().message('email not valid'),
  //   repeat_password: Joi.valid(Joi.ref("password")).message(
  //     "password harus sama"
  //   ),
  //   password: Joi.string()
  //     .min(5)
  //     .max(16)
  //     .pattern(/(?=(?:.*[a-z]){1,16}).+/, 'lowercase')
  //     .pattern(/(?=(?:.*[A-Z]){1,16}).+/, 'uppercase')
  //     .pattern(/(?=(?:.*[0-9]){1,16}).+/, 'number')
  //     .pattern(/(?=(?:.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1,16}).+/, 'special')
  //     .required()
  //     .error((errors) => {
  //       errors.forEach((err) => {
  //         switch (err.code) {
  //           case 'string.base':
  //           case 'string.empty':
  //           case 'any.required':
  //           default:
  //             err.message = 'error ';
  //             break;
  //           case 'string.min':
  //             err.message = 'password kurang dari 5';
  //             break;
  //           case 'string.max':
  //             err.message = 'password max 16';
  //             break;
  //           case 'string.pattern.name':
  //             switch (err.local.name) {
  //               case 'lowercase':
  //                 err.message = 'password harus terdapat 1 lowercase';
  //                 break;
  //               case 'uppercase':
  //                 err.message = 'password harus terdapat 1 uppercase ';
  //                 break;
  //               case 'number':
  //                 err.message = 'password wajib ada number 1';
  //                 break;
  //               case 'special':
  //                 err.message = 'password wajib terdapat special karakter';
  //                 break;
  //             }
  //             break;
  //         }
  //       });

  //   return errors;
  // }),
  name: Joi.string().required().min(3).message('min. 3 characters for name'),
  referralNum: Joi.string().allow('', null).optional(),
  //   gender: Joi.string(),
});

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, name, referralNum } = req.body;
    await schema.validateAsync({
      email,
      name,
      referralNum,
    });
    next();
  } catch (error) {
    next(error);
  }
};
