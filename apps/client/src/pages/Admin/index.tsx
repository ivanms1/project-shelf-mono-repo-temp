import { Switch } from 'react-router-dom';

import PrivateRoute from '../../Routes/PrivateRoute';
import Projects from './Projects';

import { Container, TabContainer, StyledNavLink } from './style';

const tabs = [
  {
    title: 'Projects',
    path: '/admin/projects',
  },

  {
    title: 'All Users',
    path: '/admin/users',
  },
];

function Admin() {
  return (
    <Container>
      <TabContainer>
        <ul>
          {tabs.map((tab, index) => (
            <li key={index}>
              <StyledNavLink to={tab.path} activeClassName="current">
                {tab.title}
              </StyledNavLink>
            </li>
          ))}
        </ul>
      </TabContainer>
      <Switch>
        <PrivateRoute path="/admin/projects" isForAdmin>
          <Projects />
        </PrivateRoute>
      </Switch>
    </Container>
  );
}

export default Admin;
