import { useUseCurrentUserQuery } from '../../../generated/generated';

import { getToken } from '../../Context/AppContext';

function useCurrentUser() {
  const { data, loading, error, refetch } = useUseCurrentUserQuery({
    skip: !getToken(),
  });

  return {
    loading,
    error,
    currentUser: data?.currentUser ?? null,
    refetch,
  };
}

export default useCurrentUser;
