import React from 'react';

import Pagination from './Pagination';
import UserTable from './';

function JsonData() {
  const { data, loading, pageCount, fetchData, count } = Pagination();

  return (
    <UserTable
      data={data}
      fetchData={fetchData}
      pageCount={pageCount}
      getPages={count}
    />
  );
}

export default JsonData;
