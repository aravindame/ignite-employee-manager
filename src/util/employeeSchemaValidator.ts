import Joi, { Schema, ValidationResult } from 'joi';

/**
 * Validates data against a predefined schema.
 *
 * @author Aravinda Meewalaarachchi
 * @returns {function} A function that takes in data and returns a Joi validation result.
 */

export function schemaValidator() {
  const schema: Schema = Joi.object({
    first_name: Joi.string()
      .required()
      .label('First name is required.')
      .regex(/^[a-zA-Z\s]+$/)
      .label('Only allow alphabets.')
      .min(6)
      .label('Minimum length should be 6 for first name.')
      .max(10)
      .label('Maximum length should be 10 for first name.'),
    last_name: Joi.string()
      .required()
      .label('Last Name is required.')
      .regex(/^[a-zA-Z\s]+$/)
      .label('Only allow alphabets for Last Name.')
      .min(6)
      .label('Minimum length should be 6 for last name.')
      .max(10)
      .label('Maximum length should be 10 for last name.'),
    email: Joi.string().required().email().label('Please enter valid email.'),
    number: Joi.string()
      .required()
      .regex(/^(?:[+0]9)?\d{10}$/)
      .label('Phone number is in invalid format or length is less than 10.'),
    gender: Joi.string().valid('M', 'F').required().label('Values should be "M" or "F".'),
    photo: Joi.string().min(0).optional().label('Photo field is required.'),
  });

  return function (data: any): ValidationResult {
    return schema.validate(data);
  };
}
