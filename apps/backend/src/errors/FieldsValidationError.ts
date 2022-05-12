import { ValidationError } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { IError } from "./IError";

@ObjectType({ implements: IError })
export class FieldsValidationError implements IError {
  @Field((t) => [FieldError])
  fieldErrors: FieldError[];

  message: string;

  constructor(data: FieldsValidationError) {
    Object.assign(this, data);
  }

  static from(validationErrors: ValidationError[]) {
    return new FieldsValidationError({
      fieldErrors: validationErrors.map(FieldError.from),
      message: "some fields are invalid",
    });
  }
}
