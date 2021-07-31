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


/** Favorite actions */
export enum FavoriteAction {
  Favorite = 'FAVORITE',
  Undo = 'UNDO'
}

export type FavoriteProjectInput = {
  action: FavoriteAction;
  projectId: Scalars['String'];
  userId: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  deleteManyProjects?: Maybe<Scalars['JSONObject']>;
  deleteProject?: Maybe<Scalars['String']>;
  favoriteProject?: Maybe<Project>;
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


export type MutationFavoriteProjectArgs = {
  input?: Maybe<FavoriteProjectInput>;
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
  favorites?: Maybe<Array<User>>;
  id: Scalars['ID'];
  isApproved: Scalars['Boolean'];
  likes?: Maybe<Array<User>>;
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
  /** Get all my favorite projects */
  getMyFavoriteProjects: ProjectsResponse;
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


export type QueryGetMyFavoriteProjectsArgs = {
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
  favoriteProjects?: Maybe<Array<Project>>;
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  projectsLiked?: Maybe<Array<Project>>;
  role: Role;
};

export type GetUserContextQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserContextQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
    & { projects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'title' | 'preview' | 'createdAt' | 'description' | 'siteLink' | 'repoLink' | 'isApproved'>
    )>> }
  )> }
);

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type GetProjectCardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectCardQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'repoLink' | 'siteLink' | 'description' | 'isApproved' | 'createdAt' | 'tags'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'role'>
    ) }
  )> }
);

export type GetUserCardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserCardQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email'>
    & { projects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'title' | 'preview' | 'description' | 'createdAt' | 'siteLink' | 'repoLink' | 'isApproved'>
    )>> }
  )> }
);

export type FavoriteProjectMutationMutationVariables = Exact<{
  input?: Maybe<FavoriteProjectInput>;
}>;


export type FavoriteProjectMutationMutation = (
  { __typename?: 'Mutation' }
  & { favoriteProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'description' | 'siteLink' | 'repoLink' | 'isApproved' | 'createdAt'>
    & { likes?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>, favorites?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>> }
  )> }
);

export type ReactToProjectMutationVariables = Exact<{
  input?: Maybe<ReactToProjectInput>;
}>;


export type ReactToProjectMutation = (
  { __typename?: 'Mutation' }
  & { reactToProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'description' | 'siteLink' | 'repoLink' | 'isApproved' | 'createdAt'>
    & { likes?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>, favorites?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>> }
  )> }
);

export type UploadImageMutationVariables = Exact<{
  path: Scalars['String'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { image: Mutation['uploadImage'] }
);

export type UseCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type UseCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'role'>
  )> }
);

export type ProjectsResponseFragmentFragment = (
  { __typename?: 'ProjectsResponse' }
  & Pick<ProjectsResponse, 'nextCursor' | 'prevCursor' | 'totalCount'>
  & { results: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'createdAt' | 'preview' | 'repoLink' | 'siteLink' | 'description' | 'isApproved'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'email'>
    ), likes?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>, favorites?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>> }
  )> }
);

export type UpdateStatusMutationVariables = Exact<{
  projectId: Scalars['String'];
  isApproved: Scalars['Boolean'];
}>;


export type UpdateStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectStatus?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'repoLink' | 'siteLink' | 'description' | 'isApproved'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'email'>
    ) }
  )> }
);

export type GetAllDissaprovedPojectsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetAllDissaprovedPojectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsResponse' }
    & ProjectsResponseFragmentFragment
  ) }
);

export type GetProjectsAdminQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetProjectsAdminQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsResponse' }
    & ProjectsResponseFragmentFragment
  ) }
);

export type UpdateUserProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
  input?: Maybe<UpdateProjectInput>;
}>;


export type UpdateUserProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'description' | 'repoLink' | 'siteLink' | 'isApproved' | 'createdAt' | 'tags'>
  )> }
);

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'description' | 'repoLink' | 'siteLink' | 'isApproved' | 'createdAt' | 'tags'>
  )> }
);

export type GetUserEditQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserEditQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email'>
  )> }
);

export type GetMyFavoriteProjectsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetMyFavoriteProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsResponse' }
    & ProjectsResponseFragmentFragment
  ) }
);

export type GetAllProjectsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetAllProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsResponse' }
    & ProjectsResponseFragmentFragment
  ) }
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type DeleteAProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type DeleteAProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type GetMyProjectsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetMyProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsResponse' }
    & ProjectsResponseFragmentFragment
  ) }
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signup'>
);

export type CreateUserProjectMutationVariables = Exact<{
  input?: Maybe<CreateProjectInput>;
}>;


