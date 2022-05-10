import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReviewAvgAggregate } from "../outputs/ReviewAvgAggregate";
import { ReviewCountAggregate } from "../outputs/ReviewCountAggregate";
import { ReviewMaxAggregate } from "../outputs/ReviewMaxAggregate";
import { ReviewMinAggregate } from "../outputs/ReviewMinAggregate";
import { ReviewSumAggregate } from "../outputs/ReviewSumAggregate";

@TypeGraphQL.ObjectType("ReviewGroupBy", {
  isAbstract: true
})
export class ReviewGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  rating!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  comment!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  userId!: string;

  @TypeGraphQL.Field(_type => ReviewCountAggregate, {
    nullable: true
  })
  _count!: ReviewCountAggregate | null;

  @TypeGraphQL.Field(_type => ReviewAvgAggregate, {
    nullable: true
  })
  _avg!: ReviewAvgAggregate | null;

  @TypeGraphQL.Field(_type => ReviewSumAggregate, {
    nullable: true
  })
  _sum!: ReviewSumAggregate | null;

  @TypeGraphQL.Field(_type => ReviewMinAggregate, {
    nullable: true
  })
  _min!: ReviewMinAggregate | null;

  @TypeGraphQL.Field(_type => ReviewMaxAggregate, {
    nullable: true
  })
  _max!: ReviewMaxAggregate | null;
}
