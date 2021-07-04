import { Waypoint } from 'react-waypoint';
import { NetworkStatus } from '@apollo/client';

import Cardtwo from '../../app/components/Cardv2';

import Active from '../../app/components/Active';
import Spinner from '../../app/components/Spinner';
import Loader from '../../app/components/Loader';

import { useGetMyProjectsQuery } from '../../generated/generated';

import { Container, Approval, CardContainer, ActiveContainer } from './style';

function MyProjects() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetMyProjectsQuery({
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return <Loader />;
  }

  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }

  const onRefetch = () => {
    if (!data?.projects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        cursor: data?.projects?.nextCursor,
      },
    });
  };

  return (
    <Container>
      <Approval>
        <p>My Projects</p>

        <ActiveContainer>
          <div className="activeContainer">
            <Active />
            <span className="text">Not Approved</span>
          </div>

          <div className="activeContainer">
            <Active active />
            <span className="text">Approved</span>
          </div>
        </ActiveContainer>
      </Approval>

      <CardContainer>
        {networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.refetch ||
        !data?.projects?.results?.length ? (
          <p className="noproject">You do not have any projects to showcase.</p>
        ) : (
          data?.projects?.results.map((project) => (
            <Cardtwo key={project.id} project={project} />
          ))
        )}
      </CardContainer>
      {!loading && data?.projects?.nextCursor && (
        <Waypoint onEnter={onRefetch} bottomOffset="-20%" />
      )}
      {loading && data?.projects?.nextCursor && (
        <Spinner padding={20} type="black" />
      )}
    </Container>
  );
}

export default MyProjects;
