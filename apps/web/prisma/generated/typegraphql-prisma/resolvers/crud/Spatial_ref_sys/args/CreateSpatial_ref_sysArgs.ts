import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysCreateInput } from "../../../inputs/Spatial_ref_sysCreateInput";

@TypeGraphQL.ArgsType()
export class CreateSpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => Spatial_ref_sysCreateInput, {
    nullable: false
  })
  data!: Spatial_ref_sysCreateInput;
}
