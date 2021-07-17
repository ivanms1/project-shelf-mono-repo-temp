import React from 'react';
import { NetworkStatus, gql } from '@apollo/client';
import { Waypoint } from 'react-waypoint';

import Cardtwo from '../../../components/Cardv2';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import Loader from '../../../components/Loader';

import {
  useGetAllApprovedProjectsQuery,
  useUpdateStatusMutation,
} from '../../../generated/generated';

import {
  Container,
  ActivatedContainer,
  ProjectCollection,
  customCss,
} from './style';

function Activated() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetAllApprovedProjectsQuery({
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const [updateStatus, { error: errorR }] = useUpdateStatusMutation();

  async function updateProjectStatus(projectId: string) {
    try {
      await updateStatus({
        variables: {
          projectId: projectId,
          isApproved: false,
        },
      });
    } catch (error) {
      // handle error
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
              data?.projects?.results.map((project) => {
                if (!project) {
                  return null;
                }

                return (
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
                );
              })
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
