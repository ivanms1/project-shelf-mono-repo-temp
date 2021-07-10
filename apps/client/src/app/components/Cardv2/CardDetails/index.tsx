import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';

import Button from '../../Button';
import Loader from '../../Loader';
import PopupModal from '../../PopupModal';
import Spinner from '../../Spinner';

import useCurrentUser from '../../useCurrentUser';
import {
  useDeleteProjectMutation,
  useGetProjectCardQuery,
} from '../../../../generated/generated';

import { getCurrentDate } from '../../../..//helpers/dateConverter';

import { ReactComponent as Github } from '../../../../assets/github.svg';
import { ReactComponent as Email } from '../../../../assets/email.svg';
import { ReactComponent as Web } from '../../../../assets/web.svg';

import {
  Container,
  ImgContainerOuter,
  DetailsContainer,
  UserDetails,
  AllDetails,
  ButtonContainer,
  CustomDeleteButtonCSS,
} from './style';
import 'react-medium-image-zoom/dist/styles.css';

function updateQueryCache(existing: any, readField: any, deleteId: any) {
  return {
    ...existing,
    results: existing.results.filter(
      (p: any) => readField('id', p) !== deleteId
    ),
  };
}

function generateTags(tags: string[]) {
  return tags.map((tag) => (
    <span key={tag} className="tag">
      {tag}
    </span>
  ));
}

function CardDetails() {
  const [imgLoaded, setImgLoaded] = useState(true);

  const [deleteModelIsOpen, setDeleteModelIsOpen] = useState(false);
  const openDeleteModal = () => setDeleteModelIsOpen(true);
  const closeDeleteModal = () => setDeleteModelIsOpen(false);

  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();
  const { currentUser } = useCurrentUser();

  const { data, loading, error } = useGetProjectCardQuery({
    variables: {
      id: projectId,
    },
  });

  const [deleteProject] = useDeleteProjectMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getApprovedProjects: (existing = {}, { readField }) =>
            updateQueryCache(existing, readField, data?.deleteProject),
          getMyProjects: (existing = {}, { readField }) =>
            updateQueryCache(existing, readField, data?.deleteProject),
          getMyFavoriteProjects: (existing = {}, { readField }) =>
            updateQueryCache(existing, readField, data?.deleteProject),
        },
      });
    },
  });

  async function deleteUserProject(projectId: string | undefined) {
    if (projectId) {
      const res = await deleteProject({
        variables: {
          projectId: projectId,
        },
      });
      if (res?.data) {
        closeDeleteModal();
        history.push('/my-projects');
      }
    }
  }

  function editUserProject(projectId: string) {
    history.push(`/edit/${projectId}`);
  }

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <Loader />;
  }

  const { project } = data;

  return (
    <>
      <Container>
        {project && (
          <div className="wrapper">
            <DetailsContainer>
              <div className="imgUserDetails">
                <ImgContainerOuter status={project?.isApproved}>
                  {!imgLoaded ? (
                    <Spinner type="black" />
                  ) : (
                    <Zoom
                      image={{
                        alt: project?.preview,
                        src: project?.preview,
                        style: {
                          width: '100%',
                          height: '100%',
                          display: 'inline-block',
                        },
                      }}
                    />
                  )}
                </ImgContainerOuter>

                <UserDetails>
                  <span className="fullName">{project?.author.name}</span>
                </UserDetails>
              </div>

              <AllDetails>
                <div>
                  <span className="fullName">{project?.title}</span>
                  <span className="date">
                    {getCurrentDate(project?.createdAt)}
                  </span>
                  <div className="tagsContainer">
                    <span className="tagsList">
                      Tags : {generateTags(project.tags)}
                    </span>
                  </div>
                  <div className="linksContainer">
                    <span>
                      <Github />{' '}
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Github
                      </a>
                    </span>
                    <span>
                      <Email />
                      <a href={'mailto:' + project?.author.email}>Contact</a>
                    </span>
                    <span>
                      <Web />
                      <a
                        href={project.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Site
                      </a>
                    </span>
                  </div>

                  <div className="description">{project?.description}</div>
                </div>

                {(currentUser?.email === project?.author.email ||
                  currentUser?.role === 'ADMIN') && (
                  <ButtonContainer>
                    <Button
                      fontSize="medium"
                      kind="delete"
                      size="medium"
                      onClick={openDeleteModal}
                      addCSS={CustomDeleteButtonCSS}
                    >
                      Delete
                    </Button>

                    <Button
                      fontSize="medium"
                      kind="edit"
                      size="small"
                      onClick={() => editUserProject(project?.id)}
                      addCSS={CustomDeleteButtonCSS}
                    >
                      Edit
                    </Button>
                  </ButtonContainer>
                )}
              </AllDetails>
            </DetailsContainer>
          </div>
        )}

        {!project && <p>Project does not exist.</p>}
      </Container>

      <PopupModal
        type="delete"
        isOpen={deleteModelIsOpen}
        onRequestClose={closeDeleteModal}
        onClick={() => {
          deleteUserProject(project?.id);
        }}
      />
    </>
  );
}

export default CardDetails;
