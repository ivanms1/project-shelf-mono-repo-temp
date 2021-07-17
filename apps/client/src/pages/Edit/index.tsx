import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import ProjectForm from '../../components/ProjectForm';
import PopupModal from '../../components/PopupModal/index';

import { Overlay, Container } from './style';
import {
  useGetProjectQuery,
  useUpdateUserProjectMutation,
} from '../../generated/generated';

function Edit() {
  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();

  const [editValues, setEditValues] = useState(null);
  const [editModelIsOpen, setEditModelIsOpen] = useState(false);
  const openEditModal = () => setEditModelIsOpen(true);
  const closeEditModal = () => setEditModelIsOpen(false);

  const { data, loading, error: projectError } = useGetProjectQuery({
    variables: {
      id: projectId,
    },
  });

  const [editProject, { error }] = useUpdateUserProjectMutation();

  if (loading) {
    return <Loader />;
  }

  if (projectError || error) {
    return <p>Sorry, something went wrong.</p>;
  }

  if (!data?.project) {
    return <p>Sorry, this project does not exist.</p>;
  }

  const { project } = data;

  async function editTheProject(values: any) {
    const res = await editProject({
      variables: {
        projectId: project.id,
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
      closeEditModal();
      history.push('/my-projects');
    }
  }

  return (
    <Overlay>
      <Container>
        <p>
          <span>ShowCase them </span>
          <span>so that people can learn from each other.</span>
        </p>
        <ProjectForm
          project={project}
          onSubmit={(values) => {
            openEditModal();
            setEditValues(values);
          }}
        />
      </Container>

      <PopupModal
        type="edit"
        isOpen={editModelIsOpen}
        onRequestClose={closeEditModal}
        onClick={() => editTheProject(editValues)}
      />
    </Overlay>
  );
}

export default Edit;
