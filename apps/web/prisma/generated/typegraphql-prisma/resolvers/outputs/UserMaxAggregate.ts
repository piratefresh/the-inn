import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StatusType } from "../../enums/StatusType";

@TypeGraphQL.ObjectType("UserMaxAggregate", {
  isAbstract: true
})
export class UserMaxAggregate {
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
  email!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  emailVerified!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  experience!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  twitter!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  facebook!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  discord!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  youtube!: string | null;

  @TypeGraphQL.Field(_type => StatusType, {
    nullable: true
  })
  status!: "ONLINE" | "IDLE" | "DND" | "OFFLINE" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  campaignId!: string | null;
}
