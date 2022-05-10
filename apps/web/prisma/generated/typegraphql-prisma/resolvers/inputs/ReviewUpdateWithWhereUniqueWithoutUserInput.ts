import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReviewUpdateWithoutUserInput } from "../inputs/ReviewUpdateWithoutUserInput";
import { ReviewWhereUniqueInput } from "../inputs/ReviewWhereUniqueInput";

@TypeGraphQL.InputType("ReviewUpdateWithWhereUniqueWithoutUserInput", {
  isAbstract: true
})
export class ReviewUpdateWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => ReviewWhereUniqueInput, {
    nullable: false
  })
  where!: ReviewWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReviewUpdateWithoutUserInput, {
    nullable: false
  })
  data!: ReviewUpdateWithoutUserInput;
}
