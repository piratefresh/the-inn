import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Geometry } from "geojson";
import { Comment } from "./Comment";
import { User } from "./User";
import GraphQLJSON from "graphql-type-json";

export type JSONContent = {
  type?: string;
  attrs?: Record<string, any>;
  content?: JSONContent[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text?: string;
  [key: string]: any;
};

export enum ListingType {
  ENTIRE = "entire",
  PRIVATE = "private",
  HOTEL = "hotel",
  SHARED = "shared",
}

export enum SkillLevel {
  BEGINNER = "Beginner",
  ADVANCED = "Advanced",
  ALL = "All",
}

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.listing)
  comments: Comment[];

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: "jsonb", nullable: true })
  jsonDescription: JSONContent[];

  @Field()
  @Column({ nullable: true })
  extraNote: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: "jsonb", nullable: true })
  jsonExtraNote: JSONContent[];

  @Field()
  @Column()
  imageUrl!: string;

  @Field()
  @Column({
    type: "enum",
    enum: SkillLevel,
    default: SkillLevel.ALL,
  })
  recommendedSkillLevel: SkillLevel;

  @Field()
  @Column({ default: false })
  isOnline!: boolean;

  @Field()
  @Column({ nullable: true })
  gameSystem!: string;

  @Field()
  @Column({ nullable: true })
  voipSystem!: string;

  @Field()
  @Column({ nullable: true })
  virtualTable!: string;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  days: string[];

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  times: string[];

  @Field()
  @Column()
  timezone!: string;

  @Field()
  @Column({ nullable: true })
  address: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  state: string;

  @Field()
  @Column({ nullable: true })
  postalCode: number;

  @Field()
  @Column({ type: "double precision", name: "lat", nullable: true })
  lat: number;

  @Field()
  @Column({ type: "double precision", name: "lng", nullable: true })
  lng: number;

  @Column({
    type: "point",
    nullable: true,
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location: Geometry;

  @Field(() => [Number])
  @Column("int", { array: true, nullable: true })
  bookings: number[];

  @Field()
  @Column({ default: 0 })
  price: number;

  @Field()
  @Column({ default: 1 })
  maxPartySize!: number;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  requirements: string[];

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  tags: string[];

  @Field()
  @Column({ default: false })
  authorized!: boolean;

  @Field()
  @Column()
  authorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.listings, {
    onDelete: "CASCADE",
    eager: true,
    nullable: false,
  })
  author: User;
}

//  _id: ObjectId;
//     title: string;
//     description: string;
//     image: string;
//     host: string;
//     type: ListingType;
//     address: string;
//     country: string;
//     admin: string;
//     city: string;
//     bookings: ObjectId[];
//     bookingsIndex: BookingsIndexYear;
//     price: number;
//     numOfGuests: number;
//     authorized?: boolean;
