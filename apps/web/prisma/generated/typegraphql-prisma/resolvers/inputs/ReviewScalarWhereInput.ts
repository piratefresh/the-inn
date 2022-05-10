import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ReviewScalarWhereInput", {
  isAbstract: true
})
export class ReviewScalarWhereInput {
  @TypeGraphQL.Field(_type => [ReviewScalarWhereInput], {
    nullable: true
  })
  AND?: ReviewScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReviewScalarWhereInput], {
    nullable: true
  })
  OR?: ReviewScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReviewScalarWhereInput], {
    nullable: true
  })
  NOT?: ReviewScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  rating?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  comment?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  userId?: StringFilter | undefined;
}
