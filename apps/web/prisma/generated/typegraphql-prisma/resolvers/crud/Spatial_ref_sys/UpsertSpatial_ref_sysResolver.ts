import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertSpatial_ref_sysArgs } from "./args/UpsertSpatial_ref_sysArgs";
import { Spatial_ref_sys } from "../../../models/Spatial_ref_sys";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Spatial_ref_sys)
export class UpsertSpatial_ref_sysResolver {
  @TypeGraphQL.Mutation(_returns => Spatial_ref_sys, {
    nullable: false
  })
  async upsertSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertSpatial_ref_sysArgs): Promise<Spatial_ref_sys> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
