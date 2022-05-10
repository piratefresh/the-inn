import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";

@TypeGraphQL.InputType("Spatial_ref_sysScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class Spatial_ref_sysScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [Spatial_ref_sysScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: Spatial_ref_sysScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [Spatial_ref_sysScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: Spatial_ref_sysScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [Spatial_ref_sysScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: Spatial_ref_sysScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  srid?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  auth_name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
    nullable: true
  })
  auth_srid?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  srtext?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  proj4text?: StringNullableWithAggregatesFilter | undefined;
}
