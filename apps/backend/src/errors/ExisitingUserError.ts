import { ObjectType } from "type-graphql";
import { IError } from "./IError";

@ObjectType({ implements: IError })
export class ExistingUserError implements IError {
  message: string = "user already exists";
}