export type CreateUserProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'preview' | 'description' | 'createdAt' | 'siteLink' | 'repoLink' | 'isApproved'>
    & { likes?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>> }
  )> }
);

export type GetUserSubmitQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserSubmitQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email'>
  )> }
);

export const ProjectsResponseFragmentFragmentDoc = gql`
    fragment ProjectsResponseFragment on ProjectsResponse {
  nextCursor
  prevCursor
  totalCount
  results {
    id
    title
    createdAt
    author {
      name
      email
    }
    likes {
      id
    }
    favorites {
      id
    }
    preview
    repoLink
    siteLink
    description
    isApproved
  }
}
    `;
export const GetUserContextDocument = gql`
    query GetUserContext($id: ID!) {
  user: getUser(id: $id) {
    id
    name
    email
    projects {
      id
      title
      preview
      createdAt
      description
      siteLink
      repoLink
      isApproved
    }
  }
}
    `;

/**
 * __useGetUserContextQuery__
 *
 * To run a query within a React component, call `useGetUserContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserContextQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserContextQuery(baseOptions: Apollo.QueryHookOptions<GetUserContextQuery, GetUserContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserContextQuery, GetUserContextQueryVariables>(GetUserContextDocument, options);
      }
export function useGetUserContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserContextQuery, GetUserContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserContextQuery, GetUserContextQueryVariables>(GetUserContextDocument, options);
        }
export type GetUserContextQueryHookResult = ReturnType<typeof useGetUserContextQuery>;
export type GetUserContextLazyQueryHookResult = ReturnType<typeof useGetUserContextLazyQuery>;
export type GetUserContextQueryResult = Apollo.QueryResult<GetUserContextQuery, GetUserContextQueryVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: ID!) {
  deleteProject(id: $projectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetProjectCardDocument = gql`
    query GetProjectCard($id: ID!) {
  project: getProject(id: $id) {
    id
    title
    author {
      id
      name
      email
      role
    }
    preview
    repoLink
    siteLink
    description
    isApproved
    createdAt
    tags
  }
}
    `;

/**
 * __useGetProjectCardQuery__
 *
 * To run a query within a React component, call `useGetProjectCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectCardQuery(baseOptions: Apollo.QueryHookOptions<GetProjectCardQuery, GetProjectCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectCardQuery, GetProjectCardQueryVariables>(GetProjectCardDocument, options);
      }
export function useGetProjectCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectCardQuery, GetProjectCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectCardQuery, GetProjectCardQueryVariables>(GetProjectCardDocument, options);
        }
export type GetProjectCardQueryHookResult = ReturnType<typeof useGetProjectCardQuery>;
export type GetProjectCardLazyQueryHookResult = ReturnType<typeof useGetProjectCardLazyQuery>;
export type GetProjectCardQueryResult = Apollo.QueryResult<GetProjectCardQuery, GetProjectCardQueryVariables>;
export const GetUserCardDocument = gql`
    query GetUserCard($id: ID!) {
  user: getUser(id: $id) {
    name
    email
    projects {
      id
      title
      preview
      description
      createdAt
      siteLink
      repoLink
      isApproved
    }
  }
}
    `;

/**
 * __useGetUserCardQuery__
 *
 * To run a query within a React component, call `useGetUserCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserCardQuery(baseOptions: Apollo.QueryHookOptions<GetUserCardQuery, GetUserCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCardQuery, GetUserCardQueryVariables>(GetUserCardDocument, options);
      }
export function useGetUserCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCardQuery, GetUserCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCardQuery, GetUserCardQueryVariables>(GetUserCardDocument, options);
        }
export type GetUserCardQueryHookResult = ReturnType<typeof useGetUserCardQuery>;
export type GetUserCardLazyQueryHookResult = ReturnType<typeof useGetUserCardLazyQuery>;
export type GetUserCardQueryResult = Apollo.QueryResult<GetUserCardQuery, GetUserCardQueryVariables>;
export const FavoriteProjectMutationDocument = gql`
    mutation FavoriteProjectMutation($input: FavoriteProjectInput) {
  favoriteProject(input: $input) {
    id
    title
    preview
    description
    siteLink
    repoLink
    isApproved
    likes {
      id
    }
    favorites {
      id
    }
    createdAt
  }
}
    `;
export type FavoriteProjectMutationMutationFn = Apollo.MutationFunction<FavoriteProjectMutationMutation, FavoriteProjectMutationMutationVariables>;

/**
 * __useFavoriteProjectMutationMutation__
 *
 * To run a mutation, you first call `useFavoriteProjectMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteProjectMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteProjectMutationMutation, { data, loading, error }] = useFavoriteProjectMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFavoriteProjectMutationMutation(baseOptions?: Apollo.MutationHookOptions<FavoriteProjectMutationMutation, FavoriteProjectMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoriteProjectMutationMutation, FavoriteProjectMutationMutationVariables>(FavoriteProjectMutationDocument, options);
      }
export type FavoriteProjectMutationMutationHookResult = ReturnType<typeof useFavoriteProjectMutationMutation>;
export type FavoriteProjectMutationMutationResult = Apollo.MutationResult<FavoriteProjectMutationMutation>;
export type FavoriteProjectMutationMutationOptions = Apollo.BaseMutationOptions<FavoriteProjectMutationMutation, FavoriteProjectMutationMutationVariables>;
export const ReactToProjectDocument = gql`
    mutation ReactToProject($input: ReactToProjectInput) {
  reactToProject(input: $input) {
    id
    title
    preview
    description
    siteLink
    repoLink
    isApproved
    likes {
      id
    }
    favorites {
      id
    }
    createdAt
  }
}
    `;
export type ReactToProjectMutationFn = Apollo.MutationFunction<ReactToProjectMutation, ReactToProjectMutationVariables>;

/**
 * __useReactToProjectMutation__
 *
 * To run a mutation, you first call `useReactToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactToProjectMutation, { data, loading, error }] = useReactToProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReactToProjectMutation(baseOptions?: Apollo.MutationHookOptions<ReactToProjectMutation, ReactToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactToProjectMutation, ReactToProjectMutationVariables>(ReactToProjectDocument, options);
      }
export type ReactToProjectMutationHookResult = ReturnType<typeof useReactToProjectMutation>;
export type ReactToProjectMutationResult = Apollo.MutationResult<ReactToProjectMutation>;
export type ReactToProjectMutationOptions = Apollo.BaseMutationOptions<ReactToProjectMutation, ReactToProjectMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($path: String!) {
  image: uploadImage(path: $path)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const UseCurrentUserDocument = gql`
    query UseCurrentUser {
  currentUser: getCurrentUser {
    id
    name
    email
    role
  }
}
    `;

/**
 * __useUseCurrentUserQuery__
 *
 * To run a query within a React component, call `useUseCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUseCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUseCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUseCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<UseCurrentUserQuery, UseCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UseCurrentUserQuery, UseCurrentUserQueryVariables>(UseCurrentUserDocument, options);
      }
export function useUseCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UseCurrentUserQuery, UseCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UseCurrentUserQuery, UseCurrentUserQueryVariables>(UseCurrentUserDocument, options);
        }
export type UseCurrentUserQueryHookResult = ReturnType<typeof useUseCurrentUserQuery>;
export type UseCurrentUserLazyQueryHookResult = ReturnType<typeof useUseCurrentUserLazyQuery>;
export type UseCurrentUserQueryResult = Apollo.QueryResult<UseCurrentUserQuery, UseCurrentUserQueryVariables>;
export const UpdateStatusDocument = gql`
    mutation updateStatus($projectId: String!, $isApproved: Boolean!) {
  updateProjectStatus(projectId: $projectId, isApproved: $isApproved) {
    id
    title
    author {
      name
      email
    }
    preview
    repoLink
    siteLink
    description
    isApproved
  }
}
    `;
export type UpdateStatusMutationFn = Apollo.MutationFunction<UpdateStatusMutation, UpdateStatusMutationVariables>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      isApproved: // value for 'isApproved'
 *   },
 * });
 */
