import { NetworkStatus } from '@apollo/client';
import { Waypoint } from 'react-waypoint';

import Cardtwo from '../../app/components/Cardv2';

import Spinner from '../../app/components/Spinner';
import Loader from '../../app/components/Loader';

import { useGetMyFavoriteProjectsQuery } from '../../generated/generated';

import { Approval, Container, CardContainer } from './style';

function Favorites() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetMyFavoriteProjectsQuery({
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
        <p>
          Favorite Projects <span>({data?.projects?.totalCount})</span>
        </p>
      </Approval>
      <CardContainer>
        {networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.refetch ||
        !data?.projects?.results?.length ? (
          <p className="noproject">You do not have any favorite projects yet</p>
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

export default Favorites;
