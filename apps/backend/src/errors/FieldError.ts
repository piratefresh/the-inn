import { ValidationError } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { IError } from "./IError";

@ObjectType({ implements: IError })
export class FieldError implements IError {
  @Field()
  path: string;

  message: string;

  constructor(data: FieldError) {
    Object.assign(this, data);
  }

  static from(validationError: ValidationError) {
    return new FieldError({
      path: validationError.property,
      // @ts-ignore
      message: Object.values(validationError.constraints)[0],
    });
  }
}
