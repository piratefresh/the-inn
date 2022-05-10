import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysUpdateManyMutationInput } from "../../../inputs/Spatial_ref_sysUpdateManyMutationInput";
import { Spatial_ref_sysWhereInput } from "../../../inputs/Spatial_ref_sysWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManySpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => Spatial_ref_sysUpdateManyMutationInput, {
    nullable: false
  })
  data!: Spatial_ref_sysUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => Spatial_ref_sysWhereInput, {
    nullable: true
  })
  where?: Spatial_ref_sysWhereInput | undefined;
}
