import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("Spatial_ref_sysCreateInput", {
  isAbstract: true
})
export class Spatial_ref_sysCreateInput {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  srid!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  auth_name?: string | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  auth_srid?: number | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  srtext?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  proj4text?: string | undefined;
}
