import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { CampaignUpdatedaysInput } from "../inputs/CampaignUpdatedaysInput";
import { CampaignUpdatetagsInput } from "../inputs/CampaignUpdatetagsInput";
import { CampaignUpdatetime_periodsInput } from "../inputs/CampaignUpdatetime_periodsInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumDifficultyFieldUpdateOperationsInput } from "../inputs/EnumDifficultyFieldUpdateOperationsInput";
import { EnumExperianceFieldUpdateOperationsInput } from "../inputs/EnumExperianceFieldUpdateOperationsInput";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";
import { NullableFloatFieldUpdateOperationsInput } from "../inputs/NullableFloatFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("CampaignUpdateManyMutationInput", {
  isAbstract: true
})
export class CampaignUpdateManyMutationInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  summary?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  additional_details?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  note?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  image?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => BoolFieldUpdateOperationsInput, {
    nullable: true
  })
  isOnline?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  city?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  state?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => FloatFieldUpdateOperationsInput, {
    nullable: true
  })
  lat?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => FloatFieldUpdateOperationsInput, {
    nullable: true
  })
  lng?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableFloatFieldUpdateOperationsInput, {
    nullable: true
  })
  geolocation_lat?: NullableFloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableFloatFieldUpdateOperationsInput, {
    nullable: true
  })
  geolocation_lng?: NullableFloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  startDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  endDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => CampaignUpdatedaysInput, {
    nullable: true
  })
  days?: CampaignUpdatedaysInput | undefined;

  @TypeGraphQL.Field(_type => CampaignUpdatetime_periodsInput, {
    nullable: true
  })
  time_periods?: CampaignUpdatetime_periodsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  game_system?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumExperianceFieldUpdateOperationsInput, {
    nullable: true
  })
  experiance?: EnumExperianceFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  voip_system?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => IntFieldUpdateOperationsInput, {
    nullable: true
  })
  max_seats?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyFieldUpdateOperationsInput, {
    nullable: true
  })
  puzzles?: EnumDifficultyFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyFieldUpdateOperationsInput, {
    nullable: true
  })
  combat?: EnumDifficultyFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumDifficultyFieldUpdateOperationsInput, {
    nullable: true
  })
  roleplay?: EnumDifficultyFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => CampaignUpdatetagsInput, {
    nullable: true
  })
  tags?: CampaignUpdatetagsInput | undefined;

  @TypeGraphQL.Field(_type => NullableFloatFieldUpdateOperationsInput, {
    nullable: true
  })
  price?: NullableFloatFieldUpdateOperationsInput | undefined;
}
