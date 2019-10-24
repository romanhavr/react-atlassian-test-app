import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { sortTable } from './store/actions';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import './App.css';
import IssuesTable from './components/issuesTable';
import CreatePage from './components/create-page';

function App(props) {
  return (
    <div className="App">
      <Router>
        <header>
          <BreadcrumbsStateless
            isExpanded="true"
          >
            <BreadcrumbsItem href="/" text="Some project" />
            <Route exact path="/">
              <BreadcrumbsItem href="/" text="Parent page" />
            </Route>
            <Route path="/create">
              <BreadcrumbsItem href="/create" text="Create issue" />
            </Route>
          </BreadcrumbsStateless>
          <h1>Jira issues</h1>
        </header>
        <main>
          <Route exact path="/">
            <NavLink exact to="/create">
              <Button appearance="primary" onClick={() => props.sortTable(null)}>
                Create new issue
              </Button>
            </NavLink>
            <Select
              className="multi-select"
              classNamePrefix="react-select"
              options={[
                { label: 'Summary', value: 'issue' },
                { label: 'Assignee', value: 'assignee' },
                { label: 'Priority', value: 'priority' }
              ]}
              isMulti
              onChange={value => props.sortTable(value)}
              isSearchable={false}
              placeholder="Sort by..."
            />
            <IssuesTable />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
        </main>
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    sortTable: value => dispatch(sortTable(value))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
