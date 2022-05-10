import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysCreateManyInput } from "../../../inputs/Spatial_ref_sysCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManySpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => [Spatial_ref_sysCreateManyInput], {
    nullable: false
  })
  data!: Spatial_ref_sysCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
