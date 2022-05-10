import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysWhereInput } from "../../../inputs/Spatial_ref_sysWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManySpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => Spatial_ref_sysWhereInput, {
    nullable: true
  })
  where?: Spatial_ref_sysWhereInput | undefined;
}