export function useUpdateStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStatusMutation, UpdateStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStatusMutation, UpdateStatusMutationVariables>(UpdateStatusDocument, options);
      }
export type UpdateStatusMutationHookResult = ReturnType<typeof useUpdateStatusMutation>;
export type UpdateStatusMutationResult = Apollo.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = Apollo.BaseMutationOptions<UpdateStatusMutation, UpdateStatusMutationVariables>;
export const GetAllDissaprovedPojectsDocument = gql`
    query GetAllDissaprovedPojects($cursor: String = null) {
  projects: getProjectsAdmin(cursor: $cursor) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetAllDissaprovedPojectsQuery__
 *
 * To run a query within a React component, call `useGetAllDissaprovedPojectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDissaprovedPojectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDissaprovedPojectsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllDissaprovedPojectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDissaprovedPojectsQuery, GetAllDissaprovedPojectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDissaprovedPojectsQuery, GetAllDissaprovedPojectsQueryVariables>(GetAllDissaprovedPojectsDocument, options);
      }
export function useGetAllDissaprovedPojectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDissaprovedPojectsQuery, GetAllDissaprovedPojectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDissaprovedPojectsQuery, GetAllDissaprovedPojectsQueryVariables>(GetAllDissaprovedPojectsDocument, options);
        }
