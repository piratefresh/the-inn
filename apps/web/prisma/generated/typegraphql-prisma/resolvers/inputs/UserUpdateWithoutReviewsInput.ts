import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountUpdateManyWithoutUserInput } from "../inputs/AccountUpdateManyWithoutUserInput";
import { CampaignUpdateManyWithoutGame_masterInput } from "../inputs/CampaignUpdateManyWithoutGame_masterInput";
import { CampaignUpdateManyWithoutPlayersInput } from "../inputs/CampaignUpdateManyWithoutPlayersInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumStatusTypeFieldUpdateOperationsInput } from "../inputs/EnumStatusTypeFieldUpdateOperationsInput";
import { NullableDateTimeFieldUpdateOperationsInput } from "../inputs/NullableDateTimeFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { SessionUpdateManyWithoutUserInput } from "../inputs/SessionUpdateManyWithoutUserInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("UserUpdateWithoutReviewsInput", {
  isAbstract: true
})
export class UserUpdateWithoutReviewsInput {
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

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  email?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  emailVerified?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  image?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  experience?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  twitter?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  facebook?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  discord?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  youtube?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumStatusTypeFieldUpdateOperationsInput, {
    nullable: true
  })
  status?: EnumStatusTypeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => AccountUpdateManyWithoutUserInput, {
    nullable: true
  })
  accounts?: AccountUpdateManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => SessionUpdateManyWithoutUserInput, {
    nullable: true
  })
  sessions?: SessionUpdateManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => CampaignUpdateManyWithoutPlayersInput, {
    nullable: true
  })
  Campaign?: CampaignUpdateManyWithoutPlayersInput | undefined;

  @TypeGraphQL.Field(_type => CampaignUpdateManyWithoutGame_masterInput, {
    nullable: true
  })
  Hosted?: CampaignUpdateManyWithoutGame_masterInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  campaignId?: NullableStringFieldUpdateOperationsInput | undefined;
}
