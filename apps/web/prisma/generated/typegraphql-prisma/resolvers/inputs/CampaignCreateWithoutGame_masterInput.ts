import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CampaignCreatedaysInput } from "../inputs/CampaignCreatedaysInput";
import { CampaignCreatetagsInput } from "../inputs/CampaignCreatetagsInput";
import { CampaignCreatetime_periodsInput } from "../inputs/CampaignCreatetime_periodsInput";
import { UserCreateNestedManyWithoutCampaignInput } from "../inputs/UserCreateNestedManyWithoutCampaignInput";
import { Difficulty } from "../../enums/Difficulty";
import { Experiance } from "../../enums/Experiance";

@TypeGraphQL.InputType("CampaignCreateWithoutGame_masterInput", {
  isAbstract: true
})
export class CampaignCreateWithoutGame_masterInput {
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
    nullable: false
  })
  summary!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  additional_details?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  image!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isOnline!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  city!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  state!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  lat!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  lng!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  geolocation_lat?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  geolocation_lng?: number | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startDate!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  endDate!: Date;

  @TypeGraphQL.Field(_type => CampaignCreatedaysInput, {
    nullable: true
  })
  days?: CampaignCreatedaysInput | undefined;

  @TypeGraphQL.Field(_type => CampaignCreatetime_periodsInput, {
    nullable: true
  })
  time_periods?: CampaignCreatetime_periodsInput | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  game_system!: string;

  @TypeGraphQL.Field(_type => Experiance, {
    nullable: true
  })
  experiance?: "Beginner" | "Advanced" | "All" | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  voip_system?: string | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  max_seats!: number;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  puzzles?: "Low" | "Medium" | "High" | "Any" | undefined;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  combat?: "Low" | "Medium" | "High" | "Any" | undefined;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  roleplay?: "Low" | "Medium" | "High" | "Any" | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedManyWithoutCampaignInput, {
    nullable: true
  })
  players?: UserCreateNestedManyWithoutCampaignInput | undefined;

  @TypeGraphQL.Field(_type => CampaignCreatetagsInput, {
    nullable: true
  })
  tags?: CampaignCreatetagsInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  price?: number | undefined;
}