export type GetAllDissaprovedPojectsQueryHookResult = ReturnType<typeof useGetAllDissaprovedPojectsQuery>;
export type GetAllDissaprovedPojectsLazyQueryHookResult = ReturnType<typeof useGetAllDissaprovedPojectsLazyQuery>;
export type GetAllDissaprovedPojectsQueryResult = Apollo.QueryResult<GetAllDissaprovedPojectsQuery, GetAllDissaprovedPojectsQueryVariables>;
export const GetProjectsAdminDocument = gql`
    query GetProjectsAdmin($cursor: String = null) {
  projects: getProjectsAdmin(cursor: $cursor) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetProjectsAdminQuery__
 *
 * To run a query within a React component, call `useGetProjectsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsAdminQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetProjectsAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>(GetProjectsAdminDocument, options);
      }
export function useGetProjectsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>(GetProjectsAdminDocument, options);
        }
export type GetProjectsAdminQueryHookResult = ReturnType<typeof useGetProjectsAdminQuery>;
export type GetProjectsAdminLazyQueryHookResult = ReturnType<typeof useGetProjectsAdminLazyQuery>;
export type GetProjectsAdminQueryResult = Apollo.QueryResult<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>;
export const UpdateUserProjectDocument = gql`
    mutation UpdateUserProject($projectId: ID!, $input: UpdateProjectInput) {
  updateProject(projectId: $projectId, input: $input) {
    id
    title
    preview
    description
    repoLink
    siteLink
    isApproved
    createdAt
    tags
  }
}
    `;
export type UpdateUserProjectMutationFn = Apollo.MutationFunction<UpdateUserProjectMutation, UpdateUserProjectMutationVariables>;

