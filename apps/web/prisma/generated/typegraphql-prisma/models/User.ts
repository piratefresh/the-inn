import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Account } from "../models/Account";
import { Campaign } from "../models/Campaign";
import { Review } from "../models/Review";
import { Session } from "../models/Session";
import { StatusType } from "../enums/StatusType";
import { UserCount } from "../resolvers/outputs/UserCount";

@TypeGraphQL.ObjectType("User", {
  isAbstract: true
})
export class User {
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
    nullable: true
  })
  email?: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  emailVerified?: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image?: string | null;

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
  twitter?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  facebook?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  discord?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  youtube?: string | null;

  @TypeGraphQL.Field(_type => StatusType, {
    nullable: false
  })
  status!: "ONLINE" | "IDLE" | "DND" | "OFFLINE";

  accounts?: Account[];

  sessions?: Session[];

  reviews?: Review[];

  Campaign?: Campaign[];

  Hosted?: Campaign[];

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  campaignId?: string | null;

  @TypeGraphQL.Field(_type => UserCount, {
    nullable: true
  })
  _count?: UserCount | null;
}
