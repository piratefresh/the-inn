import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountCreateNestedManyWithoutUserInput } from "../inputs/AccountCreateNestedManyWithoutUserInput";
import { CampaignCreateNestedManyWithoutGame_masterInput } from "../inputs/CampaignCreateNestedManyWithoutGame_masterInput";
import { CampaignCreateNestedManyWithoutPlayersInput } from "../inputs/CampaignCreateNestedManyWithoutPlayersInput";
import { ReviewCreateNestedManyWithoutUserInput } from "../inputs/ReviewCreateNestedManyWithoutUserInput";
import { StatusType } from "../../enums/StatusType";

@TypeGraphQL.InputType("UserCreateWithoutSessionsInput", {
  isAbstract: true
})
export class UserCreateWithoutSessionsInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  emailVerified?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  experience!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  twitter?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  facebook?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  discord?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  youtube?: string | undefined;

  @TypeGraphQL.Field(_type => StatusType, {
    nullable: true
  })
  status?: "ONLINE" | "IDLE" | "DND" | "OFFLINE" | undefined;

  @TypeGraphQL.Field(_type => AccountCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  accounts?: AccountCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ReviewCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  reviews?: ReviewCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => CampaignCreateNestedManyWithoutPlayersInput, {
    nullable: true
  })
  Campaign?: CampaignCreateNestedManyWithoutPlayersInput | undefined;

  @TypeGraphQL.Field(_type => CampaignCreateNestedManyWithoutGame_masterInput, {
    nullable: true
  })
  Hosted?: CampaignCreateNestedManyWithoutGame_masterInput | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  campaignId?: string | undefined;
}
