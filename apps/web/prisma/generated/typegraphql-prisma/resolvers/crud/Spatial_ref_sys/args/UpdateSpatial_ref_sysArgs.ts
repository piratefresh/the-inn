import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysUpdateInput } from "../../../inputs/Spatial_ref_sysUpdateInput";
import { Spatial_ref_sysWhereUniqueInput } from "../../../inputs/Spatial_ref_sysWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateSpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => Spatial_ref_sysUpdateInput, {
    nullable: false
  })
  data!: Spatial_ref_sysUpdateInput;

  @TypeGraphQL.Field(_type => Spatial_ref_sysWhereUniqueInput, {
    nullable: false
  })
  where!: Spatial_ref_sysWhereUniqueInput;
}
