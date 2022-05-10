import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignScalarWhereInput } from "../inputs/CampaignScalarWhereInput";
import { CampaignUpdateManyMutationInput } from "../inputs/CampaignUpdateManyMutationInput";

@TypeGraphQL.InputType("CampaignUpdateManyWithWhereWithoutPlayersInput", {
  isAbstract: true
})
export class CampaignUpdateManyWithWhereWithoutPlayersInput {
  @TypeGraphQL.Field(_type => CampaignScalarWhereInput, {
    nullable: false
  })
  where!: CampaignScalarWhereInput;

  @TypeGraphQL.Field(_type => CampaignUpdateManyMutationInput, {
    nullable: false
  })
  data!: CampaignUpdateManyMutationInput;
}
