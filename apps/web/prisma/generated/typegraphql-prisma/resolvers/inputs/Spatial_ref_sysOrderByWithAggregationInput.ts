import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Spatial_ref_sysAvgOrderByAggregateInput } from "../inputs/Spatial_ref_sysAvgOrderByAggregateInput";
import { Spatial_ref_sysCountOrderByAggregateInput } from "../inputs/Spatial_ref_sysCountOrderByAggregateInput";
import { Spatial_ref_sysMaxOrderByAggregateInput } from "../inputs/Spatial_ref_sysMaxOrderByAggregateInput";
import { Spatial_ref_sysMinOrderByAggregateInput } from "../inputs/Spatial_ref_sysMinOrderByAggregateInput";
import { Spatial_ref_sysSumOrderByAggregateInput } from "../inputs/Spatial_ref_sysSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("Spatial_ref_sysOrderByWithAggregationInput", {
  isAbstract: true
})
export class Spatial_ref_sysOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  srid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  auth_name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  auth_srid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  srtext?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  proj4text?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => Spatial_ref_sysCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: Spatial_ref_sysCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Spatial_ref_sysAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: Spatial_ref_sysAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Spatial_ref_sysMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: Spatial_ref_sysMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Spatial_ref_sysMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: Spatial_ref_sysMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Spatial_ref_sysSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: Spatial_ref_sysSumOrderByAggregateInput | undefined;
}
