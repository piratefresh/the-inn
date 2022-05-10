import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

const crudResolversMap = {
  Account: crudResolvers.AccountCrudResolver,
  Session: crudResolvers.SessionCrudResolver,
  VerificationToken: crudResolvers.VerificationTokenCrudResolver,
  User: crudResolvers.UserCrudResolver,
  Campaign: crudResolvers.CampaignCrudResolver,
  Review: crudResolvers.ReviewCrudResolver,
  Spatial_ref_sys: crudResolvers.Spatial_ref_sysCrudResolver
};
const actionResolversMap = {
  Account: {
    account: actionResolvers.FindUniqueAccountResolver,
    findFirstAccount: actionResolvers.FindFirstAccountResolver,
    accounts: actionResolvers.FindManyAccountResolver,
    createAccount: actionResolvers.CreateAccountResolver,
    createManyAccount: actionResolvers.CreateManyAccountResolver,
    deleteAccount: actionResolvers.DeleteAccountResolver,
    updateAccount: actionResolvers.UpdateAccountResolver,
    deleteManyAccount: actionResolvers.DeleteManyAccountResolver,
    updateManyAccount: actionResolvers.UpdateManyAccountResolver,
    upsertAccount: actionResolvers.UpsertAccountResolver,
    aggregateAccount: actionResolvers.AggregateAccountResolver,
    groupByAccount: actionResolvers.GroupByAccountResolver
  },
  Session: {
    session: actionResolvers.FindUniqueSessionResolver,
    findFirstSession: actionResolvers.FindFirstSessionResolver,
    sessions: actionResolvers.FindManySessionResolver,
    createSession: actionResolvers.CreateSessionResolver,
    createManySession: actionResolvers.CreateManySessionResolver,
    deleteSession: actionResolvers.DeleteSessionResolver,
    updateSession: actionResolvers.UpdateSessionResolver,
    deleteManySession: actionResolvers.DeleteManySessionResolver,
    updateManySession: actionResolvers.UpdateManySessionResolver,
    upsertSession: actionResolvers.UpsertSessionResolver,
    aggregateSession: actionResolvers.AggregateSessionResolver,
    groupBySession: actionResolvers.GroupBySessionResolver
  },
  VerificationToken: {
    verificationToken: actionResolvers.FindUniqueVerificationTokenResolver,
    findFirstVerificationToken: actionResolvers.FindFirstVerificationTokenResolver,
    verificationTokens: actionResolvers.FindManyVerificationTokenResolver,
    createVerificationToken: actionResolvers.CreateVerificationTokenResolver,
    createManyVerificationToken: actionResolvers.CreateManyVerificationTokenResolver,
    deleteVerificationToken: actionResolvers.DeleteVerificationTokenResolver,
    updateVerificationToken: actionResolvers.UpdateVerificationTokenResolver,
    deleteManyVerificationToken: actionResolvers.DeleteManyVerificationTokenResolver,
    updateManyVerificationToken: actionResolvers.UpdateManyVerificationTokenResolver,
    upsertVerificationToken: actionResolvers.UpsertVerificationTokenResolver,
    aggregateVerificationToken: actionResolvers.AggregateVerificationTokenResolver,
    groupByVerificationToken: actionResolvers.GroupByVerificationTokenResolver
  },
  User: {
    user: actionResolvers.FindUniqueUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    users: actionResolvers.FindManyUserResolver,
    createUser: actionResolvers.CreateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    deleteUser: actionResolvers.DeleteUserResolver,
    updateUser: actionResolvers.UpdateUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    upsertUser: actionResolvers.UpsertUserResolver,
    aggregateUser: actionResolvers.AggregateUserResolver,
    groupByUser: actionResolvers.GroupByUserResolver
  },
  Campaign: {
    campaign: actionResolvers.FindUniqueCampaignResolver,
    findFirstCampaign: actionResolvers.FindFirstCampaignResolver,
    campaigns: actionResolvers.FindManyCampaignResolver,
    createCampaign: actionResolvers.CreateCampaignResolver,
    createManyCampaign: actionResolvers.CreateManyCampaignResolver,
    deleteCampaign: actionResolvers.DeleteCampaignResolver,
    updateCampaign: actionResolvers.UpdateCampaignResolver,
    deleteManyCampaign: actionResolvers.DeleteManyCampaignResolver,
    updateManyCampaign: actionResolvers.UpdateManyCampaignResolver,
    upsertCampaign: actionResolvers.UpsertCampaignResolver,
    aggregateCampaign: actionResolvers.AggregateCampaignResolver,
    groupByCampaign: actionResolvers.GroupByCampaignResolver
  },
  Review: {
    review: actionResolvers.FindUniqueReviewResolver,
    findFirstReview: actionResolvers.FindFirstReviewResolver,
    reviews: actionResolvers.FindManyReviewResolver,
    createReview: actionResolvers.CreateReviewResolver,
    createManyReview: actionResolvers.CreateManyReviewResolver,
    deleteReview: actionResolvers.DeleteReviewResolver,
    updateReview: actionResolvers.UpdateReviewResolver,
    deleteManyReview: actionResolvers.DeleteManyReviewResolver,
    updateManyReview: actionResolvers.UpdateManyReviewResolver,
    upsertReview: actionResolvers.UpsertReviewResolver,
    aggregateReview: actionResolvers.AggregateReviewResolver,
    groupByReview: actionResolvers.GroupByReviewResolver
  },
  Spatial_ref_sys: {
    findUniqueSpatial_ref_sys: actionResolvers.FindUniqueSpatial_ref_sysResolver,
    findFirstSpatial_ref_sys: actionResolvers.FindFirstSpatial_ref_sysResolver,
    findManySpatial_ref_sys: actionResolvers.FindManySpatial_ref_sysResolver,
    createSpatial_ref_sys: actionResolvers.CreateSpatial_ref_sysResolver,
    createManySpatial_ref_sys: actionResolvers.CreateManySpatial_ref_sysResolver,
    deleteSpatial_ref_sys: actionResolvers.DeleteSpatial_ref_sysResolver,
    updateSpatial_ref_sys: actionResolvers.UpdateSpatial_ref_sysResolver,
    deleteManySpatial_ref_sys: actionResolvers.DeleteManySpatial_ref_sysResolver,
    updateManySpatial_ref_sys: actionResolvers.UpdateManySpatial_ref_sysResolver,
    upsertSpatial_ref_sys: actionResolvers.UpsertSpatial_ref_sysResolver,
    aggregateSpatial_ref_sys: actionResolvers.AggregateSpatial_ref_sysResolver,
    groupBySpatial_ref_sys: actionResolvers.GroupBySpatial_ref_sysResolver
  }
};
const crudResolversInfo = {
  Account: ["account", "findFirstAccount", "accounts", "createAccount", "createManyAccount", "deleteAccount", "updateAccount", "deleteManyAccount", "updateManyAccount", "upsertAccount", "aggregateAccount", "groupByAccount"],
  Session: ["session", "findFirstSession", "sessions", "createSession", "createManySession", "deleteSession", "updateSession", "deleteManySession", "updateManySession", "upsertSession", "aggregateSession", "groupBySession"],
  VerificationToken: ["verificationToken", "findFirstVerificationToken", "verificationTokens", "createVerificationToken", "createManyVerificationToken", "deleteVerificationToken", "updateVerificationToken", "deleteManyVerificationToken", "updateManyVerificationToken", "upsertVerificationToken", "aggregateVerificationToken", "groupByVerificationToken"],
  User: ["user", "findFirstUser", "users", "createUser", "createManyUser", "deleteUser", "updateUser", "deleteManyUser", "updateManyUser", "upsertUser", "aggregateUser", "groupByUser"],
  Campaign: ["campaign", "findFirstCampaign", "campaigns", "createCampaign", "createManyCampaign", "deleteCampaign", "updateCampaign", "deleteManyCampaign", "updateManyCampaign", "upsertCampaign", "aggregateCampaign", "groupByCampaign"],
  Review: ["review", "findFirstReview", "reviews", "createReview", "createManyReview", "deleteReview", "updateReview", "deleteManyReview", "updateManyReview", "upsertReview", "aggregateReview", "groupByReview"],
  Spatial_ref_sys: ["findUniqueSpatial_ref_sys", "findFirstSpatial_ref_sys", "findManySpatial_ref_sys", "createSpatial_ref_sys", "createManySpatial_ref_sys", "deleteSpatial_ref_sys", "updateSpatial_ref_sys", "deleteManySpatial_ref_sys", "updateManySpatial_ref_sys", "upsertSpatial_ref_sys", "aggregateSpatial_ref_sys", "groupBySpatial_ref_sys"]
};
const argsInfo = {
  FindUniqueAccountArgs: ["where"],
  FindFirstAccountArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyAccountArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateAccountArgs: ["data"],
  CreateManyAccountArgs: ["data", "skipDuplicates"],
  DeleteAccountArgs: ["where"],
  UpdateAccountArgs: ["data", "where"],
  DeleteManyAccountArgs: ["where"],
  UpdateManyAccountArgs: ["data", "where"],
  UpsertAccountArgs: ["where", "create", "update"],
  AggregateAccountArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByAccountArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueSessionArgs: ["where"],
  FindFirstSessionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManySessionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateSessionArgs: ["data"],
  CreateManySessionArgs: ["data", "skipDuplicates"],
  DeleteSessionArgs: ["where"],
  UpdateSessionArgs: ["data", "where"],
  DeleteManySessionArgs: ["where"],
  UpdateManySessionArgs: ["data", "where"],
  UpsertSessionArgs: ["where", "create", "update"],
  AggregateSessionArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupBySessionArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueVerificationTokenArgs: ["where"],
  FindFirstVerificationTokenArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyVerificationTokenArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateVerificationTokenArgs: ["data"],
  CreateManyVerificationTokenArgs: ["data", "skipDuplicates"],
  DeleteVerificationTokenArgs: ["where"],
  UpdateVerificationTokenArgs: ["data", "where"],
  DeleteManyVerificationTokenArgs: ["where"],
  UpdateManyVerificationTokenArgs: ["data", "where"],
  UpsertVerificationTokenArgs: ["where", "create", "update"],
  AggregateVerificationTokenArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByVerificationTokenArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateUserArgs: ["data"],
  CreateManyUserArgs: ["data", "skipDuplicates"],
  DeleteUserArgs: ["where"],
  UpdateUserArgs: ["data", "where"],
  DeleteManyUserArgs: ["where"],
  UpdateManyUserArgs: ["data", "where"],
  UpsertUserArgs: ["where", "create", "update"],
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueCampaignArgs: ["where"],
  FindFirstCampaignArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyCampaignArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateCampaignArgs: ["data"],
  CreateManyCampaignArgs: ["data", "skipDuplicates"],
  DeleteCampaignArgs: ["where"],
  UpdateCampaignArgs: ["data", "where"],
  DeleteManyCampaignArgs: ["where"],
  UpdateManyCampaignArgs: ["data", "where"],
  UpsertCampaignArgs: ["where", "create", "update"],
  AggregateCampaignArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByCampaignArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueReviewArgs: ["where"],
  FindFirstReviewArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyReviewArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateReviewArgs: ["data"],
  CreateManyReviewArgs: ["data", "skipDuplicates"],
  DeleteReviewArgs: ["where"],
  UpdateReviewArgs: ["data", "where"],
  DeleteManyReviewArgs: ["where"],
  UpdateManyReviewArgs: ["data", "where"],
  UpsertReviewArgs: ["where", "create", "update"],
  AggregateReviewArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByReviewArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueSpatial_ref_sysArgs: ["where"],
  FindFirstSpatial_ref_sysArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManySpatial_ref_sysArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateSpatial_ref_sysArgs: ["data"],
  CreateManySpatial_ref_sysArgs: ["data", "skipDuplicates"],
  DeleteSpatial_ref_sysArgs: ["where"],
  UpdateSpatial_ref_sysArgs: ["data", "where"],
  DeleteManySpatial_ref_sysArgs: ["where"],
  UpdateManySpatial_ref_sysArgs: ["data", "where"],
  UpsertSpatial_ref_sysArgs: ["where", "create", "update"],
  AggregateSpatial_ref_sysArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupBySpatial_ref_sysArgs: ["where", "orderBy", "by", "having", "take", "skip"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  Account: relationResolvers.AccountRelationsResolver,
  Session: relationResolvers.SessionRelationsResolver,
  User: relationResolvers.UserRelationsResolver,
  Campaign: relationResolvers.CampaignRelationsResolver,
  Review: relationResolvers.ReviewRelationsResolver
};
const relationResolversInfo = {
  Account: ["user"],
  Session: ["user"],
  User: ["accounts", "sessions", "reviews", "Campaign", "Hosted"],
  Campaign: ["game_master", "players"],
  Review: ["user"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  Account: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  Session: ["id", "sessionToken", "userId", "expires"],
  VerificationToken: ["identifier", "token", "expires"],
  User: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  Campaign: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  Review: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  Spatial_ref_sys: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateAccount: ["_count", "_avg", "_sum", "_min", "_max"],
  AccountGroupBy: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateSession: ["_count", "_min", "_max"],
  SessionGroupBy: ["id", "sessionToken", "userId", "expires", "_count", "_min", "_max"],
  AggregateVerificationToken: ["_count", "_min", "_max"],
  VerificationTokenGroupBy: ["identifier", "token", "expires", "_count", "_min", "_max"],
  AggregateUser: ["_count", "_min", "_max"],
  UserGroupBy: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId", "_count", "_min", "_max"],
  AggregateCampaign: ["_count", "_avg", "_sum", "_min", "_max"],
  CampaignGroupBy: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateReview: ["_count", "_avg", "_sum", "_min", "_max"],
  ReviewGroupBy: ["id", "createdAt", "updatedAt", "rating", "comment", "userId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateSpatial_ref_sys: ["_count", "_avg", "_sum", "_min", "_max"],
  Spatial_ref_sysGroupBy: ["srid", "auth_name", "auth_srid", "srtext", "proj4text", "_count", "_avg", "_sum", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  AccountCountAggregate: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "_all"],
  AccountAvgAggregate: ["expires_at"],
  AccountSumAggregate: ["expires_at"],
  AccountMinAggregate: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  AccountMaxAggregate: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  SessionCountAggregate: ["id", "sessionToken", "userId", "expires", "_all"],
  SessionMinAggregate: ["id", "sessionToken", "userId", "expires"],
  SessionMaxAggregate: ["id", "sessionToken", "userId", "expires"],
  VerificationTokenCountAggregate: ["identifier", "token", "expires", "_all"],
  VerificationTokenMinAggregate: ["identifier", "token", "expires"],
  VerificationTokenMaxAggregate: ["identifier", "token", "expires"],
  UserCount: ["accounts", "sessions", "reviews", "Campaign", "Hosted"],
  UserCountAggregate: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId", "_all"],
  UserMinAggregate: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  UserMaxAggregate: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  CampaignCount: ["players"],
  CampaignCountAggregate: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price", "_all"],
  CampaignAvgAggregate: ["lat", "lng", "geolocation_lat", "geolocation_lng", "max_seats", "price"],
  CampaignSumAggregate: ["lat", "lng", "geolocation_lat", "geolocation_lng", "max_seats", "price"],
  CampaignMinAggregate: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "price"],
  CampaignMaxAggregate: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "price"],
  ReviewCountAggregate: ["id", "createdAt", "updatedAt", "rating", "comment", "userId", "_all"],
  ReviewAvgAggregate: ["rating"],
  ReviewSumAggregate: ["rating"],
  ReviewMinAggregate: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  ReviewMaxAggregate: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  Spatial_ref_sysCountAggregate: ["srid", "auth_name", "auth_srid", "srtext", "proj4text", "_all"],
  Spatial_ref_sysAvgAggregate: ["srid", "auth_srid"],
  Spatial_ref_sysSumAggregate: ["srid", "auth_srid"],
  Spatial_ref_sysMinAggregate: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysMaxAggregate: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  AccountWhereInput: ["AND", "OR", "NOT", "id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "user"],
  AccountOrderByWithRelationInput: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "user"],
  AccountWhereUniqueInput: ["id", "provider_providerAccountId"],
  AccountOrderByWithAggregationInput: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "_count", "_avg", "_max", "_min", "_sum"],
  AccountScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  SessionWhereInput: ["AND", "OR", "NOT", "id", "sessionToken", "userId", "expires", "user"],
  SessionOrderByWithRelationInput: ["id", "sessionToken", "userId", "expires", "user"],
  SessionWhereUniqueInput: ["id", "sessionToken"],
  SessionOrderByWithAggregationInput: ["id", "sessionToken", "userId", "expires", "_count", "_max", "_min"],
  SessionScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "sessionToken", "userId", "expires"],
  VerificationTokenWhereInput: ["AND", "OR", "NOT", "identifier", "token", "expires"],
  VerificationTokenOrderByWithRelationInput: ["identifier", "token", "expires"],
  VerificationTokenWhereUniqueInput: ["token", "identifier_token"],
  VerificationTokenOrderByWithAggregationInput: ["identifier", "token", "expires", "_count", "_max", "_min"],
  VerificationTokenScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "identifier", "token", "expires"],
  UserWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Campaign", "Hosted", "campaignId"],
  UserOrderByWithRelationInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Campaign", "Hosted", "campaignId"],
  UserWhereUniqueInput: ["id", "email"],
  UserOrderByWithAggregationInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId", "_count", "_max", "_min"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  CampaignWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "game_master", "players", "tags", "price"],
  CampaignOrderByWithRelationInput: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "game_master", "players", "tags", "price"],
  CampaignWhereUniqueInput: ["id"],
  CampaignOrderByWithAggregationInput: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price", "_count", "_avg", "_max", "_min", "_sum"],
  CampaignScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  ReviewWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "rating", "comment", "userId", "user"],
  ReviewOrderByWithRelationInput: ["id", "createdAt", "updatedAt", "rating", "comment", "userId", "user"],
  ReviewWhereUniqueInput: ["id"],
  ReviewOrderByWithAggregationInput: ["id", "createdAt", "updatedAt", "rating", "comment", "userId", "_count", "_avg", "_max", "_min", "_sum"],
  ReviewScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  Spatial_ref_sysWhereInput: ["AND", "OR", "NOT", "srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysOrderByWithRelationInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysWhereUniqueInput: ["srid"],
  Spatial_ref_sysOrderByWithAggregationInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text", "_count", "_avg", "_max", "_min", "_sum"],
  Spatial_ref_sysScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  AccountCreateInput: ["id", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "user"],
  AccountUpdateInput: ["id", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token", "user"],
  AccountCreateManyInput: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  AccountUpdateManyMutationInput: ["id", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  SessionCreateInput: ["id", "sessionToken", "expires", "user"],
  SessionUpdateInput: ["id", "sessionToken", "expires", "user"],
  SessionCreateManyInput: ["id", "sessionToken", "userId", "expires"],
  SessionUpdateManyMutationInput: ["id", "sessionToken", "expires"],
  VerificationTokenCreateInput: ["identifier", "token", "expires"],
  VerificationTokenUpdateInput: ["identifier", "token", "expires"],
  VerificationTokenCreateManyInput: ["identifier", "token", "expires"],
  VerificationTokenUpdateManyMutationInput: ["identifier", "token", "expires"],
  UserCreateInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Campaign", "Hosted", "campaignId"],
  UserUpdateInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Campaign", "Hosted", "campaignId"],
  UserCreateManyInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  UserUpdateManyMutationInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  CampaignCreateInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "game_master", "players", "tags", "price"],
  CampaignUpdateInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "game_master", "players", "tags", "price"],
  CampaignCreateManyInput: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  CampaignUpdateManyMutationInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  ReviewCreateInput: ["id", "createdAt", "updatedAt", "rating", "comment", "user"],
  ReviewUpdateInput: ["id", "createdAt", "updatedAt", "rating", "comment", "user"],
  ReviewCreateManyInput: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  ReviewUpdateManyMutationInput: ["id", "createdAt", "updatedAt", "rating", "comment"],
  Spatial_ref_sysCreateInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysUpdateInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysCreateManyInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysUpdateManyMutationInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  IntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  UserRelationFilter: ["is", "isNot"],
  AccountProviderProviderAccountIdCompoundUniqueInput: ["provider", "providerAccountId"],
  AccountCountOrderByAggregateInput: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  AccountAvgOrderByAggregateInput: ["expires_at"],
  AccountMaxOrderByAggregateInput: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  AccountMinOrderByAggregateInput: ["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  AccountSumOrderByAggregateInput: ["expires_at"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  IntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  SessionCountOrderByAggregateInput: ["id", "sessionToken", "userId", "expires"],
  SessionMaxOrderByAggregateInput: ["id", "sessionToken", "userId", "expires"],
  SessionMinOrderByAggregateInput: ["id", "sessionToken", "userId", "expires"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  VerificationTokenIdentifierTokenCompoundUniqueInput: ["identifier", "token"],
  VerificationTokenCountOrderByAggregateInput: ["identifier", "token", "expires"],
  VerificationTokenMaxOrderByAggregateInput: ["identifier", "token", "expires"],
  VerificationTokenMinOrderByAggregateInput: ["identifier", "token", "expires"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  EnumStatusTypeFilter: ["equals", "in", "notIn", "not"],
  AccountListRelationFilter: ["every", "some", "none"],
  SessionListRelationFilter: ["every", "some", "none"],
  ReviewListRelationFilter: ["every", "some", "none"],
  CampaignListRelationFilter: ["every", "some", "none"],
  AccountOrderByRelationAggregateInput: ["_count"],
  SessionOrderByRelationAggregateInput: ["_count"],
  ReviewOrderByRelationAggregateInput: ["_count"],
  CampaignOrderByRelationAggregateInput: ["_count"],
  UserCountOrderByAggregateInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  UserMaxOrderByAggregateInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  UserMinOrderByAggregateInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  EnumStatusTypeWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  BoolFilter: ["equals", "not"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  FloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  StringNullableListFilter: ["equals", "has", "hasEvery", "hasSome", "isEmpty"],
  EnumExperianceFilter: ["equals", "in", "notIn", "not"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  EnumDifficultyFilter: ["equals", "in", "notIn", "not"],
  UserListRelationFilter: ["every", "some", "none"],
  UserOrderByRelationAggregateInput: ["_count"],
  CampaignCountOrderByAggregateInput: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  CampaignAvgOrderByAggregateInput: ["lat", "lng", "geolocation_lat", "geolocation_lng", "max_seats", "price"],
  CampaignMaxOrderByAggregateInput: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "price"],
  CampaignMinOrderByAggregateInput: ["id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "price"],
  CampaignSumOrderByAggregateInput: ["lat", "lng", "geolocation_lat", "geolocation_lng", "max_seats", "price"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  FloatNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  EnumExperianceWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  EnumDifficultyWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  ReviewCountOrderByAggregateInput: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  ReviewAvgOrderByAggregateInput: ["rating"],
  ReviewMaxOrderByAggregateInput: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  ReviewMinOrderByAggregateInput: ["id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  ReviewSumOrderByAggregateInput: ["rating"],
  Spatial_ref_sysCountOrderByAggregateInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysAvgOrderByAggregateInput: ["srid", "auth_srid"],
  Spatial_ref_sysMaxOrderByAggregateInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysMinOrderByAggregateInput: ["srid", "auth_name", "auth_srid", "srtext", "proj4text"],
  Spatial_ref_sysSumOrderByAggregateInput: ["srid", "auth_srid"],
  UserCreateNestedOneWithoutAccountsInput: ["create", "connectOrCreate", "connect"],
  StringFieldUpdateOperationsInput: ["set"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  NullableIntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  UserUpdateOneRequiredWithoutAccountsInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserCreateNestedOneWithoutSessionsInput: ["create", "connectOrCreate", "connect"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  UserUpdateOneRequiredWithoutSessionsInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  AccountCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  SessionCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  ReviewCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  CampaignCreateNestedManyWithoutPlayersInput: ["create", "connectOrCreate", "connect"],
  CampaignCreateNestedManyWithoutGame_masterInput: ["create", "connectOrCreate", "createMany", "connect"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  EnumStatusTypeFieldUpdateOperationsInput: ["set"],
  AccountUpdateManyWithoutUserInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  SessionUpdateManyWithoutUserInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ReviewUpdateManyWithoutUserInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CampaignUpdateManyWithoutPlayersInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CampaignUpdateManyWithoutGame_masterInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CampaignCreatedaysInput: ["set"],
  CampaignCreatetime_periodsInput: ["set"],
  UserCreateNestedOneWithoutHostedInput: ["create", "connectOrCreate", "connect"],
  UserCreateNestedManyWithoutCampaignInput: ["create", "connectOrCreate", "connect"],
  CampaignCreatetagsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  NullableFloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  CampaignUpdatedaysInput: ["set", "push"],
  CampaignUpdatetime_periodsInput: ["set", "push"],
  EnumExperianceFieldUpdateOperationsInput: ["set"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  EnumDifficultyFieldUpdateOperationsInput: ["set"],
  UserUpdateOneRequiredWithoutHostedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserUpdateManyWithoutCampaignInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CampaignUpdatetagsInput: ["set", "push"],
  UserCreateNestedOneWithoutReviewsInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutReviewsInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedEnumStatusTypeFilter: ["equals", "in", "notIn", "not"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedEnumStatusTypeWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedBoolFilter: ["equals", "not"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedEnumExperianceFilter: ["equals", "in", "notIn", "not"],
  NestedEnumDifficultyFilter: ["equals", "in", "notIn", "not"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedEnumExperianceWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedEnumDifficultyWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  UserCreateWithoutAccountsInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "sessions", "reviews", "Campaign", "Hosted", "campaignId"],
  UserCreateOrConnectWithoutAccountsInput: ["where", "create"],
  UserUpsertWithoutAccountsInput: ["update", "create"],
  UserUpdateWithoutAccountsInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "sessions", "reviews", "Campaign", "Hosted", "campaignId"],
  UserCreateWithoutSessionsInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "reviews", "Campaign", "Hosted", "campaignId"],
  UserCreateOrConnectWithoutSessionsInput: ["where", "create"],
  UserUpsertWithoutSessionsInput: ["update", "create"],
  UserUpdateWithoutSessionsInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "reviews", "Campaign", "Hosted", "campaignId"],
  AccountCreateWithoutUserInput: ["id", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  AccountCreateOrConnectWithoutUserInput: ["where", "create"],
  AccountCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  SessionCreateWithoutUserInput: ["id", "sessionToken", "expires"],
  SessionCreateOrConnectWithoutUserInput: ["where", "create"],
  SessionCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  ReviewCreateWithoutUserInput: ["id", "createdAt", "updatedAt", "rating", "comment"],
  ReviewCreateOrConnectWithoutUserInput: ["where", "create"],
  ReviewCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  CampaignCreateWithoutPlayersInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "game_master", "tags", "price"],
  CampaignCreateOrConnectWithoutPlayersInput: ["where", "create"],
  CampaignCreateWithoutGame_masterInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "players", "tags", "price"],
  CampaignCreateOrConnectWithoutGame_masterInput: ["where", "create"],
  CampaignCreateManyGame_masterInputEnvelope: ["data", "skipDuplicates"],
  AccountUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  AccountUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  AccountUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  AccountScalarWhereInput: ["AND", "OR", "NOT", "id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  SessionUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  SessionUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  SessionUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  SessionScalarWhereInput: ["AND", "OR", "NOT", "id", "sessionToken", "userId", "expires"],
  ReviewUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  ReviewUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  ReviewUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  ReviewScalarWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "rating", "comment", "userId"],
  CampaignUpsertWithWhereUniqueWithoutPlayersInput: ["where", "update", "create"],
  CampaignUpdateWithWhereUniqueWithoutPlayersInput: ["where", "data"],
  CampaignUpdateManyWithWhereWithoutPlayersInput: ["where", "data"],
  CampaignScalarWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "gmId", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  CampaignUpsertWithWhereUniqueWithoutGame_masterInput: ["where", "update", "create"],
  CampaignUpdateWithWhereUniqueWithoutGame_masterInput: ["where", "data"],
  CampaignUpdateManyWithWhereWithoutGame_masterInput: ["where", "data"],
  UserCreateWithoutHostedInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Campaign", "campaignId"],
  UserCreateOrConnectWithoutHostedInput: ["where", "create"],
  UserCreateWithoutCampaignInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Hosted", "campaignId"],
  UserCreateOrConnectWithoutCampaignInput: ["where", "create"],
  UserUpsertWithoutHostedInput: ["update", "create"],
  UserUpdateWithoutHostedInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Campaign", "campaignId"],
  UserUpsertWithWhereUniqueWithoutCampaignInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutCampaignInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutCampaignInput: ["where", "data"],
  UserScalarWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "campaignId"],
  UserCreateWithoutReviewsInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "Campaign", "Hosted", "campaignId"],
  UserCreateOrConnectWithoutReviewsInput: ["where", "create"],
  UserUpsertWithoutReviewsInput: ["update", "create"],
  UserUpdateWithoutReviewsInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "Campaign", "Hosted", "campaignId"],
  AccountCreateManyUserInput: ["id", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  SessionCreateManyUserInput: ["id", "sessionToken", "expires"],
  ReviewCreateManyUserInput: ["id", "createdAt", "updatedAt", "rating", "comment"],
  CampaignCreateManyGame_masterInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "tags", "price"],
  AccountUpdateWithoutUserInput: ["id", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state", "oauth_token_secret", "oauth_token"],
  SessionUpdateWithoutUserInput: ["id", "sessionToken", "expires"],
  ReviewUpdateWithoutUserInput: ["id", "createdAt", "updatedAt", "rating", "comment"],
  CampaignUpdateWithoutPlayersInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "game_master", "tags", "price"],
  CampaignUpdateWithoutGame_masterInput: ["id", "createdAt", "updatedAt", "summary", "additional_details", "note", "image", "isOnline", "city", "state", "lat", "lng", "geolocation_lat", "geolocation_lng", "startDate", "endDate", "days", "time_periods", "game_system", "experiance", "voip_system", "max_seats", "puzzles", "combat", "roleplay", "players", "tags", "price"],
  UserUpdateWithoutCampaignInput: ["id", "createdAt", "updatedAt", "email", "emailVerified", "image", "name", "experience", "twitter", "facebook", "discord", "youtube", "status", "accounts", "sessions", "reviews", "Hosted", "campaignId"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

