import * as Yup from 'yup';

import { Messages } from '../error-messages';
import { Expressions } from '../expressions';

export const signinSchema = Yup.object()
  .shape({
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
