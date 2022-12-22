import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  accessToken?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  idToken?: Maybe<Scalars['String']>;
  oauthToken?: Maybe<Scalars['String']>;
  oauthTokenSecret?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  sessionState?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type AddPlayerCampaignInput = {
  campaignId: Scalars['String'];
};

export type Application = {
  __typename?: 'Application';
  campaignId: Scalars['String'];
  days: Array<Scalars['String']>;
  experience: Experience;
  fitsSchedule: Scalars['Boolean'];
  id: Scalars['ID'];
  jsonMessage: Scalars['String'];
  membership: Membership;
  membershipId: Scalars['String'];
  message: Scalars['String'];
  timePeriods: Array<Scalars['String']>;
  userId: Scalars['String'];
};

export type AuthResult = BadCredentialsError | FieldsValidationError | NonExistingUserError | User;

export type BadCredentialsError = IError & {
  __typename?: 'BadCredentialsError';
  message: Scalars['String'];
};

export type Campaign = {
  __typename?: 'Campaign';
  additionalDetails?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['String']>;
  campaignMessage: Array<CampaignMessage>;
  campaignType: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  combat: Difficulty;
  createdAt: Scalars['DateTime'];
  days: Array<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  experience: Experience;
  gallery: Array<Scalars['String']>;
  gameMaster: User;
  gameSystem: Scalars['String'];
  gmId: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  isOnline: Scalars['Boolean'];
  jsonAdditionalDetails?: Maybe<Scalars['String']>;
  jsonSummary: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  maxSeats: Scalars['Int'];
  memberships: Array<Membership>;
  note?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  puzzles: Difficulty;
  roleplay: Difficulty;
  startDate: Scalars['DateTime'];
  state?: Maybe<Scalars['String']>;
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  timePeriods: Array<Scalars['String']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  virtualTable?: Maybe<Scalars['String']>;
  voipSystem?: Maybe<Scalars['String']>;
};

export type CampaignApplicationInput = {
  campaignId: Scalars['String'];
  days: Array<Scalars['String']>;
  experience: Experience;
  fitsSchedule: Scalars['Boolean'];
  jsonMessage?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  timePeriods: Array<Scalars['String']>;
};

