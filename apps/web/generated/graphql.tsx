import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type AuthResult = BadCredentialsError | FieldsValidationError | NonExistingUserError | User;

export type BadCredentialsError = IError & {
  __typename?: 'BadCredentialsError';
  message: Scalars['String'];
};

export type Campaign = {
  __typename?: 'Campaign';
  additionalDetails?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  combat: Difficulty;
  createdAt: Scalars['DateTime'];
  days: Array<Scalars['String']>;
  endDate: Scalars['DateTime'];
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
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  maxSeats: Scalars['Int'];
  memberships: Array<Membership>;
  note?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  puzzles: Difficulty;
  roleplay: Difficulty;
  startDate: Scalars['DateTime'];
  state: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  timePeriods: Array<Scalars['String']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  voipSystem?: Maybe<Scalars['String']>;
};

export type CampaignPagination = {
  __typename?: 'CampaignPagination';
  campaigns: Array<Campaign>;
  cursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type CreateCampaignInput = {
  additionalDetails: Scalars['String'];
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
  price: Scalars['Float'];
  puzzles: Difficulty;
  roleplay: Difficulty;
  startDate: Scalars['DateTime'];
  state?: InputMaybe<Scalars['String']>;
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  timePeriods: Array<Scalars['String']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  virtualTable: Scalars['String'];
  voipSystem: Scalars['String'];
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
  campaign: Campaign;
  campaignId: Scalars['String'];
  role: MembershipRole;
  user: User;
  userId: Scalars['String'];
};

export enum MembershipRole {
  Gm = 'GM',
  Player = 'PLAYER'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCampaignPlayer: CreateCampaignResult;
  createCampaign: CreateCampaignResult;
  createImageSignature: ImageSignature;
  createReview: CreateReviewResult;
  exchangeToken: AuthResult;
  signin: AuthResult;
  signup: CreateUserResult;
};


export type MutationAddCampaignPlayerArgs = {
  AddPlayerCampaignInput: AddPlayerCampaignInput;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationExchangeTokenArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationSigninArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationSignupArgs = {
  options: UsernamePasswordInput;
};

export type NonExistingUserError = IError & {
  __typename?: 'NonExistingUserError';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCampaign: Campaign;
  getCampaigns: Array<Campaign>;
  getCampaignsPagination: CampaignPagination;
  getUser: User;
  getUsers: Array<User>;
  getUsersById: Array<User>;
  hellogame: Scalars['String'];
  helloworld: Scalars['String'];
};


export type QueryGetCampaignArgs = {
  id: Scalars['String'];
};


export type QueryGetCampaignsPaginationArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersByIdArgs = {
  playerIds: Array<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  rating: Scalars['Int'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  expires: Scalars['DateTime'];
  id: Scalars['ID'];
  session_token: Scalars['String'];
  user: User;
  user_id: Scalars['String'];
};

export enum StatusType {
  Dnd = 'DND',
  Idle = 'IDLE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type User = {
  __typename?: 'User';
  Hosted: Array<Campaign>;
  accounts: Array<Account>;
  createdAt: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  experience: Experience;
  facebook?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  memberships: Array<Membership>;
  password: Scalars['String'];
  reviews: Array<Review>;
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

export type CreateCampaignMutationVariables = Exact<{
  createCampaignInput: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', id: string, gmId: string, title: string, summary: string, city: string, state: string } | { __typename?: 'FieldsValidationError' } };

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = { __typename?: 'Mutation', createImageSignature: { __typename?: 'ImageSignature', signature: string, timestamp: number } };

export type ExchangeTokenMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type ExchangeTokenMutation = { __typename?: 'Mutation', exchangeToken: { __typename?: 'BadCredentialsError' } | { __typename?: 'FieldsValidationError' } | { __typename?: 'NonExistingUserError' } | { __typename?: 'User', id: string, email?: string | null, firstName: string, lastName: string, imageUrl?: string | null, accounts: Array<{ __typename?: 'Account', refreshToken?: string | null, expiresAt?: number | null }> } };

export type SignInMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signin: { __typename?: 'BadCredentialsError', message: string } | { __typename?: 'FieldsValidationError', message: string } | { __typename?: 'NonExistingUserError', message: string } | { __typename?: 'User', id: string, email?: string | null, firstName: string, lastName: string, imageUrl?: string | null, accounts: Array<{ __typename?: 'Account', provider: string, providerAccountId: string, type: string, expiresAt?: number | null, refreshToken?: string | null, userId: string }> } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'ExistingUserError', message: string } | { __typename?: 'FieldsValidationError', message: string } | { __typename?: 'User', id: string, email?: string | null, firstName: string, lastName: string } };

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', getCampaign: { __typename?: 'Campaign', id: string, title: string, summary: string, city: string, state: string, imageUrl: string, isOnline: boolean, maxSeats: number, jsonSummary: string, additionalDetails?: string | null, jsonAdditionalDetails?: string | null, gameSystem: string, startDate: any, endDate: any, tags: Array<string>, days: Array<string>, timezone: string, timePeriods: Array<string>, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string } }>, gameMaster: { __typename?: 'User', id: string, firstName: string, lastName: string, imageUrl?: string | null } } };

export type GetCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCampaignsQuery = { __typename?: 'Query', getCampaigns: Array<{ __typename?: 'Campaign', id: string, title: string, summary: string, city: string, state: string, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate: any, tags: Array<string> }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email?: string | null } };


export const CreateCampaignDocument = gql`
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

export function useCreateCampaignMutation() {
  return Urql.useMutation<CreateCampaignMutation, CreateCampaignMutationVariables>(CreateCampaignDocument);
};
export const CreateImageSignatureDocument = gql`
    mutation CreateImageSignature {
  createImageSignature {
    signature
    timestamp
  }
}
    `;

export function useCreateImageSignatureMutation() {
  return Urql.useMutation<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>(CreateImageSignatureDocument);
};
export const ExchangeTokenDocument = gql`
    mutation ExchangeToken($usernameOrEmail: String!, $password: String!) {
  exchangeToken(usernameOrEmail: $usernameOrEmail, password: $password) {
    ... on User {
      id
      email
      firstName
      lastName
      imageUrl
      accounts {
        refreshToken
        expiresAt
      }
    }
  }
}
    `;

export function useExchangeTokenMutation() {
  return Urql.useMutation<ExchangeTokenMutation, ExchangeTokenMutationVariables>(ExchangeTokenDocument);
};
export const SignInDocument = gql`
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

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignUpDocument = gql`
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

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export const GetCampaignDocument = gql`
    query GetCampaign($id: String!) {
  getCampaign(id: $id) {
    id
    title
    summary
    city
    state
    imageUrl
    isOnline
    maxSeats
    summary
    jsonSummary
    additionalDetails
    jsonAdditionalDetails
    gameSystem
    startDate
    endDate
    tags
    days
    timezone
    timePeriods
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

export function useGetCampaignQuery(options: Omit<Urql.UseQueryArgs<GetCampaignQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCampaignQuery, GetCampaignQueryVariables>({ query: GetCampaignDocument, ...options });
};
export const GetCampaignsDocument = gql`
    query GetCampaigns {
  getCampaigns {
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
    tags
  }
}
    `;

export function useGetCampaignsQuery(options?: Omit<Urql.UseQueryArgs<GetCampaignsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCampaignsQuery, GetCampaignsQueryVariables>({ query: GetCampaignsDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    id
    firstName
    lastName
    email
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};