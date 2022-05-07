import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class VerificationToken {
  @Field()
  identifier: string;

  @Field()
  token: string;

  @Field()
  expires: Date;
}
