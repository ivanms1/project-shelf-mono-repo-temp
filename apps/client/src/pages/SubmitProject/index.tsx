import { useState } from 'react';
import { gql } from '@apollo/client';

import ProjectForm from '../../components/ProjectForm';
import SubmissionModal from '../../components/PopupModal/SubmissionModal';
import Loader from '../../components/Loader';

import useCurrentUser from '../../components/useCurrentUser';
import { useCreateUserProjectMutation } from '../../generated/generated';

import { Overlay, Container } from './style';

function SubmitProject() {
  const { currentUser: user, loading: currentUserLoading } = useCurrentUser();

  const [submitModelIsOpen, setSubmitModelIsOpen] = useState(false);

  const openSubmitModal = () => setSubmitModelIsOpen(true);
  const closeSubmitModal = () => setSubmitModelIsOpen(false);

  const [createProject] = useCreateUserProjectMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getMyProjects(existing = {}) {
            const projectCreated = cache.writeFragment({
              data: data?.createProject,
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
              results: [projectCreated, ...existing.results],
            };
          },
        },
      });
    },
  });

  const submitTheProject = async (values: any) => {
    const res = await createProject({
      variables: {
        input: {
          preview: values.preview,
          title: values.title,
          siteLink: values.siteLink,
          repoLink: values.repoLink,
          description: values.description,
          tags: values.tags.map((e: any) => e.value),
        },
      },
    });
    if (res?.data) {
      openSubmitModal();
    }
  };

  if (currentUserLoading) {
    return <Loader />;
  }

  return (
    <Overlay>
      <Container>
        <p>
          <span>ShowCase them </span>
          <span>so that people can learn from each other.</span>
        </p>
        <ProjectForm
          onSubmit={(values) => {
            submitTheProject(values);
          }}
        />

        <SubmissionModal
          isOpen={submitModelIsOpen}
          onRequestClose={closeSubmitModal}
        />
      </Container>
    </Overlay>
  );
}

export default SubmitProject;
