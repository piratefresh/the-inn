import { FieldsValidationError } from "@errors/FieldsValidationError";
import { Review } from "@models/Review";
import { MyContext } from "@typedefs/MyContext";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";

export const CreateReviewResult = createUnionType({
  name: "CreateReviewResult",
  types: () => [Review, FieldsValidationError] as const,
});

@InputType()
export class CreateReviewInput {
  @Field()
  rating: number;
  @Field()
  comment: string;
  @Field()
  userId: string;
}

@Resolver(Review)
export class ReviewResolver {
  @Mutation((_type) => CreateReviewResult)
  async createReview(
    @Arg("createReviewInput") createReviewInput: CreateReviewInput,
    @Ctx() { prisma, res, req }: MyContext
  ) {
    try {
      const createdReview = await prisma.review.create({
        data: {
          ...createReviewInput,
        },
        include: {
          user: true,
        },
      });

      return Object.assign(new Review(), createdReview);
    } catch (err) {
      throw err;
    }
  }
}
