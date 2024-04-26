import * as yup from 'yup';
import ServerError from '.';

export const validateData = async (
  data: any,
  schema: yup.AnySchema,
): Promise<void> => {
  try {
    await schema.validate(data, { abortEarly: true });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new ServerError(error.message, 400);
    }
    throw new ServerError('Internal server error', 500);
  }
};
