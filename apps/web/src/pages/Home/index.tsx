import React from 'react';

import { useGetAllProjectsQuery } from '@/generated/generated';

function Home() {
  const { data } = useGetAllProjectsQuery();

  return (
    <div>
      <h2>Projects</h2>
      <div>
        {data?.projects.results?.map((project) => (
          <div key={project.id}>
            <p>{project.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
