import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { gql } from '@apollo/client';

import useCurrentUser from '../useCurrentUser';
import Spinner from '../Spinner';

import { getCurrentDate } from '../../helpers/dateConverter';

import { ReactComponent as Star } from '../../assets/Star.svg';
import { ReactComponent as StarFill } from '../../assets/Star-Fill.svg';

import {
  Maybe,
  Project,
  useFavoriteProjectMutationMutation,
  User,
  useReactToProjectMutation,
} from '../../generated/generated';

import {
  Container,
  CardContainerInner,
  ProjectDetails,
  ViewDetails,
} from './style';

type ProjectResponseType = { __typename?: 'Project' } & Pick<
  Project,
  | 'id'
  | 'title'
  | 'createdAt'
  | 'preview'
  | 'repoLink'
  | 'siteLink'
  | 'description'
  | 'isApproved'
> & {
    author: { __typename?: 'User' } & Pick<User, 'name' | 'email'>;
    likes: Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>>;
    favorites: Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>>;
  };

const getActionLikes = (
  project: ProjectResponseType,
  currentUser: any
): any => {
  return project?.likes?.some((user) => user?.id === currentUser?.id)
    ? 'DISLIKE'
    : 'LIKE';
};

const getActionFavorite = (
  project: ProjectResponseType,
  currentUser: any
): any => {
  return project?.favorites?.some((user) => user?.id === currentUser?.id)
    ? 'UNDO'
    : 'FAVORITE';
};

interface CardTwoProps {
  project: ProjectResponseType;
  children?: React.ReactNode;
}

function Cardtwo({ project, children }: CardTwoProps) {
  const [imgLoaded, setImgLoaded] = useState(true);

  const { currentUser } = useCurrentUser();

  const getVariablesLikes = () => {
    return {
      variables: {
        input: {
          projectId: project?.id,
          userId: currentUser?.id ?? '',
          action: getActionLikes(project, currentUser),
        },
      },
    };
  };

  const getVariablesFavorite = () => {
    return {
      variables: {
        input: {
          projectId: project?.id,
          userId: currentUser?.id ?? '',
          action: getActionFavorite(project, currentUser),
        },
      },
    };
  };

  const [reactToProject] = useReactToProjectMutation(getVariablesLikes());

  const [favoriteProject, { loading }] = useFavoriteProjectMutationMutation({
    ...getVariablesFavorite(),
    update(cache, { data }) {
      cache.modify({
        fields: {
          getMyFavoriteProjects(existing = {}, { readField }) {
            if (getActionFavorite(project, currentUser) === 'FAVORITE') {
              const projectFavorited = cache.writeFragment({
                data: data?.favoriteProject,
                fragment: gql`
                  fragment NewProject on Project {
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
                `,
              });
              return {
                ...existing,
                results: [...existing.results, projectFavorited].sort(
                  (a, b) =>
                    // @ts-expect-error to fix later
                    new Date(readField('createdAt', b)) -
                    // @ts-expect-error to fix later
                    new Date(readField('createdAt', a))
                ),
              };
            }

            return {
              ...existing,
              results: existing.results.filter(
                (p: any) => readField('id', p) !== data?.favoriteProject?.id
              ),
            };
          },
        },
      });
    },
  });

  const favoriteClickHandler = async () => {
    try {
      const action = getActionFavorite(project, currentUser);
      const msg =
        action === 'FAVORITE' ? `Added to favorites` : `Removed from favorites`;
      await favoriteProject();
      toast.success(msg);
    } catch (error) {
      toast.error('Oops, too fast');
    }
  };

  return (
    <Container>
      <button onClick={() => reactToProject()} className="starContainer">
        {getActionLikes(project, currentUser) === 'LIKE' ? (
          <Star />
        ) : (
          <StarFill />
        )}
      </button>

      <CardContainerInner isApproved={project.isApproved}>
        <div className="imgContainer">
          {!imgLoaded ? (
            <Spinner type="black" />
          ) : (
            <img
              src={project.preview}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(false)}
              alt={project.title}
            />
          )}

          <div className="overlay">
            <div className="overlayContent">
              <button disabled={loading} onClick={favoriteClickHandler}>
                {getActionFavorite(project, currentUser) === 'FAVORITE' ? (
                  <Star />
                ) : (
                  <StarFill />
                )}
              </button>
              <ViewDetails to={`/projectDetails/${project.id}`}>
                View Details
              </ViewDetails>
            </div>
          </div>
        </div>
      </CardContainerInner>
      <ProjectDetails>
        <span className="userName">{project.title}</span>
        <span className="submissionDate">
          {getCurrentDate(project.createdAt)}
        </span>
      </ProjectDetails>
      {children}
    </Container>
  );
}

export default Cardtwo;
