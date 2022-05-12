import { ObjectType } from "type-graphql";
import { IError } from "./IError";

@ObjectType({ implements: IError })
export class BadCredentialsError implements IError {
  message: string = "invalid email or password";
}
