import { GetUserQuery } from "@generated/graphql";
import { Session } from "next-auth";

export interface SettingsProps {
  session: Session;
  user: GetUserQuery["getUser"];
}
