import * as TypeGraphQL from "type-graphql";

export enum CampaignScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  gmId = "gmId",
  summary = "summary",
  additional_details = "additional_details",
  note = "note",
  image = "image",
  isOnline = "isOnline",
  city = "city",
  state = "state",
  lat = "lat",
  lng = "lng",
  geolocation_lat = "geolocation_lat",
  geolocation_lng = "geolocation_lng",
  startDate = "startDate",
  endDate = "endDate",
  days = "days",
  time_periods = "time_periods",
  game_system = "game_system",
  experiance = "experiance",
  voip_system = "voip_system",
  max_seats = "max_seats",
  puzzles = "puzzles",
  combat = "combat",
  roleplay = "roleplay",
  tags = "tags",
  price = "price"
}
TypeGraphQL.registerEnumType(CampaignScalarFieldEnum, {
  name: "CampaignScalarFieldEnum",
  description: undefined,
});
