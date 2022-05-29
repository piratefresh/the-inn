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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  id_token?: Maybe<Scalars['String']>;
  oauth_token?: Maybe<Scalars['String']>;
  oauth_token_secret?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  session_state?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type AddPlayerCampaignInput = {
  campaignId: Scalars['String'];
  playerIds: Array<Scalars['String']>;
};

export type AuthResult = BadCredentialsError | FieldsValidationError | NonExistingUserError | User;

export type BadCredentialsError = IError & {
  __typename?: 'BadCredentialsError';
  message: Scalars['String'];
};

export type Campaign = {
  __typename?: 'Campaign';
  additional_details?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  combat: Difficulty;
  createdAt: Scalars['DateTime'];
  days: Array<Scalars['String']>;
  endDate: Scalars['DateTime'];
  experiance: Experiance;
  game_master: User;
  game_system: Scalars['String'];
  geolocation_lat?: Maybe<Scalars['Float']>;
  geolocation_lng?: Maybe<Scalars['Float']>;
  gmId: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  isOnline: Scalars['Boolean'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  max_seats: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  players: Array<Player>;
  price?: Maybe<Scalars['Float']>;
  puzzles: Difficulty;
  roleplay: Difficulty;
  startDate: Scalars['DateTime'];
  state: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  time_periods: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  voip_system?: Maybe<Scalars['String']>;
};

export type CreateCampaignInput = {
  city: Scalars['String'];
  combat: Difficulty;
  days: Array<Scalars['String']>;
  endDate: Scalars['DateTime'];
  experiance: Experiance;
  game_system: Scalars['String'];
  image: Scalars['String'];
  isOnline: Scalars['Boolean'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  max_seats: Scalars['Float'];
  price: Scalars['Float'];
  puzzles: Difficulty;
  roleplay: Difficulty;
  startDate: Scalars['DateTime'];
  state: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  time_periods: Array<Scalars['String']>;
  title: Scalars['String'];
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

export enum Experiance {
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

export type Mutation = {
  __typename?: 'Mutation';
  addCampaignPlayer: CreateCampaignResult;
  createCampaign: CreateCampaignResult;
  createImageSignature: ImageSignature;
  createReview: CreateReviewResult;
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

export type Player = {
  __typename?: 'Player';
  campaign: Campaign;
  campaignId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCampaign: Campaign;
  getCampaigns: Array<Campaign>;
  getUser: Array<User>;
  getUsers: Array<User>;
  getUsersById: Array<User>;
  hellogame: Scalars['String'];
  helloworld: Scalars['String'];
};


export type QueryGetCampaignArgs = {
  id: Scalars['String'];
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

export type User = {
  __typename?: 'User';
  Hosted: Array<Campaign>;
  accounts: Array<Account>;
  createdAt: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  experience: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  players: Array<Player>;
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

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = { __typename?: 'Mutation', createImageSignature: { __typename?: 'ImageSignature', signature: string, timestamp: number } };

export type SignInMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signin: { __typename?: 'BadCredentialsError', message: string } | { __typename?: 'FieldsValidationError', message: string } | { __typename?: 'NonExistingUserError', message: string } | { __typename?: 'User', id: string, email?: string | null, firstName: string, lastName: string, image?: string | null } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'ExistingUserError', message: string } | { __typename?: 'FieldsValidationError', message: string } | { __typename?: 'User', id: string, email?: string | null, firstName: string, lastName: string } };


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
export const SignInDocument = gql`
    mutation SignIn($usernameOrEmail: String!, $password: String!) {
  signin(usernameOrEmail: $usernameOrEmail, password: $password) {
    ... on User {
      id
      email
      firstName
      lastName
      image
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