export type CampaignMessage = {
  __typename?: 'CampaignMessage';
  attachmentError?: Maybe<Scalars['Boolean']>;
  attachmentKey?: Maybe<Scalars['String']>;
  attachmentPending?: Maybe<Scalars['Boolean']>;
  attachmentType?: Maybe<Scalars['String']>;
  campaign: Campaign;
  campaignId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  hasAttachment: Scalars['Boolean'];
  id: Scalars['ID'];
  message: Scalars['String'];
  sender?: Maybe<User>;
  senderId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CampaignPagination = {
  __typename?: 'CampaignPagination';
  campaigns: Array<Campaign>;
  cursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type CreateCampaignInput = {
  additionalDetails: Scalars['String'];
  area?: InputMaybe<Scalars['String']>;
  campaignType?: Scalars['String'];
  city?: InputMaybe<Scalars['String']>;
  combat: Difficulty;
  days: Array<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  experience: Experience;
  gameSystem: Scalars['String'];
  imageUrl: Scalars['String'];
  isOnline: Scalars['Boolean'];
  jsonAdditionalDetails?: InputMaybe<Scalars['String']>;
  jsonSummary?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  maxSeats: Scalars['Float'];
  price?: InputMaybe<Scalars['Float']>;
  puzzles: Difficulty;
  roleplay: Difficulty;
  startDate: Scalars['DateTime'];
  state?: InputMaybe<Scalars['String']>;
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  timePeriods: Array<Scalars['String']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  virtualTable?: InputMaybe<Scalars['String']>;
  voipSystem?: InputMaybe<Scalars['String']>;
};

export type CreateCampaignResult = Campaign | FieldsValidationError;

export type CreateReviewInput = {
  comment: Scalars['String'];
  rating: Scalars['Float'];
  userId: Scalars['String'];
};

export type CreateReviewResult = FieldsValidationError | Review;

export type CreateUserResult = ExistingUserError | FieldsValidationError | User;

export enum Difficulty {
  Any = 'Any',
  High = 'High',
  Low = 'Low',
  Medium = 'Medium'
}

export type ExistingUserError = IError & {
  __typename?: 'ExistingUserError';
  message: Scalars['String'];
};

export enum Experience {
  Advanced = 'Advanced',
  All = 'All',
  Beginner = 'Beginner'
}

export type FieldError = IError & {
  __typename?: 'FieldError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type FieldsValidationError = IError & {
  __typename?: 'FieldsValidationError';
  fieldErrors: Array<FieldError>;
  message: Scalars['String'];
};

export type IError = {
  message: Scalars['String'];
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Int'];
};

export type Membership = {
  __typename?: 'Membership';
  application: Array<Application>;
  campaign: Campaign;
  campaignId: Scalars['String'];
  role: MembershipRole;
  user: User;
  userId: Scalars['String'];
};

export enum MembershipRole {
  Gm = 'GM',
  Pending = 'PENDING',
  Player = 'PLAYER'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCampaignPlayer: CreateCampaignResult;
  addPlayerApplication: CreateCampaignResult;
  addPrivateMessage: PrivateMessage;
  createCampaign: CreateCampaignResult;
  createImageSignature: ImageSignature;
  createReview: CreateReviewResult;
  setNotificationsRead: Array<Notification>;
  signin: AuthResult;
  signout: Scalars['Boolean'];
  signup: CreateUserResult;
};


export type MutationAddCampaignPlayerArgs = {
  AddPlayerCampaignInput: AddPlayerCampaignInput;
};


export type MutationAddPlayerApplicationArgs = {
  campaignApplicationInput: CampaignApplicationInput;
};


export type MutationAddPrivateMessageArgs = {
  AddPrivateMessageInput: PrivateMessageInput;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationSetNotificationsReadArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationSigninArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationSignupArgs = {
  options: UsernamePasswordInput;
};

export type NewCampaignNotification = {
  __typename?: 'NewCampaignNotification';
  campaignId: Scalars['String'];
  createdAt: Scalars['String'];
  gameMasterId: Scalars['String'];
  message: Scalars['String'];
  notificationId: Scalars['String'];
  read: Scalars['Boolean'];
  relatedId: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type NonExistingUserError = IError & {
  __typename?: 'NonExistingUserError';
  message: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  read: Scalars['Boolean'];
  relatedId: Scalars['String'];
  type: NotificationType;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export enum NotificationType {
  Campaign = 'Campaign',
  Message = 'Message',
  PrivateMessage = 'PrivateMessage'
}

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  attachmentError?: Maybe<Scalars['Boolean']>;
  attachmentKey?: Maybe<Scalars['String']>;
  attachmentPending?: Maybe<Scalars['Boolean']>;
  attachmentType?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  hasAttachment: Scalars['Boolean'];
  id: Scalars['ID'];
  message: Scalars['String'];
  recipient: User;
  recipientId: Scalars['String'];
  sender: User;
  senderId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PrivateMessageInput = {
  attachmentError?: InputMaybe<Scalars['Boolean']>;
  attachmentKey?: InputMaybe<Scalars['String']>;
  attachmentPending?: InputMaybe<Scalars['Boolean']>;
  attachmentType?: InputMaybe<Scalars['String']>;
  hasAttachment?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentNumber: Scalars['Int'];
  getAllNotifications: Array<Notification>;
  getAllPrivateMessages: Array<PrivateMessage>;
  getCampaign: Campaign;
  getCampaigns: Array<Campaign>;
  getCampaignsPagination: CampaignPagination;
  getOnlineUsers: Array<User>;
  getUnreadNotifications: Array<Notification>;
  getUser: User;
  getUserCampaign: Array<Campaign>;
  getUserPrivateMessages: Array<PrivateMessage>;
  getUsers: UsersPagination;
  getUsersById: Array<User>;
  hellogame: Scalars['String'];
  helloworld: Scalars['String'];
  me: Scalars['String'];
};


export type QueryGetCampaignArgs = {
  id: Scalars['String'];
};


export type QueryGetCampaignsPaginationArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: Scalars['Float'];
};


export type QueryGetOnlineUsersArgs = {
  message: Scalars['String'];
  username: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: Scalars['Float'];
};


export type QueryGetUsersByIdArgs = {
  playerIds: Array<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  rating: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  expires: Scalars['DateTime'];
  id: Scalars['ID'];
  sessionToken: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export enum StatusType {
  Dnd = 'DND',
  Idle = 'IDLE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type Subscription = {
  __typename?: 'Subscription';
  newCampaignApplication: NewCampaignNotification;
  newPrivateMessage: PrivateMessage;
  numberIncremented: Scalars['Float'];
  subscription: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  Notification: Array<Notification>;
  aboutMe?: Maybe<Scalars['String']>;
  accounts: Array<Account>;
  createdAt: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['DateTime']>;
  emailVerifyToken?: Maybe<Scalars['String']>;
  experience: Experience;
  facebook?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  hosted: Array<Campaign>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  memberships: Array<Membership>;
  password: Scalars['String'];
  passwordResetToken?: Maybe<Scalars['String']>;
  receivedPrivateMessage: Array<PrivateMessage>;
  reviews: Array<Review>;
  sentCampaignMessage: Array<CampaignMessage>;
  sentPrivateMessages: Array<PrivateMessage>;
  sessions: Array<Session>;
  status: StatusType;
  twitter?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  youtube?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UsersPagination = {
  __typename?: 'UsersPagination';
  cursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  users: Array<User>;
};

export type CampaignSnippetFragment = { __typename?: 'Campaign', id: string, title: string, summary: string, city?: string | null, state?: string | null, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, tags: Array<string>, maxSeats: number, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, imageUrl?: string | null } }> };

export type UserSnippetFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imageUrl?: string | null };

export type AddPlayerApplicationMutationVariables = Exact<{
  campaignApplicationInput: CampaignApplicationInput;
}>;


export type AddPlayerApplicationMutation = { __typename?: 'Mutation', addPlayerApplication: { __typename?: 'Campaign', id: string, title: string, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, id: string }, application: Array<{ __typename?: 'Application', message: string, jsonMessage: string, id: string, fitsSchedule: boolean, timePeriods: Array<string> }> }> } | { __typename?: 'FieldsValidationError' } };

export type CreateCampaignMutationVariables = Exact<{
  createCampaignInput: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', id: string, gmId: string, title: string, summary: string, city?: string | null, state?: string | null } | { __typename?: 'FieldsValidationError' } };

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = { __typename?: 'Mutation', createImageSignature: { __typename?: 'ImageSignature', signature: string, timestamp: number } };

export type SetNotificationsReadMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type SetNotificationsReadMutation = { __typename?: 'Mutation', setNotificationsRead: Array<{ __typename?: 'Notification', id: string }> };

export type SignInMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signin: { __typename?: 'BadCredentialsError', message: string } | { __typename?: 'FieldsValidationError', message: string } | { __typename?: 'NonExistingUserError', message: string } | { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, imageUrl?: string | null, accounts: Array<{ __typename?: 'Account', provider: string, providerAccountId: string, type: string, expiresAt?: number | null, refreshToken?: string | null, userId: string }> } };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { __typename?: 'Mutation', signout: boolean };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'ExistingUserError', message: string } | { __typename?: 'FieldsValidationError', message: string } | { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getAllNotifications: Array<{ __typename?: 'Notification', id: string, read: boolean, message: string, type: NotificationType, relatedId: string, updatedAt: any }> };

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', getCampaign: { __typename?: 'Campaign', id: string, title: string, summary: string, campaignType: string, city?: string | null, state?: string | null, area?: string | null, imageUrl: string, isOnline: boolean, maxSeats: number, jsonSummary: string, additionalDetails?: string | null, jsonAdditionalDetails?: string | null, experience: Experience, gameSystem: string, startDate: any, endDate?: any | null, tags: Array<string>, days: Array<string>, timezone: string, timePeriods: Array<string>, virtualTable?: string | null, voipSystem?: string | null, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string } }>, gameMaster: { __typename?: 'User', id: string, firstName: string, lastName: string, imageUrl?: string | null } } };

