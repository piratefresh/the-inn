import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class spatial_ref_sys {
  @Field((_type) => Int)
  srid: number;

  @Field({ nullable: true })
  auth_name?: string;

  @Field((_type) => Int, { nullable: true })
  auth_srid?: number;

  @Field({ nullable: true })
  srtext?: string;

  @Field({ nullable: true })
  proj4text?: string;

  // skip overwrite 👇
}
