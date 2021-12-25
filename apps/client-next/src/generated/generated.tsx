import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type CreateProjectInput = {
  description: Scalars['String'];
  preview: Scalars['String'];
  repoLink: Scalars['String'];
  siteLink: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  title: Scalars['String'];
};



export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  deleteManyProjects?: Maybe<Scalars['JSONObject']>;
  deleteProject?: Maybe<Scalars['String']>;
  login: Scalars['JSONObject'];
  reactToProject?: Maybe<Project>;
  signup: Scalars['JSONObject'];
  updateProject?: Maybe<Project>;
  updateProjectStatus?: Maybe<Project>;
  updateUser: User;
  uploadImage?: Maybe<Scalars['JSONObject']>;
};


export type MutationCreateProjectArgs = {
  input?: Maybe<CreateProjectInput>;
};


export type MutationDeleteManyProjectsArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationReactToProjectArgs = {
  input?: Maybe<ReactToProjectInput>;
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  input?: Maybe<UpdateProjectInput>;
  projectId: Scalars['ID'];
};


export type MutationUpdateProjectStatusArgs = {
  isApproved: Scalars['Boolean'];
  projectId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUsertInput>;
  userId: Scalars['String'];
};


export type MutationUploadImageArgs = {
  path: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  author: User;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isApproved: Scalars['Boolean'];
  /** If this project is liked by the current user */
  isLiked?: Maybe<Scalars['Boolean']>;
  likes: Array<User>;
  likesCount: Scalars['Int'];
  preview: Scalars['String'];
  repoLink: Scalars['String'];
  siteLink: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

/** Actions available to the user */
export enum ProjectAction {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  results: Array<Project>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all approved projects */
  getApprovedProjects: ProjectsResponse;
  getCurrentUser?: Maybe<User>;
  /** Get all my projects */
  getMyProjects: ProjectsResponse;
  getProject?: Maybe<Project>;
  /** Admin query to get projects */
  getProjectsAdmin: ProjectsResponse;
  getUser?: Maybe<User>;
  getUsers: Array<Maybe<User>>;
};


export type QueryGetApprovedProjectsArgs = {
  cursor?: Maybe<Scalars['String']>;
};


export type QueryGetMyProjectsArgs = {
  cursor?: Maybe<Scalars['String']>;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectsAdminArgs = {
  cursor?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type ReactToProjectInput = {
  action: ProjectAction;
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateProjectInput = {
  description?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['String']>;
  repoLink?: Maybe<Scalars['String']>;
  siteLink?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

/** Update the user information */
export type UpdateUsertInput = {
  discord: Scalars['String'];
  email: Scalars['String'];
  github: Scalars['String'];
  name: Scalars['String'];
  role: Role;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  projectsLiked?: Maybe<Array<Project>>;
  role: Role;
};

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signup'>
);


export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;