export type GetCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCampaignsQuery = { __typename?: 'Query', getCampaigns: Array<{ __typename?: 'Campaign', id: string, title: string, summary: string, city?: string | null, state?: string | null, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, tags: Array<string>, maxSeats: number, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, imageUrl?: string | null } }> }> };

export type GetUnreadNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationsQuery = { __typename?: 'Query', getUnreadNotifications: Array<{ __typename?: 'Notification', updatedAt: any, userId: string, type: NotificationType, relatedId: string, read: boolean, message: string, id: string, createdAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imageUrl?: string | null } };

export type GetUserCampaignQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCampaignQuery = { __typename?: 'Query', getUserCampaign: Array<{ __typename?: 'Campaign', id: string, title: string, summary: string, city?: string | null, state?: string | null, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, tags: Array<string>, maxSeats: number, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, imageUrl?: string | null } }> }> };

export type GetUsersQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPagination', cursor: string, hasNextPage: boolean, users: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imageUrl?: string | null }> } };

export type NewCampaignApplicationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCampaignApplicationSubscription = { __typename?: 'Subscription', newCampaignApplication: { __typename?: 'NewCampaignNotification', campaignId: string, gameMasterId: string, notificationId: string, message: string, type: string, read: boolean, updatedAt: string, createdAt: string, relatedId: string } };

