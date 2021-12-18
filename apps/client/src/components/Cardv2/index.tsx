import React, { useState } from 'react';

import useCurrentUser from '../useCurrentUser';
import Spinner from '../Spinner';

import { getCurrentDate } from '../../helpers/dateConverter';

import { ReactComponent as Star } from '../../assets/Star.svg';
import { ReactComponent as StarFill } from '../../assets/Star-Fill.svg';

import {
  Maybe,
  Project,
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
  };

const getActionLikes = (
  project: ProjectResponseType,
  currentUser: any
): any => {
  return project?.likes?.some((user) => user?.id === currentUser?.id)
    ? 'DISLIKE'
    : 'LIKE';
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

  const [reactToProject] = useReactToProjectMutation(getVariablesLikes());

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
