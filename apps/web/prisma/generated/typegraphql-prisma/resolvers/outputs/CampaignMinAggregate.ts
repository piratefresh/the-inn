import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Difficulty } from "../../enums/Difficulty";
import { Experiance } from "../../enums/Experiance";

@TypeGraphQL.ObjectType("CampaignMinAggregate", {
  isAbstract: true
})
export class CampaignMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  gmId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  summary!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  additional_details!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isOnline!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  city!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  state!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  lat!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  lng!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  geolocation_lat!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  geolocation_lng!: number | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startDate!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endDate!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  game_system!: string | null;

  @TypeGraphQL.Field(_type => Experiance, {
    nullable: true
  })
  experiance!: "Beginner" | "Advanced" | "All" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  voip_system!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  max_seats!: number | null;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  puzzles!: "Low" | "Medium" | "High" | "Any" | null;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  combat!: "Low" | "Medium" | "High" | "Any" | null;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: true
  })
  roleplay!: "Low" | "Medium" | "High" | "Any" | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  price!: number | null;
}
