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

interface ProjectType extends Omit<Project, 'likes'> {
  likes: Partial<User>[];
}

interface CardTwoProps {
  project: ProjectType;
  children?: React.ReactNode;
}

function Cardtwo({ project, children }: CardTwoProps) {
  const [imgLoaded, setImgLoaded] = useState(true);

  const { currentUser } = useCurrentUser();

  return (
    <Container>
      <Star className="starContainer" />
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
