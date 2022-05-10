import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateSpatial_ref_sysArgs } from "./args/AggregateSpatial_ref_sysArgs";
import { Spatial_ref_sys } from "../../../models/Spatial_ref_sys";
import { AggregateSpatial_ref_sys } from "../../outputs/AggregateSpatial_ref_sys";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Spatial_ref_sys)
export class AggregateSpatial_ref_sysResolver {
  @TypeGraphQL.Query(_returns => AggregateSpatial_ref_sys, {
    nullable: false
  })
  async aggregateSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateSpatial_ref_sysArgs): Promise<AggregateSpatial_ref_sys> {
    return getPrismaFromContext(ctx).spatial_ref_sys.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
