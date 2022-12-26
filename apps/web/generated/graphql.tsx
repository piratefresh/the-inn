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
  Cursor: any;
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
  isActive: Scalars['Boolean'];
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
  deactivateCampaign: Scalars['Boolean'];
  deleteCampaign: Scalars['Boolean'];
  setNotificationsRead: Array<Notification>;
  signin: AuthResult;
  signout: Scalars['Boolean'];
  signup: CreateUserResult;
  updateCampaign: CreateCampaignResult;
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


export type MutationDeactivateCampaignArgs = {
  campaignId: Scalars['String'];
};


export type MutationDeleteCampaignArgs = {
  campaignId: Scalars['String'];
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


export type MutationUpdateCampaignArgs = {
  campaignId: Scalars['String'];
  createCampaignInput: CreateCampaignInput;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

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
  getApplicationCampaign: Array<Application>;
  getCampaign: Campaign;
  getCampaigns: Array<Campaign>;
  getCampaignsPagination: CampaignPagination;
  getOnlineUsers: Array<User>;
  getUnreadNotifications: Array<Notification>;
  getUser: User;
  getUserCampaign: Array<Campaign>;
  getUserPrivateMessages: Array<PrivateMessage>;
  getUsers: UserConnection;
  getUsersById: Array<User>;
  hellogame: Scalars['String'];
  helloworld: Scalars['String'];
  me: Scalars['String'];
};


export type QueryGetApplicationCampaignArgs = {
  campaignId: Scalars['String'];
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
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
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

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /**
   *
   *       Represents this location in the query use it in `before` and `after` args
   *       to query before and after this location.
   */
  cursor: Scalars['Cursor'];
  /** The data of the record that goes along with this edge. */
  node: User;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type CampaignFullFragment = { __typename?: 'Campaign', id: string, createdAt: any, updatedAt: any, title: string, summary: string, jsonSummary: string, additionalDetails?: string | null, jsonAdditionalDetails?: string | null, note?: string | null, imageUrl: string, isOnline: boolean, campaignType: string, city?: string | null, state?: string | null, area?: string | null, lat?: number | null, lng?: number | null, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, timezone: string, gmId: string, experience: Experience, voipSystem?: string | null, gameSystem: string, virtualTable?: string | null, maxSeats: number, isActive: boolean, puzzles: Difficulty, combat: Difficulty, roleplay: Difficulty, tags: Array<string>, price?: number | null, gallery: Array<string> };

export type CampaignSnippetFragment = { __typename?: 'Campaign', id: string, title: string, summary: string, city?: string | null, state?: string | null, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, createdAt: any, updatedAt: any, tags: Array<string>, maxSeats: number, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, imageUrl?: string | null } }> };

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

export type DeactivateCampaignMutationVariables = Exact<{
  campaignId: Scalars['String'];
}>;


export type DeactivateCampaignMutation = { __typename?: 'Mutation', deactivateCampaign: boolean };

export type DeleteCampaignMutationVariables = Exact<{
  campaignId: Scalars['String'];
}>;


export type DeleteCampaignMutation = { __typename?: 'Mutation', deleteCampaign: boolean };

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

export type UpdateCampaignMutationVariables = Exact<{
  campaignId: Scalars['String'];
  createCampaignInput: CreateCampaignInput;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'Campaign', id: string } | { __typename?: 'FieldsValidationError' } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getAllNotifications: Array<{ __typename?: 'Notification', id: string, read: boolean, message: string, type: NotificationType, relatedId: string, updatedAt: any }> };

export type GetApplicationCampaignQueryVariables = Exact<{
  campaignId: Scalars['String'];
}>;


export type GetApplicationCampaignQuery = { __typename?: 'Query', getApplicationCampaign: Array<{ __typename?: 'Application', campaignId: string, days: Array<string>, experience: Experience, fitsSchedule: boolean, id: string, jsonMessage: string, message: string, timePeriods: Array<string>, userId: string, membership: { __typename?: 'Membership', user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imageUrl?: string | null } } }> };

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', getCampaign: { __typename?: 'Campaign', id: string, createdAt: any, updatedAt: any, title: string, summary: string, jsonSummary: string, additionalDetails?: string | null, jsonAdditionalDetails?: string | null, note?: string | null, imageUrl: string, isOnline: boolean, campaignType: string, city?: string | null, state?: string | null, area?: string | null, lat?: number | null, lng?: number | null, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, timezone: string, gmId: string, experience: Experience, voipSystem?: string | null, gameSystem: string, virtualTable?: string | null, maxSeats: number, isActive: boolean, puzzles: Difficulty, combat: Difficulty, roleplay: Difficulty, tags: Array<string>, price?: number | null, gallery: Array<string>, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string } }>, gameMaster: { __typename?: 'User', id: string, firstName: string, lastName: string, imageUrl?: string | null } } };