export const CampaignSnippetFragmentDoc = `
    fragment CampaignSnippet on Campaign {
  id
  title
  summary
  city
  state
  imageUrl
  summary
  jsonSummary
  gameSystem
  startDate
  endDate
  days
  timePeriods
  tags
  maxSeats
  memberships {
    role
    user {
      firstName
      lastName
      imageUrl
    }
  }
}
    `;
export const UserSnippetFragmentDoc = `
    fragment UserSnippet on User {
  id
  firstName
  lastName
  email
  imageUrl
}
    `;
export const AddPlayerApplicationDocument = `
    mutation AddPlayerApplication($campaignApplicationInput: CampaignApplicationInput!) {
  addPlayerApplication(campaignApplicationInput: $campaignApplicationInput) {
    ... on Campaign {
      id
      title
      memberships {
        role
        user {
          firstName
          lastName
          id
        }
        application {
          message
          jsonMessage
          id
          fitsSchedule
          timePeriods
        }
      }
    }
  }
}
    `;
export const useAddPlayerApplicationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddPlayerApplicationMutation, TError, AddPlayerApplicationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddPlayerApplicationMutation, TError, AddPlayerApplicationMutationVariables, TContext>(
      ['AddPlayerApplication'],
      (variables?: AddPlayerApplicationMutationVariables) => fetcher<AddPlayerApplicationMutation, AddPlayerApplicationMutationVariables>(client, AddPlayerApplicationDocument, variables, headers)(),
      options
    );
useAddPlayerApplicationMutation.fetcher = (client: GraphQLClient, variables: AddPlayerApplicationMutationVariables, headers?: RequestInit['headers']) => fetcher<AddPlayerApplicationMutation, AddPlayerApplicationMutationVariables>(client, AddPlayerApplicationDocument, variables, headers);
export const CreateCampaignDocument = `
    mutation createCampaign($createCampaignInput: CreateCampaignInput!) {
  createCampaign(createCampaignInput: $createCampaignInput) {
    ... on Campaign {
      id
      gmId
      title
      summary
      city
      state
    }
  }
}
    `;
