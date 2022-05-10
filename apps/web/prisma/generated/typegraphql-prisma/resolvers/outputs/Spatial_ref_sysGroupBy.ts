import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Spatial_ref_sysAvgAggregate } from "../outputs/Spatial_ref_sysAvgAggregate";
import { Spatial_ref_sysCountAggregate } from "../outputs/Spatial_ref_sysCountAggregate";
import { Spatial_ref_sysMaxAggregate } from "../outputs/Spatial_ref_sysMaxAggregate";
import { Spatial_ref_sysMinAggregate } from "../outputs/Spatial_ref_sysMinAggregate";
import { Spatial_ref_sysSumAggregate } from "../outputs/Spatial_ref_sysSumAggregate";

@TypeGraphQL.ObjectType("Spatial_ref_sysGroupBy", {
  isAbstract: true
})
export class Spatial_ref_sysGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  srid!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  auth_name!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  auth_srid!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  srtext!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  proj4text!: string | null;

  @TypeGraphQL.Field(_type => Spatial_ref_sysCountAggregate, {
    nullable: true
  })
  _count!: Spatial_ref_sysCountAggregate | null;

  @TypeGraphQL.Field(_type => Spatial_ref_sysAvgAggregate, {
    nullable: true
  })
  _avg!: Spatial_ref_sysAvgAggregate | null;

  @TypeGraphQL.Field(_type => Spatial_ref_sysSumAggregate, {
    nullable: true
  })
  _sum!: Spatial_ref_sysSumAggregate | null;

  @TypeGraphQL.Field(_type => Spatial_ref_sysMinAggregate, {
    nullable: true
  })
  _min!: Spatial_ref_sysMinAggregate | null;

  @TypeGraphQL.Field(_type => Spatial_ref_sysMaxAggregate, {
    nullable: true
  })
  _max!: Spatial_ref_sysMaxAggregate | null;
}
