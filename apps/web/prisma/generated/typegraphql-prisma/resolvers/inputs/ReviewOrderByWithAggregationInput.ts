import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReviewAvgOrderByAggregateInput } from "../inputs/ReviewAvgOrderByAggregateInput";
import { ReviewCountOrderByAggregateInput } from "../inputs/ReviewCountOrderByAggregateInput";
import { ReviewMaxOrderByAggregateInput } from "../inputs/ReviewMaxOrderByAggregateInput";
import { ReviewMinOrderByAggregateInput } from "../inputs/ReviewMinOrderByAggregateInput";
import { ReviewSumOrderByAggregateInput } from "../inputs/ReviewSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ReviewOrderByWithAggregationInput", {
  isAbstract: true
})
export class ReviewOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  rating?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  comment?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  userId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ReviewCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ReviewCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReviewAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: ReviewAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReviewMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ReviewMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReviewMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ReviewMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReviewSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: ReviewSumOrderByAggregateInput | undefined;
}
