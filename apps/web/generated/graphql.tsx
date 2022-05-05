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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['Float'];
  childComments?: Maybe<Comment>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  listing: Listing;
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['ID']>;
  points: Scalars['Float'];
  post: Post;
  postId: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentInput = {
  parentCommentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['Int'];
  text: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  admin: User;
  adminId: Scalars['Float'];
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  messages?: Maybe<Array<Message>>;
  participants: Array<User>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type CreateConversationInput = {
  body: Scalars['String'];
  receiverId: Scalars['Int'];
};

export type CreateMessageInput = {
  body: Scalars['String'];
  conversationId: Scalars['Float'];
  receiverId: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Int'];
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  author: User;
  authorId: Scalars['Float'];
  authorized: Scalars['Boolean'];
  bookings: Array<Scalars['Float']>;
  city: Scalars['String'];
  createdAt: Scalars['String'];
  days: Array<Scalars['String']>;
  description: Scalars['String'];
  extraNote: Scalars['String'];
  gameSystem: Scalars['String'];
  id: Scalars['Float'];
  imageUrl: Scalars['String'];
  isOnline: Scalars['Boolean'];
  jsonDescription?: Maybe<Scalars['JSON']>;
  jsonExtraNote?: Maybe<Scalars['JSON']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  maxPartySize: Scalars['Float'];
  postalCode: Scalars['Float'];
  price: Scalars['Float'];
  recommendedSkillLevel: Scalars['String'];
  requirements: Array<Scalars['String']>;
  state: Scalars['String'];
  tags: Array<Scalars['String']>;
  times: Array<Scalars['String']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  virtualTable: Scalars['String'];
  voipSystem: Scalars['String'];
};

export type ListingInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  days: Array<Scalars['String']>;
  description: Scalars['String'];
  extraNote?: InputMaybe<Scalars['String']>;
  gameSystem: Scalars['String'];
  imageUrl: Scalars['String'];
  isOnline: Scalars['Boolean'];
  jsonDescription?: InputMaybe<Scalars['JSON']>;
  jsonExtraNote?: InputMaybe<Scalars['JSON']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  maxPartySize: Scalars['Int'];
  postalCode?: InputMaybe<Scalars['Float']>;
  recommendedSkillLevel: Scalars['String'];
  requirements: Array<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  times: Array<Scalars['String']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  virtualTable?: InputMaybe<Scalars['String']>;
  voipSystem?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  conversationId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  readTime?: Maybe<Scalars['DateTime']>;
  receiverId: Scalars['Float'];
  sender: User;
  senderId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createComment: Comment;
  createConversation: Conversation;
  createImageSignature: ImageSignature;
  createListing: Listing;
  createMessage: Message;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
  voteComment: Scalars['Boolean'];
  votePost: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateListingArgs = {
  input: ListingInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationVoteCommentArgs = {
  commentId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationVotePostArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type PaginatedListings = {
  __typename?: 'PaginatedListings';
  hasMore: Scalars['Boolean'];
  listings: Array<Listing>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  views: Scalars['Float'];
};

export type PostInput = {
  image?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Comment>;
  getConversations: Array<Conversation>;
  getListings: PaginatedListings;
  getMessages: Array<Message>;
  getUnreadCount: Scalars['Float'];
  getUsers?: Maybe<SearchUserResponse>;
  hello: Scalars['String'];
  hollaYee: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
};


export type QueryGetCommentsArgs = {
  postId: Scalars['Int'];
};


export type QueryGetListingsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetMessagesArgs = {
  conversationId: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  searchTerm: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type SearchUserResponse = {
  __typename?: 'SearchUserResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessageReceived: Message;
  newStuff: Scalars['String'];
  newUnreadMessage: Scalars['Float'];
  updatedConversations: Conversation;
  welcome: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CommentSnippetFragment = { __typename?: 'Comment', id: number, createdAt: string, updatedAt: string, text: string, points: number, authorId: number, parentCommentId?: string | null, post: { __typename?: 'Post', id: number, title: string, text: string }, author: { __typename?: 'User', id: number, username: string } };

export type ConversationSnippetFragment = { __typename?: 'Conversation', id: number, updatedAt: any, createdAt: any, messages?: Array<{ __typename?: 'Message', id: number, body: string, updatedAt: any, sender: { __typename?: 'User', id: number, username: string } }> | null, participants: Array<{ __typename?: 'User', id: number, username: string }> };

export type ListingSnippetFragment = { __typename?: 'Listing', id: number, title: string, description: string, imageUrl: string, city: string, state: string, author: { __typename?: 'User', id: number, username: string, email: string } };

export type PostSnippetFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, text: string, views: number, image?: string | null, author: { __typename?: 'User', id: number, username: string, email: string } };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type CreateCommentMutationVariables = Exact<{
  input: CommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, createdAt: string, updatedAt: string, text: string, points: number, authorId: number, parentCommentId?: string | null, post: { __typename?: 'Post', id: number, title: string, text: string }, author: { __typename?: 'User', id: number, username: string } } };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', id: number, updatedAt: any, createdAt: any, messages?: Array<{ __typename?: 'Message', id: number, body: string, updatedAt: any, sender: { __typename?: 'User', id: number, username: string } }> | null, participants: Array<{ __typename?: 'User', id: number, username: string }> } };

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = { __typename?: 'Mutation', createImageSignature: { __typename?: 'ImageSignature', signature: string, timestamp: number } };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', conversationId: number, body: string, id: number, sender: { __typename?: 'User', id: number, username: string } } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, authorId: number } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type CreateListingMutationVariables = Exact<{
  input: ListingInput;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing: { __typename?: 'Listing', id: number, description: string, title: string } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type VotePostMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VotePostMutation = { __typename?: 'Mutation', votePost: boolean };

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', text: string, id: number, parentCommentId?: string | null, updatedAt: string, post: { __typename?: 'Post', title: string, text: string }, author: { __typename?: 'User', username: string } }> };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename?: 'Conversation', id: number, updatedAt: any, createdAt: any, messages?: Array<{ __typename?: 'Message', id: number, body: string, updatedAt: any, sender: { __typename?: 'User', id: number, username: string } }> | null, participants: Array<{ __typename?: 'User', id: number, username: string }> }> };

export type GetListingsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetListingsQuery = { __typename?: 'Query', getListings: { __typename?: 'PaginatedListings', hasMore: boolean, listings: Array<{ __typename?: 'Listing', id: number, title: string, description: string, imageUrl: string, city: string, state: string, author: { __typename?: 'User', id: number, username: string, email: string } }> } };

export type GetMessagesQueryVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', conversationId: number, body: string, createdAt: any, updatedAt: any, readTime?: any | null, id: number, sender: { __typename?: 'User', id: number, username: string } }> };

export type GetUnreadCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadCountQuery = { __typename?: 'Query', getUnreadCount: number };

export type GetUsersQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: { __typename?: 'SearchUserResponse', users?: Array<{ __typename?: 'User', id: number, username: string }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, text: string, views: number, image?: string | null, author: { __typename?: 'User', id: number, username: string, email: string } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, text: string, views: number, image?: string | null, author: { __typename?: 'User', id: number, username: string, email: string } }> } };

export type NewMessageReceivedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageReceivedSubscription = { __typename?: 'Subscription', newMessageReceived: { __typename?: 'Message', conversationId: number, body: string, updatedAt: any, createdAt: any, id: number, sender: { __typename?: 'User', id: number, username: string } } };

export type NewUnreadMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewUnreadMessageSubscription = { __typename?: 'Subscription', newUnreadMessage: number };

export type UpdatedConversationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdatedConversationsSubscription = { __typename?: 'Subscription', updatedConversations: { __typename?: 'Conversation', id: number, updatedAt: any, createdAt: any, messages?: Array<{ __typename?: 'Message', id: number, body: string, updatedAt: any, sender: { __typename?: 'User', id: number, username: string } }> | null, participants: Array<{ __typename?: 'User', id: number, username: string }> } };

export const CommentSnippetFragmentDoc = gql`
    fragment CommentSnippet on Comment {
  id
  createdAt
  updatedAt
  text
  points
  authorId
  parentCommentId
  post {
    id
    title
    text
  }
  author {
    id
    username
  }
}
    `;
export const ConversationSnippetFragmentDoc = gql`
    fragment ConversationSnippet on Conversation {
  id
  updatedAt
  createdAt
  messages {
    id
    body
    sender {
      id
      username
    }
    updatedAt
  }
  participants {
    id
    username
  }
}
    `;
export const ListingSnippetFragmentDoc = gql`
    fragment ListingSnippet on Listing {
  id
  title
  description
  imageUrl
  city
  state
  author {
    id
    username
    email
  }
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  points
  textSnippet
  text
  views
  image
  author {
    id
    username
    email
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCommentDocument = gql`
    mutation createComment($input: CommentInput!) {
  createComment(input: $input) {
    ...CommentSnippet
  }
}
    ${CommentSnippetFragmentDoc}`;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateConversationDocument = gql`
    mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useCreateConversationMutation() {
  return Urql.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument);
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
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    conversationId
    body
    sender {
      id
      username
    }
    id
  }
}
    `;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    updatedAt
    title
    text
    points
    authorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const CreateListingDocument = gql`
    mutation CreateListing($input: ListingInput!) {
  createListing(input: $input) {
    id
    description
    title
  }
}
    `;

export function useCreateListingMutation() {
  return Urql.useMutation<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VotePostDocument = gql`
    mutation VotePost($value: Int!, $postId: Int!) {
  votePost(value: $value, postId: $postId)
}
    `;

export function useVotePostMutation() {
  return Urql.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument);
};
export const GetCommentsDocument = gql`
    query GetComments($postId: Int!) {
  getComments(postId: $postId) {
    text
    id
    parentCommentId
    updatedAt
    post {
      title
      text
    }
    author {
      username
    }
  }
}
    `;

export function useGetCommentsQuery(options: Omit<Urql.UseQueryArgs<GetCommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCommentsQuery>({ query: GetCommentsDocument, ...options });
};
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useGetConversationsQuery(options?: Omit<Urql.UseQueryArgs<GetConversationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetConversationsQuery>({ query: GetConversationsDocument, ...options });
};
export const GetListingsDocument = gql`
    query GetListings($limit: Int!, $cursor: String) {
  getListings(limit: $limit, cursor: $cursor) {
    hasMore
    listings {
      ...ListingSnippet
    }
  }
}
    ${ListingSnippetFragmentDoc}`;

export function useGetListingsQuery(options: Omit<Urql.UseQueryArgs<GetListingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetListingsQuery>({ query: GetListingsDocument, ...options });
};
export const GetMessagesDocument = gql`
    query GetMessages($conversationId: Int!) {
  getMessages(conversationId: $conversationId) {
    conversationId
    body
    createdAt
    updatedAt
    readTime
    sender {
      id
      username
    }
    id
  }
}
    `;

export function useGetMessagesQuery(options: Omit<Urql.UseQueryArgs<GetMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMessagesQuery>({ query: GetMessagesDocument, ...options });
};
export const GetUnreadCountDocument = gql`
    query GetUnreadCount {
  getUnreadCount
}
    `;

export function useGetUnreadCountQuery(options?: Omit<Urql.UseQueryArgs<GetUnreadCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUnreadCountQuery>({ query: GetUnreadCountDocument, ...options });
};
export const GetUsersDocument = gql`
    query GetUsers($searchTerm: String!) {
  getUsers(searchTerm: $searchTerm) {
    users {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const NewMessageReceivedDocument = gql`
    subscription NewMessageReceived {
  newMessageReceived {
    conversationId
    body
    updatedAt
    createdAt
    sender {
      id
      username
    }
    id
  }
}
    `;

export function useNewMessageReceivedSubscription<TData = NewMessageReceivedSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageReceivedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageReceivedSubscription, TData>) {
  return Urql.useSubscription<NewMessageReceivedSubscription, TData, NewMessageReceivedSubscriptionVariables>({ query: NewMessageReceivedDocument, ...options }, handler);
};
export const NewUnreadMessageDocument = gql`
    subscription NewUnreadMessage {
  newUnreadMessage
}
    `;

export function useNewUnreadMessageSubscription<TData = NewUnreadMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewUnreadMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewUnreadMessageSubscription, TData>) {
  return Urql.useSubscription<NewUnreadMessageSubscription, TData, NewUnreadMessageSubscriptionVariables>({ query: NewUnreadMessageDocument, ...options }, handler);
};
export const UpdatedConversationsDocument = gql`
    subscription UpdatedConversations {
  updatedConversations {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useUpdatedConversationsSubscription<TData = UpdatedConversationsSubscription>(options: Omit<Urql.UseSubscriptionArgs<UpdatedConversationsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<UpdatedConversationsSubscription, TData>) {
  return Urql.useSubscription<UpdatedConversationsSubscription, TData, UpdatedConversationsSubscriptionVariables>({ query: UpdatedConversationsDocument, ...options }, handler);
};