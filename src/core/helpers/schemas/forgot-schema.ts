import * as Yup from 'yup';

import { Messages } from '../error-messages';
import { Expressions } from '../expressions';

export const forgotPasswordSchema = Yup.object()
  .shape({
    email: Yup.string()
      .required(Messages.required)
      .trim()
      .matches(Expressions.email, Messages.invalidEmail),
  })
  .required();
