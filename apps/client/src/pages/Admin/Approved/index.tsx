import React from 'react';
import { useQuery, useMutation, NetworkStatus, gql } from '@apollo/client';
import { Waypoint } from 'react-waypoint';
import { loader } from 'graphql.macro';

import Cardtwo from '../../../app/components/Cardv2';
import Button from '../../../app/components/Button';
import Spinner from '../../../app/components/Spinner';
import Loader from '../../../app/components/Loader';

import {
  Container,
  ActivatedContainer,
  ProjectCollection,
  customCss,
} from './style';

const QUERY_GET_ALL_APPROVED_PROJECTS = loader(
  './queryGetAllApprovedProjects.graphql'
);
const MUTATION_UPDATE_PROJECT_STATUS = loader(
  './mutationUpdateProjectStatus.graphql'
);

function Activated() {
  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    QUERY_GET_ALL_APPROVED_PROJECTS,
    {
      variables: {
        cursor: undefined,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  );

  const [updateStatus, { error: errorR }] = useMutation(
    MUTATION_UPDATE_PROJECT_STATUS,
    {
      update(cache, { data: { updateProjectStatus } }) {
        cache.modify({
          fields: {
            getApprovedProjects(existing = {}, { readField }) {
              return {
                ...existing,
                results: existing.results.filter(
                  (p: any) => readField('id', p) !== updateProjectStatus.id
                ),
              };
            },
          },
        });

        cache.modify({
          fields: {
            adminGetNotApprovedProjects(existing = {}, { readField }) {
              const projectNotApproved = cache.writeFragment({
                data: updateProjectStatus,
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
                results: [...existing.results, projectNotApproved].sort(
                  (a, b) =>
                    // @ts-expect-error idk how to fix this
                    new Date(readField('createdAt', b)) -
                    // @ts-expect-error idk how to fix this
                    new Date(readField('createdAt', a))
                ),
              };
            },
          },
        });
      },
    }
  );

  async function updateProjectStatus(projectId: string) {
    try {
      await updateStatus({
        variables: {
          projectId: projectId,
          isApproved: false,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  if (loading && !data) {
    return <Loader />;
  }

  if (error || errorR) {
    return <p>Sorry, something went wrong.</p>;
  }

  const onRefetch = async () => {
    if (!data?.projects?.nextCursor) {
      return;
    }

    if (data?.projects?.results?.length === data?.projects?.totalCount) {
      return;
    }

    try {
      await fetchMore({
        variables: {
          cursor: data?.projects?.nextCursor,
        },
      });
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <Container>
      <ActivatedContainer>
        <main>
          <h1>Approved Projects</h1>

          <ProjectCollection>
            {networkStatus === NetworkStatus.setVariables ||
            networkStatus === NetworkStatus.refetch ||
            !data?.projects?.results?.length ? (
              <p className="noproject">There are no approved projects</p>
            ) : (
              data?.projects?.results.map((project: any) => (
                <Cardtwo key={project.id} project={project}>
                  <Button
                    kind="disapprove"
                    fontSize="medium"
                    onClick={() => updateProjectStatus(project.id)}
                    addCSS={customCss}
                  >
                    Disapprove
                  </Button>
                </Cardtwo>
              ))
            )}
          </ProjectCollection>
          {!loading && data?.projects?.nextCursor && (
            <Waypoint onEnter={onRefetch} bottomOffset="-10%" />
          )}
          {loading && data?.projects?.nextCursor && (
            <Spinner padding={20} type="black" />
          )}
        </main>
      </ActivatedContainer>
    </Container>
  );
}

export default Activated;
