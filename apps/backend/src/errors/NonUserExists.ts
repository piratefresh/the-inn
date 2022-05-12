import { ObjectType } from "type-graphql";
import { IError } from "./IError";

@ObjectType({ implements: IError })
export class NonExistingUserError implements IError {
  message: string = "user doesn't exist";
}
