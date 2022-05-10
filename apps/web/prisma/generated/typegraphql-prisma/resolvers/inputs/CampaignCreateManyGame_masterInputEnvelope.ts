import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreateManyGame_masterInput } from "../inputs/CampaignCreateManyGame_masterInput";

@TypeGraphQL.InputType("CampaignCreateManyGame_masterInputEnvelope", {
  isAbstract: true
})
export class CampaignCreateManyGame_masterInputEnvelope {
  @TypeGraphQL.Field(_type => [CampaignCreateManyGame_masterInput], {
    nullable: false
  })
  data!: CampaignCreateManyGame_masterInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
