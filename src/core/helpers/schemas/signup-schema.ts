import * as Yup from 'yup';

import { Messages } from '../error-messages';
import { Expressions } from '../expressions';

export const signupSchema = Yup.object()
  .shape({
    name: Yup.string().required(Messages.required).trim().min(3, Messages.invalidName),
    email: Yup.string()
      .required(Messages.required)
      .trim()
      .matches(Expressions.email, Messages.invalidEmail),
    password: Yup.string()
      .required(Messages.required)
      .trim()
      .matches(Expressions.password, Messages.invalidPassword),
  })
  .required();
