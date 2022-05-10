import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Spatial_ref_sysOrderByWithAggregationInput } from "../../../inputs/Spatial_ref_sysOrderByWithAggregationInput";
import { Spatial_ref_sysScalarWhereWithAggregatesInput } from "../../../inputs/Spatial_ref_sysScalarWhereWithAggregatesInput";
import { Spatial_ref_sysWhereInput } from "../../../inputs/Spatial_ref_sysWhereInput";
import { Spatial_ref_sysScalarFieldEnum } from "../../../../enums/Spatial_ref_sysScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupBySpatial_ref_sysArgs {
  @TypeGraphQL.Field(_type => Spatial_ref_sysWhereInput, {
    nullable: true
  })
  where?: Spatial_ref_sysWhereInput | undefined;

  @TypeGraphQL.Field(_type => [Spatial_ref_sysOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: Spatial_ref_sysOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [Spatial_ref_sysScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"srid" | "auth_name" | "auth_srid" | "srtext" | "proj4text">;

  @TypeGraphQL.Field(_type => Spatial_ref_sysScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: Spatial_ref_sysScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
