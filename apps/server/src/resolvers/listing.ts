import { JSONContent, Listing, SkillLevel } from "../entities/Listing";
import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import GraphQLJSON from "graphql-type-json";

@InputType()
class ListingInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => GraphQLJSON, { nullable: true })
  jsonDescription: JSONContent[];
  @Field({ nullable: true })
  extraNote: string;
  @Field(() => GraphQLJSON, { nullable: true })
  jsonExtraNote: JSONContent[];
  @Field()
  gameSystem: string;
  @Field()
  imageUrl: string;
  @Field()
  recommendedSkillLevel: SkillLevel;
  @Field(() => Int)
  maxPartySize: number;

  @Field()
  isOnline: boolean;
  @Field({ nullable: true })
  voipSystem: string;
  @Field({ nullable: true })
  virtualTable: string;
  @Field(() => [String])
  days: string[];
  @Field(() => [String])
  times: string[];
  @Field()
  timezone: string;
  @Field(() => [String])
  requirements: string[];
  @Field(() => [String])
  tags: string[];
  // LOCATION
  @Field({ nullable: true })
  address: string;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  state: string;
  @Field({ nullable: true })
  postalCode: number;
  @Field({ nullable: true })
  lat: number;
  @Field({ nullable: true })
  lng: number;
}

@ObjectType()
class PaginatedListings {
  @Field(() => [Listing])
  listings: Listing[];
  @Field()
  hasMore: boolean;
}

@Resolver(Listing)
export class ListingResolver {
  @FieldResolver(() => User)
  author(@Root() listing: Listing) {
    return User.findOne(listing.authorId);
  }

  @Mutation(() => Listing)
  @UseMiddleware(isAuth)
  async createListing(
    @Arg("input") input: ListingInput,
    @Ctx() { req }: MyContext
  ): Promise<Listing> {
    return Listing.create({
      ...input,
      authorId: req.session.userId,
    }).save();
  }
  @Query(() => PaginatedListings)
  async getListings(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedListings> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const listings = await getConnection().query(
      `
    select p.*
    from listing p
    ${cursor ? `where p."createdAt" < $2` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    console.log(listings);

    return {
      listings: listings.slice(0, realLimit),
      hasMore: listings.length === reaLimitPlusOne,
    };
  }
}
