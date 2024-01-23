import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStrongPasswordCustom(
  minLength: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStrongPassword',
      target: object.constructor,
      async: false,
      constraints: [minLength], // ValidationArguments
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [minLength] = args.constraints;
          const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

          if (value.length < minLength) {
            return false;
          }

          if (!reg.test(value)) {
            return false;
          }

          return true;
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return validationArguments.value;
        },
      },
    });
  };
}
