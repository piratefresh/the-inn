import * as TypeGraphQL from "type-graphql";

export enum Spatial_ref_sysScalarFieldEnum {
  srid = "srid",
  auth_name = "auth_name",
  auth_srid = "auth_srid",
  srtext = "srtext",
  proj4text = "proj4text"
}
TypeGraphQL.registerEnumType(Spatial_ref_sysScalarFieldEnum, {
  name: "Spatial_ref_sysScalarFieldEnum",
  description: undefined,
});