/**
 * __useUpdateUserProjectMutation__
 *
 * To run a mutation, you first call `useUpdateUserProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProjectMutation, { data, loading, error }] = useUpdateUserProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProjectMutation, UpdateUserProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProjectMutation, UpdateUserProjectMutationVariables>(UpdateUserProjectDocument, options);
      }
export type UpdateUserProjectMutationHookResult = ReturnType<typeof useUpdateUserProjectMutation>;
export type UpdateUserProjectMutationResult = Apollo.MutationResult<UpdateUserProjectMutation>;
export type UpdateUserProjectMutationOptions = Apollo.BaseMutationOptions<UpdateUserProjectMutation, UpdateUserProjectMutationVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: ID!) {
  project: getProject(id: $id) {
    id
    title
    preview
    description
    repoLink
    siteLink
    isApproved
    createdAt
    tags
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetUserEditDocument = gql`
    query GetUserEdit($id: ID!) {
  user: getUser(id: $id) {
    name
    email
  }
}
    `;

/**
 * __useGetUserEditQuery__
 *
 * To run a query within a React component, call `useGetUserEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEditQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserEditQuery(baseOptions: Apollo.QueryHookOptions<GetUserEditQuery, GetUserEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEditQuery, GetUserEditQueryVariables>(GetUserEditDocument, options);
      }
export function useGetUserEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEditQuery, GetUserEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEditQuery, GetUserEditQueryVariables>(GetUserEditDocument, options);
        }
export type GetUserEditQueryHookResult = ReturnType<typeof useGetUserEditQuery>;
export type GetUserEditLazyQueryHookResult = ReturnType<typeof useGetUserEditLazyQuery>;
export type GetUserEditQueryResult = Apollo.QueryResult<GetUserEditQuery, GetUserEditQueryVariables>;
export const GetMyFavoriteProjectsDocument = gql`
    query GetMyFavoriteProjects($cursor: String = null) {
  projects: getMyFavoriteProjects(cursor: $cursor) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetMyFavoriteProjectsQuery__
 *
 * To run a query within a React component, call `useGetMyFavoriteProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFavoriteProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFavoriteProjectsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMyFavoriteProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFavoriteProjectsQuery, GetMyFavoriteProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFavoriteProjectsQuery, GetMyFavoriteProjectsQueryVariables>(GetMyFavoriteProjectsDocument, options);
      }
export function useGetMyFavoriteProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFavoriteProjectsQuery, GetMyFavoriteProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFavoriteProjectsQuery, GetMyFavoriteProjectsQueryVariables>(GetMyFavoriteProjectsDocument, options);
        }
export type GetMyFavoriteProjectsQueryHookResult = ReturnType<typeof useGetMyFavoriteProjectsQuery>;
export type GetMyFavoriteProjectsLazyQueryHookResult = ReturnType<typeof useGetMyFavoriteProjectsLazyQuery>;
export type GetMyFavoriteProjectsQueryResult = Apollo.QueryResult<GetMyFavoriteProjectsQuery, GetMyFavoriteProjectsQueryVariables>;
export const GetAllProjectsDocument = gql`
    query GetAllProjects($cursor: String = null) {
  projects: getApprovedProjects(cursor: $cursor) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetAllProjectsQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
      }
export function useGetAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export type GetAllProjectsQueryHookResult = ReturnType<typeof useGetAllProjectsQuery>;
export type GetAllProjectsLazyQueryHookResult = ReturnType<typeof useGetAllProjectsLazyQuery>;
export type GetAllProjectsQueryResult = Apollo.QueryResult<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const DeleteAProjectDocument = gql`
    mutation DeleteAProject($projectId: ID!) {
  deleteProject(id: $projectId)
}
    `;
export type DeleteAProjectMutationFn = Apollo.MutationFunction<DeleteAProjectMutation, DeleteAProjectMutationVariables>;

/**
 * __useDeleteAProjectMutation__
 *
 * To run a mutation, you first call `useDeleteAProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAProjectMutation, { data, loading, error }] = useDeleteAProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteAProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAProjectMutation, DeleteAProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAProjectMutation, DeleteAProjectMutationVariables>(DeleteAProjectDocument, options);
      }
export type DeleteAProjectMutationHookResult = ReturnType<typeof useDeleteAProjectMutation>;
export type DeleteAProjectMutationResult = Apollo.MutationResult<DeleteAProjectMutation>;
export type DeleteAProjectMutationOptions = Apollo.BaseMutationOptions<DeleteAProjectMutation, DeleteAProjectMutationVariables>;
export const GetMyProjectsDocument = gql`
    query GetMyProjects($cursor: String = null) {
  projects: getMyProjects(cursor: $cursor) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetMyProjectsQuery__
 *
 * To run a query within a React component, call `useGetMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProjectsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMyProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
      }
export function useGetMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
        }
export type GetMyProjectsQueryHookResult = ReturnType<typeof useGetMyProjectsQuery>;
export type GetMyProjectsLazyQueryHookResult = ReturnType<typeof useGetMyProjectsLazyQuery>;
export type GetMyProjectsQueryResult = Apollo.QueryResult<GetMyProjectsQuery, GetMyProjectsQueryVariables>;
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
export const CreateUserProjectDocument = gql`
    mutation CreateUserProject($input: CreateProjectInput) {
  createProject(input: $input) {
    id
    title
    preview
    description
    createdAt
    siteLink
    repoLink
    isApproved
    likes {
      id
      name
    }
  }
}
    `;
export type CreateUserProjectMutationFn = Apollo.MutationFunction<CreateUserProjectMutation, CreateUserProjectMutationVariables>;

/**
 * __useCreateUserProjectMutation__
 *
 * To run a mutation, you first call `useCreateUserProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserProjectMutation, { data, loading, error }] = useCreateUserProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserProjectMutation, CreateUserProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserProjectMutation, CreateUserProjectMutationVariables>(CreateUserProjectDocument, options);
      }
export type CreateUserProjectMutationHookResult = ReturnType<typeof useCreateUserProjectMutation>;
export type CreateUserProjectMutationResult = Apollo.MutationResult<CreateUserProjectMutation>;
export type CreateUserProjectMutationOptions = Apollo.BaseMutationOptions<CreateUserProjectMutation, CreateUserProjectMutationVariables>;
export const GetUserSubmitDocument = gql`
    query GetUserSubmit($id: ID!) {
  user: getUser(id: $id) {
    name
    email
  }
}
    `;

/**
 * __useGetUserSubmitQuery__
 *
 * To run a query within a React component, call `useGetUserSubmitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSubmitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSubmitQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserSubmitQuery(baseOptions: Apollo.QueryHookOptions<GetUserSubmitQuery, GetUserSubmitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSubmitQuery, GetUserSubmitQueryVariables>(GetUserSubmitDocument, options);
      }
export function useGetUserSubmitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSubmitQuery, GetUserSubmitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSubmitQuery, GetUserSubmitQueryVariables>(GetUserSubmitDocument, options);
        }
export type GetUserSubmitQueryHookResult = ReturnType<typeof useGetUserSubmitQuery>;
export type GetUserSubmitLazyQueryHookResult = ReturnType<typeof useGetUserSubmitLazyQuery>;
export type GetUserSubmitQueryResult = Apollo.QueryResult<GetUserSubmitQuery, GetUserSubmitQueryVariables>;