export type GetCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCampaignsQuery = { __typename?: 'Query', getCampaigns: Array<{ __typename?: 'Campaign', id: string, title: string, summary: string, city?: string | null, state?: string | null, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, createdAt: any, updatedAt: any, tags: Array<string>, maxSeats: number, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, imageUrl?: string | null } }> }> };

export type GetUnreadNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationsQuery = { __typename?: 'Query', getUnreadNotifications: Array<{ __typename?: 'Notification', updatedAt: any, userId: string, type: NotificationType, relatedId: string, read: boolean, message: string, id: string, createdAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imageUrl?: string | null } };

export type GetUserCampaignQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCampaignQuery = { __typename?: 'Query', getUserCampaign: Array<{ __typename?: 'Campaign', id: string, title: string, summary: string, city?: string | null, state?: string | null, imageUrl: string, jsonSummary: string, gameSystem: string, startDate: any, endDate?: any | null, days: Array<string>, timePeriods: Array<string>, createdAt: any, updatedAt: any, tags: Array<string>, maxSeats: number, memberships: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', firstName: string, lastName: string, imageUrl?: string | null } }> }> };

export type GetUsersQueryVariables = Exact<{
  last?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename: 'UserConnection', edges: Array<{ __typename: 'UserEdge', cursor: any, node: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, aboutMe?: string | null, imageUrl?: string | null, createdAt: any, memberships: Array<{ __typename?: 'Membership', campaignId: string }> } }>, pageInfo: { __typename: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type NewCampaignApplicationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCampaignApplicationSubscription = { __typename?: 'Subscription', newCampaignApplication: { __typename?: 'NewCampaignNotification', campaignId: string, gameMasterId: string, notificationId: string, message: string, type: string, read: boolean, updatedAt: string, createdAt: string, relatedId: string } };

export const CampaignFullFragmentDoc = gql`
    fragment CampaignFull on Campaign {
  id
  createdAt
  updatedAt
  title
  summary
  jsonSummary
  additionalDetails
  jsonAdditionalDetails
  note
  imageUrl
  isOnline
  campaignType
  city
  state
  area
  lat
  lng
  startDate
  endDate
  days
  timePeriods
  timezone
  gmId
  experience
  voipSystem
  gameSystem
  virtualTable
  maxSeats
  isActive
  puzzles
  combat
  roleplay
  tags
  price
  gallery
}
    `;
export const CampaignSnippetFragmentDoc = gql`
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
  createdAt
  updatedAt
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
export const UserSnippetFragmentDoc = gql`
    fragment UserSnippet on User {
  id
  firstName
  lastName
  email
  imageUrl
}
    `;
export const AddPlayerApplicationDocument = gql`
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

export function useAddPlayerApplicationMutation() {
  return Urql.useMutation<AddPlayerApplicationMutation, AddPlayerApplicationMutationVariables>(AddPlayerApplicationDocument);
};
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
export const DeactivateCampaignDocument = gql`
    mutation DeactivateCampaign($campaignId: String!) {
  deactivateCampaign(campaignId: $campaignId)
}
    `;

export function useDeactivateCampaignMutation() {
  return Urql.useMutation<DeactivateCampaignMutation, DeactivateCampaignMutationVariables>(DeactivateCampaignDocument);
};
export const DeleteCampaignDocument = gql`
    mutation DeleteCampaign($campaignId: String!) {
  deleteCampaign(campaignId: $campaignId)
}
    `;

export function useDeleteCampaignMutation() {
  return Urql.useMutation<DeleteCampaignMutation, DeleteCampaignMutationVariables>(DeleteCampaignDocument);
};
export const SetNotificationsReadDocument = gql`
    mutation SetNotificationsRead($ids: [String!]!) {
  setNotificationsRead(ids: $ids) {
    id
  }
}
    `;

export function useSetNotificationsReadMutation() {
  return Urql.useMutation<SetNotificationsReadMutation, SetNotificationsReadMutationVariables>(SetNotificationsReadDocument);
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
export const SignoutDocument = gql`
    mutation Signout {
  signout
}
    `;

export function useSignoutMutation() {
  return Urql.useMutation<SignoutMutation, SignoutMutationVariables>(SignoutDocument);
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
export const UpdateCampaignDocument = gql`
    mutation UpdateCampaign($campaignId: String!, $createCampaignInput: CreateCampaignInput!) {
  updateCampaign(
    campaignId: $campaignId
    createCampaignInput: $createCampaignInput
  ) {
    ... on Campaign {
      id
    }
  }
}
    `;

export function useUpdateCampaignMutation() {
  return Urql.useMutation<UpdateCampaignMutation, UpdateCampaignMutationVariables>(UpdateCampaignDocument);
};
export const QueryDocument = gql`
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

export function useQueryQuery(options?: Omit<Urql.UseQueryArgs<QueryQueryVariables>, 'query'>) {
  return Urql.useQuery<QueryQuery, QueryQueryVariables>({ query: QueryDocument, ...options });
};
export const GetApplicationCampaignDocument = gql`
    query GetApplicationCampaign($campaignId: String!) {
  getApplicationCampaign(campaignId: $campaignId) {
    campaignId
    days
    experience
    fitsSchedule
    id
    jsonMessage
    message
    timePeriods
    userId
    membership {
      user {
        ...UserSnippet
      }
    }
  }
}
    ${UserSnippetFragmentDoc}`;

export function useGetApplicationCampaignQuery(options: Omit<Urql.UseQueryArgs<GetApplicationCampaignQueryVariables>, 'query'>) {
  return Urql.useQuery<GetApplicationCampaignQuery, GetApplicationCampaignQueryVariables>({ query: GetApplicationCampaignDocument, ...options });
};
export const GetCampaignDocument = gql`
    query GetCampaign($id: String!) {
  getCampaign(id: $id) {
    ...CampaignFull
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
    ${CampaignFullFragmentDoc}`;

export function useGetCampaignQuery(options: Omit<Urql.UseQueryArgs<GetCampaignQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCampaignQuery, GetCampaignQueryVariables>({ query: GetCampaignDocument, ...options });
};
export const GetCampaignsDocument = gql`
    query GetCampaigns {
  getCampaigns {
    ...CampaignSnippet
  }
}
    ${CampaignSnippetFragmentDoc}`;

export function useGetCampaignsQuery(options?: Omit<Urql.UseQueryArgs<GetCampaignsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCampaignsQuery, GetCampaignsQueryVariables>({ query: GetCampaignsDocument, ...options });
};
export const GetUnreadNotificationsDocument = gql`
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

export function useGetUnreadNotificationsQuery(options?: Omit<Urql.UseQueryArgs<GetUnreadNotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUnreadNotificationsQuery, GetUnreadNotificationsQueryVariables>({ query: GetUnreadNotificationsDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    ...UserSnippet
  }
}
    ${UserSnippetFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};
export const GetUserCampaignDocument = gql`
    query GetUserCampaign {
  getUserCampaign {
    ...CampaignSnippet
  }
}
    ${CampaignSnippetFragmentDoc}`;

export function useGetUserCampaignQuery(options?: Omit<Urql.UseQueryArgs<GetUserCampaignQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserCampaignQuery, GetUserCampaignQueryVariables>({ query: GetUserCampaignDocument, ...options });
};
export const GetUsersDocument = gql`
    query GetUsers($last: Int, $first: Int, $before: String, $after: String, $skip: Int) {
  getUsers(
    last: $last
    first: $first
    before: $before
    after: $after
    skip: $skip
  ) {
    __typename
    edges {
      __typename
      cursor
      node {
        id
        firstName
        lastName
        email
        aboutMe
        imageUrl
        createdAt
        memberships {
          campaignId
        }
      }
    }
    pageInfo {
      __typename
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    `;

export function useGetUsersQuery(options?: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
};
export const NewCampaignApplicationDocument = gql`
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

export function useNewCampaignApplicationSubscription<TData = NewCampaignApplicationSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewCampaignApplicationSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewCampaignApplicationSubscription, TData>) {
  return Urql.useSubscription<NewCampaignApplicationSubscription, TData, NewCampaignApplicationSubscriptionVariables>({ query: NewCampaignApplicationDocument, ...options }, handler);
};