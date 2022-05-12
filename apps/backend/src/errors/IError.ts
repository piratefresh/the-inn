import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export class IError {
  @Field()
  message: string;
}
