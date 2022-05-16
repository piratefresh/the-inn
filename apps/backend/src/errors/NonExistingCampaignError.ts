import { ObjectType } from "type-graphql";
import { IError } from "./IError";

@ObjectType({ implements: IError })
export class NonExistingCampaignError implements IError {
  message: string = "campaign doesn't exist";
}
