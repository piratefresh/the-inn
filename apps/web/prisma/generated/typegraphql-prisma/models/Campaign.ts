import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { User } from "../models/User";
import { Difficulty } from "../enums/Difficulty";
import { Experiance } from "../enums/Experiance";
import { CampaignCount } from "../resolvers/outputs/CampaignCount";

@TypeGraphQL.ObjectType("Campaign", {
  isAbstract: true
})
export class Campaign {
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

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  gmId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  summary!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  additional_details?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note?: string | null;

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
  geolocation_lat?: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  geolocation_lng?: number | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startDate!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  endDate!: Date;

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  days!: string[];

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  time_periods!: string[];

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  game_system!: string;

  @TypeGraphQL.Field(_type => Experiance, {
    nullable: false
  })
  experiance!: "Beginner" | "Advanced" | "All";

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  voip_system?: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  max_seats!: number;

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: false
  })
  puzzles!: "Low" | "Medium" | "High" | "Any";

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: false
  })
  combat!: "Low" | "Medium" | "High" | "Any";

  @TypeGraphQL.Field(_type => Difficulty, {
    nullable: false
  })
  roleplay!: "Low" | "Medium" | "High" | "Any";

  game_master?: User;

  players?: User[];

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  tags!: string[];

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  price?: number | null;

  @TypeGraphQL.Field(_type => CampaignCount, {
    nullable: true
  })
  _count?: CampaignCount | null;
}