export const useCreateCampaignMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCampaignMutation, TError, CreateCampaignMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCampaignMutation, TError, CreateCampaignMutationVariables, TContext>(
      ['createCampaign'],
      (variables?: CreateCampaignMutationVariables) => fetcher<CreateCampaignMutation, CreateCampaignMutationVariables>(client, CreateCampaignDocument, variables, headers)(),
      options
    );
useCreateCampaignMutation.fetcher = (client: GraphQLClient, variables: CreateCampaignMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCampaignMutation, CreateCampaignMutationVariables>(client, CreateCampaignDocument, variables, headers);
export const CreateImageSignatureDocument = `
    mutation CreateImageSignature {
  createImageSignature {
    signature
    timestamp
  }
}
    `;
export const useCreateImageSignatureMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateImageSignatureMutation, TError, CreateImageSignatureMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateImageSignatureMutation, TError, CreateImageSignatureMutationVariables, TContext>(
      ['CreateImageSignature'],
      (variables?: CreateImageSignatureMutationVariables) => fetcher<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>(client, CreateImageSignatureDocument, variables, headers)(),
      options
    );
useCreateImageSignatureMutation.fetcher = (client: GraphQLClient, variables?: CreateImageSignatureMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>(client, CreateImageSignatureDocument, variables, headers);
export const SetNotificationsReadDocument = `
    mutation SetNotificationsRead($ids: [String!]!) {
  setNotificationsRead(ids: $ids) {
    id
  }
}
    `;
export const useSetNotificationsReadMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetNotificationsReadMutation, TError, SetNotificationsReadMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetNotificationsReadMutation, TError, SetNotificationsReadMutationVariables, TContext>(
      ['SetNotificationsRead'],
      (variables?: SetNotificationsReadMutationVariables) => fetcher<SetNotificationsReadMutation, SetNotificationsReadMutationVariables>(client, SetNotificationsReadDocument, variables, headers)(),
      options
    );
useSetNotificationsReadMutation.fetcher = (client: GraphQLClient, variables: SetNotificationsReadMutationVariables, headers?: RequestInit['headers']) => fetcher<SetNotificationsReadMutation, SetNotificationsReadMutationVariables>(client, SetNotificationsReadDocument, variables, headers);
export const SignInDocument = `
    mutation SignIn($usernameOrEmail: String!, $password: String!) {
  signin(usernameOrEmail: $usernameOrEmail, password: $password) {
    ... on User {
      id
      email
      firstName
      lastName
      imageUrl
      accounts {
        provider
        providerAccountId
        type
        expiresAt
        refreshToken
        userId
      }
    }
    ... on NonExistingUserError {
      message
    }
    ... on BadCredentialsError {
      message
    }
    ... on FieldsValidationError {
      message
    }
  }
}
    `;
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['SignIn'],
      (variables?: SignInMutationVariables) => fetcher<SignInMutation, SignInMutationVariables>(client, SignInDocument, variables, headers)(),
      options
    );
useSignInMutation.fetcher = (client: GraphQLClient, variables: SignInMutationVariables, headers?: RequestInit['headers']) => fetcher<SignInMutation, SignInMutationVariables>(client, SignInDocument, variables, headers);
export const SignoutDocument = `
    mutation Signout {
  signout
}
    `;
export const useSignoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignoutMutation, TError, SignoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignoutMutation, TError, SignoutMutationVariables, TContext>(
      ['Signout'],
      (variables?: SignoutMutationVariables) => fetcher<SignoutMutation, SignoutMutationVariables>(client, SignoutDocument, variables, headers)(),
      options
    );
useSignoutMutation.fetcher = (client: GraphQLClient, variables?: SignoutMutationVariables, headers?: RequestInit['headers']) => fetcher<SignoutMutation, SignoutMutationVariables>(client, SignoutDocument, variables, headers);
export const SignUpDocument = `
    mutation SignUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signup(
    options: {firstName: $firstName, lastName: $lastName, password: $password, email: $email}
  ) {
    ... on User {
      id
      email
      firstName
      lastName
    }
    ... on ExistingUserError {
      message
    }
    ... on FieldsValidationError {
      message
    }
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['SignUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
useSignUpMutation.fetcher = (client: GraphQLClient, variables: SignUpMutationVariables, headers?: RequestInit['headers']) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers);
export const QueryDocument = `
    query Query {
  getAllNotifications {
    id
    read
    message
    type
    relatedId
    updatedAt
  }
}
    `;
export const useQueryQuery = <
      TData = QueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: QueryQueryVariables,
      options?: UseQueryOptions<QueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryQuery, TError, TData>(
      variables === undefined ? ['Query'] : ['Query', variables],
      fetcher<QueryQuery, QueryQueryVariables>(client, QueryDocument, variables, headers),
      options
    );
useQueryQuery.document = QueryDocument;


useQueryQuery.getKey = (variables?: QueryQueryVariables) => variables === undefined ? ['Query'] : ['Query', variables];
;

export const useInfiniteQueryQuery = <
      TData = QueryQuery,
      TError = unknown
    >(
      pageParamKey: keyof QueryQueryVariables,
      client: GraphQLClient,
      variables?: QueryQueryVariables,
      options?: UseInfiniteQueryOptions<QueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<QueryQuery, TError, TData>(
      variables === undefined ? ['Query.infinite'] : ['Query.infinite', variables],
      (metaData) => fetcher<QueryQuery, QueryQueryVariables>(client, QueryDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteQueryQuery.getKey = (variables?: QueryQueryVariables) => variables === undefined ? ['Query.infinite'] : ['Query.infinite', variables];
;

useQueryQuery.fetcher = (client: GraphQLClient, variables?: QueryQueryVariables, headers?: RequestInit['headers']) => fetcher<QueryQuery, QueryQueryVariables>(client, QueryDocument, variables, headers);
export const GetCampaignDocument = `
    query GetCampaign($id: String!) {
  getCampaign(id: $id) {
    id
    title
    summary
    campaignType
    city
    state
    area
    imageUrl
    isOnline
    maxSeats
    summary
    jsonSummary
    additionalDetails
    jsonAdditionalDetails
    experience
    gameSystem
    startDate
    endDate
    tags
    days
    timezone
    timePeriods
    virtualTable
    voipSystem
    memberships {
      role
      user {
        firstName
        lastName
      }
    }
    gameMaster {
      id
      firstName
      lastName
      imageUrl
    }
  }
}
    `;
export const useGetCampaignQuery = <
      TData = GetCampaignQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCampaignQueryVariables,
      options?: UseQueryOptions<GetCampaignQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCampaignQuery, TError, TData>(
      ['GetCampaign', variables],
      fetcher<GetCampaignQuery, GetCampaignQueryVariables>(client, GetCampaignDocument, variables, headers),
      options
    );
useGetCampaignQuery.document = GetCampaignDocument;


useGetCampaignQuery.getKey = (variables: GetCampaignQueryVariables) => ['GetCampaign', variables];
;

export const useInfiniteGetCampaignQuery = <
      TData = GetCampaignQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCampaignQueryVariables,
      client: GraphQLClient,
      variables: GetCampaignQueryVariables,
      options?: UseInfiniteQueryOptions<GetCampaignQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetCampaignQuery, TError, TData>(
      ['GetCampaign.infinite', variables],
      (metaData) => fetcher<GetCampaignQuery, GetCampaignQueryVariables>(client, GetCampaignDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteGetCampaignQuery.getKey = (variables: GetCampaignQueryVariables) => ['GetCampaign.infinite', variables];
;

useGetCampaignQuery.fetcher = (client: GraphQLClient, variables: GetCampaignQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCampaignQuery, GetCampaignQueryVariables>(client, GetCampaignDocument, variables, headers);
export const GetCampaignsDocument = `
    query GetCampaigns {
  getCampaigns {
    ...CampaignSnippet
  }
}
    ${CampaignSnippetFragmentDoc}`;
export const useGetCampaignsQuery = <
      TData = GetCampaignsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetCampaignsQueryVariables,
      options?: UseQueryOptions<GetCampaignsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCampaignsQuery, TError, TData>(
      variables === undefined ? ['GetCampaigns'] : ['GetCampaigns', variables],
      fetcher<GetCampaignsQuery, GetCampaignsQueryVariables>(client, GetCampaignsDocument, variables, headers),
      options
    );
useGetCampaignsQuery.document = GetCampaignsDocument;


useGetCampaignsQuery.getKey = (variables?: GetCampaignsQueryVariables) => variables === undefined ? ['GetCampaigns'] : ['GetCampaigns', variables];
;

export const useInfiniteGetCampaignsQuery = <
      TData = GetCampaignsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCampaignsQueryVariables,
      client: GraphQLClient,
      variables?: GetCampaignsQueryVariables,
      options?: UseInfiniteQueryOptions<GetCampaignsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetCampaignsQuery, TError, TData>(
      variables === undefined ? ['GetCampaigns.infinite'] : ['GetCampaigns.infinite', variables],
      (metaData) => fetcher<GetCampaignsQuery, GetCampaignsQueryVariables>(client, GetCampaignsDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteGetCampaignsQuery.getKey = (variables?: GetCampaignsQueryVariables) => variables === undefined ? ['GetCampaigns.infinite'] : ['GetCampaigns.infinite', variables];
;

useGetCampaignsQuery.fetcher = (client: GraphQLClient, variables?: GetCampaignsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCampaignsQuery, GetCampaignsQueryVariables>(client, GetCampaignsDocument, variables, headers);
export const GetUnreadNotificationsDocument = `
    query GetUnreadNotifications {
  getUnreadNotifications {
    updatedAt
    userId
    type
    relatedId
    read
    message
    id
    createdAt
  }
}
    `;
export const useGetUnreadNotificationsQuery = <
      TData = GetUnreadNotificationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUnreadNotificationsQueryVariables,
      options?: UseQueryOptions<GetUnreadNotificationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUnreadNotificationsQuery, TError, TData>(
      variables === undefined ? ['GetUnreadNotifications'] : ['GetUnreadNotifications', variables],
      fetcher<GetUnreadNotificationsQuery, GetUnreadNotificationsQueryVariables>(client, GetUnreadNotificationsDocument, variables, headers),
      options
    );
useGetUnreadNotificationsQuery.document = GetUnreadNotificationsDocument;


useGetUnreadNotificationsQuery.getKey = (variables?: GetUnreadNotificationsQueryVariables) => variables === undefined ? ['GetUnreadNotifications'] : ['GetUnreadNotifications', variables];
;

export const useInfiniteGetUnreadNotificationsQuery = <
      TData = GetUnreadNotificationsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetUnreadNotificationsQueryVariables,
      client: GraphQLClient,
      variables?: GetUnreadNotificationsQueryVariables,
      options?: UseInfiniteQueryOptions<GetUnreadNotificationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetUnreadNotificationsQuery, TError, TData>(
      variables === undefined ? ['GetUnreadNotifications.infinite'] : ['GetUnreadNotifications.infinite', variables],
      (metaData) => fetcher<GetUnreadNotificationsQuery, GetUnreadNotificationsQueryVariables>(client, GetUnreadNotificationsDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteGetUnreadNotificationsQuery.getKey = (variables?: GetUnreadNotificationsQueryVariables) => variables === undefined ? ['GetUnreadNotifications.infinite'] : ['GetUnreadNotifications.infinite', variables];
;

useGetUnreadNotificationsQuery.fetcher = (client: GraphQLClient, variables?: GetUnreadNotificationsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUnreadNotificationsQuery, GetUnreadNotificationsQueryVariables>(client, GetUnreadNotificationsDocument, variables, headers);
export const GetUserDocument = `
    query GetUser($id: String!) {
  getUser(id: $id) {
    ...UserSnippet
  }
}
    ${UserSnippetFragmentDoc}`;
export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserQuery, TError, TData>(
      ['GetUser', variables],
      fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
      options
    );
useGetUserQuery.document = GetUserDocument;


useGetUserQuery.getKey = (variables: GetUserQueryVariables) => ['GetUser', variables];
;

export const useInfiniteGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetUserQueryVariables,
      client: GraphQLClient,
      variables: GetUserQueryVariables,
      options?: UseInfiniteQueryOptions<GetUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetUserQuery, TError, TData>(
      ['GetUser.infinite', variables],
      (metaData) => fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteGetUserQuery.getKey = (variables: GetUserQueryVariables) => ['GetUser.infinite', variables];
;

useGetUserQuery.fetcher = (client: GraphQLClient, variables: GetUserQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers);
export const GetUserCampaignDocument = `
    query GetUserCampaign {
  getUserCampaign {
    ...CampaignSnippet
  }
}
    ${CampaignSnippetFragmentDoc}`;
export const useGetUserCampaignQuery = <
      TData = GetUserCampaignQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUserCampaignQueryVariables,
      options?: UseQueryOptions<GetUserCampaignQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserCampaignQuery, TError, TData>(
      variables === undefined ? ['GetUserCampaign'] : ['GetUserCampaign', variables],
      fetcher<GetUserCampaignQuery, GetUserCampaignQueryVariables>(client, GetUserCampaignDocument, variables, headers),
      options
    );
useGetUserCampaignQuery.document = GetUserCampaignDocument;


useGetUserCampaignQuery.getKey = (variables?: GetUserCampaignQueryVariables) => variables === undefined ? ['GetUserCampaign'] : ['GetUserCampaign', variables];
;

export const useInfiniteGetUserCampaignQuery = <
      TData = GetUserCampaignQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetUserCampaignQueryVariables,
      client: GraphQLClient,
      variables?: GetUserCampaignQueryVariables,
      options?: UseInfiniteQueryOptions<GetUserCampaignQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetUserCampaignQuery, TError, TData>(
      variables === undefined ? ['GetUserCampaign.infinite'] : ['GetUserCampaign.infinite', variables],
      (metaData) => fetcher<GetUserCampaignQuery, GetUserCampaignQueryVariables>(client, GetUserCampaignDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteGetUserCampaignQuery.getKey = (variables?: GetUserCampaignQueryVariables) => variables === undefined ? ['GetUserCampaign.infinite'] : ['GetUserCampaign.infinite', variables];
;

useGetUserCampaignQuery.fetcher = (client: GraphQLClient, variables?: GetUserCampaignQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUserCampaignQuery, GetUserCampaignQueryVariables>(client, GetUserCampaignDocument, variables, headers);
export const GetUsersDocument = `
    query GetUsers($limit: Float!, $cursor: String, $filter: String) {
  getUsers(limit: $limit, cursor: $cursor, filter: $filter) {
    users {
      ...UserSnippet
    }
    cursor
    hasNextPage
  }
}
    ${UserSnippetFragmentDoc}`;
export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers),
      options
    );
useGetUsersQuery.document = GetUsersDocument;


useGetUsersQuery.getKey = (variables: GetUsersQueryVariables) => ['GetUsers', variables];
;

export const useInfiniteGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetUsersQueryVariables,
      client: GraphQLClient,
      variables: GetUsersQueryVariables,
      options?: UseInfiniteQueryOptions<GetUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetUsersQuery, TError, TData>(
      ['GetUsers.infinite', variables],
      (metaData) => fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, {...variables, ...(metaData.pageParam ? {[pageParamKey]: metaData.pageParam} : {})}, headers)(),
      options
    );


useInfiniteGetUsersQuery.getKey = (variables: GetUsersQueryVariables) => ['GetUsers.infinite', variables];
;

useGetUsersQuery.fetcher = (client: GraphQLClient, variables: GetUsersQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers);
export const NewCampaignApplicationDocument = `
    subscription NewCampaignApplication {
  newCampaignApplication {
    campaignId
    gameMasterId
    notificationId
    message
    type
    read
    updatedAt
    createdAt
    relatedId
  }
}
    `;