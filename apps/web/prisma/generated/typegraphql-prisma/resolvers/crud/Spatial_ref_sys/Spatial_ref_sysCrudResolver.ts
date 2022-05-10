import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateSpatial_ref_sysArgs } from "./args/AggregateSpatial_ref_sysArgs";
import { CreateManySpatial_ref_sysArgs } from "./args/CreateManySpatial_ref_sysArgs";
import { CreateSpatial_ref_sysArgs } from "./args/CreateSpatial_ref_sysArgs";
import { DeleteManySpatial_ref_sysArgs } from "./args/DeleteManySpatial_ref_sysArgs";
import { DeleteSpatial_ref_sysArgs } from "./args/DeleteSpatial_ref_sysArgs";
import { FindFirstSpatial_ref_sysArgs } from "./args/FindFirstSpatial_ref_sysArgs";
import { FindManySpatial_ref_sysArgs } from "./args/FindManySpatial_ref_sysArgs";
import { FindUniqueSpatial_ref_sysArgs } from "./args/FindUniqueSpatial_ref_sysArgs";
import { GroupBySpatial_ref_sysArgs } from "./args/GroupBySpatial_ref_sysArgs";
import { UpdateManySpatial_ref_sysArgs } from "./args/UpdateManySpatial_ref_sysArgs";
import { UpdateSpatial_ref_sysArgs } from "./args/UpdateSpatial_ref_sysArgs";
import { UpsertSpatial_ref_sysArgs } from "./args/UpsertSpatial_ref_sysArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { Spatial_ref_sys } from "../../../models/Spatial_ref_sys";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateSpatial_ref_sys } from "../../outputs/AggregateSpatial_ref_sys";
import { Spatial_ref_sysGroupBy } from "../../outputs/Spatial_ref_sysGroupBy";

@TypeGraphQL.Resolver(_of => Spatial_ref_sys)
export class Spatial_ref_sysCrudResolver {
  @TypeGraphQL.Query(_returns => Spatial_ref_sys, {
    nullable: true
  })
  async findUniqueSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueSpatial_ref_sysArgs): Promise<Spatial_ref_sys | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Spatial_ref_sys, {
    nullable: true
  })
  async findFirstSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstSpatial_ref_sysArgs): Promise<Spatial_ref_sys | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [Spatial_ref_sys], {
    nullable: false
  })
  async findManySpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManySpatial_ref_sysArgs): Promise<Spatial_ref_sys[]> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Spatial_ref_sys, {
    nullable: false
  })
  async createSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateSpatial_ref_sysArgs): Promise<Spatial_ref_sys> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async createManySpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManySpatial_ref_sysArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Spatial_ref_sys, {
    nullable: true
  })
  async deleteSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteSpatial_ref_sysArgs): Promise<Spatial_ref_sys | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Spatial_ref_sys, {
    nullable: true
  })
  async updateSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateSpatial_ref_sysArgs): Promise<Spatial_ref_sys | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManySpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManySpatial_ref_sysArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManySpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManySpatial_ref_sysArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => AggregateSpatial_ref_sys, {
    nullable: false
  })
  async aggregateSpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateSpatial_ref_sysArgs): Promise<AggregateSpatial_ref_sys> {
    return getPrismaFromContext(ctx).spatial_ref_sys.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Query(_returns => [Spatial_ref_sysGroupBy], {
    nullable: false
  })
  async groupBySpatial_ref_sys(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupBySpatial_ref_sysArgs): Promise<Spatial_ref_sysGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).spatial_ref_sys.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
