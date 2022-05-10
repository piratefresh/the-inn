import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysOrderByWithRelationInput } from "../../../inputs/Spatial_ref_sysOrderByWithRelationInput";
import { Spatial_ref_sysWhereInput } from "../../../inputs/Spatial_ref_sysWhereInput";
import { Spatial_ref_sysWhereUniqueInput } from "../../../inputs/Spatial_ref_sysWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateSpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => Spatial_ref_sysWhereInput, {
    nullable: true
  })
  where?: Spatial_ref_sysWhereInput | undefined;

  @TypeGraphQL.Field(_type => [Spatial_ref_sysOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: Spatial_ref_sysOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => Spatial_ref_sysWhereUniqueInput, {
    nullable: true
  })
  cursor?: Spatial_ref_sysWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
