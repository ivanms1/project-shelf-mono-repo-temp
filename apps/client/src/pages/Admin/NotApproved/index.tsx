import { NetworkStatus, gql } from '@apollo/client';
import { Waypoint } from 'react-waypoint';

import Cardtwo from '../../../app/components/Cardv2';
import Button from '../../../app/components/Button';
import Spinner from '../../../app/components/Spinner';
import Loader from '../../../app/components/Loader';

import {
  useGetAllDissaprovedPojectsQuery,
  useUpdateStatusMutation,
} from '../../../generated/generated';

import {
  Container,
  ActivatedContainer,
  ProjectCollection,
  customCss,
} from './style';

function NotApproved() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetAllDissaprovedPojectsQuery({
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const [updateStatus, { error: errorR }] = useUpdateStatusMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          adminGetNotApprovedProjects(existing = {}, { readField }) {
            return {
              ...existing,
              results: existing.results.filter(
                (p: any) => readField('id', p) !== data?.updateProjectStatus?.id
              ),
            };
          },
        },
      });

      cache.modify({
        fields: {
          getApprovedProjects(existing = {}, { readField }) {
            const projectFavorited = cache.writeFragment({
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
              results: [...existing.results, projectFavorited].sort(
                (a, b) =>
                  //@ts-expect-error fix later
                  new Date(readField('createdAt', b)) -
                  //@ts-expect-error fix later
                  new Date(readField('createdAt', a))
              ),
            };
          },
        },
      });
    },
  });

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
      // TODO handle error
    }
  };

  async function updateProjectStatus(projectId: string) {
    try {
      await updateStatus({
        variables: {
          projectId: projectId,
          isApproved: true,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <ActivatedContainer>
        <main>
          <h1>Not Approved Projects</h1>
          <ProjectCollection>
            {networkStatus === NetworkStatus.setVariables ||
            networkStatus === NetworkStatus.refetch ||
            !data?.projects?.results?.length ? (
              <p className="noproject">All project have been approved</p>
            ) : (
              data?.projects?.results.map(
                (project) =>
                  project && (
                    <Cardtwo key={project.id} project={project}>
                      <Button
                        kind="approve"
                        fontSize="medium"
                        onClick={() => updateProjectStatus(project.id)}
                        addCSS={customCss}
                      >
                        Approve
                      </Button>
                    </Cardtwo>
                  )
              )
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

export default NotApproved;
