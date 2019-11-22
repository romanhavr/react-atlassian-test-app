// @flow

import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { sortTable, userFetchReq } from './store/actions';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button from '@atlaskit/button';
import './App.css';
import CreatePage from './components/create-page';
import UnnamedBlock from './components/unnamed-block';
import Statistics from './components/statistics';
import ReactCommon from './react-commons-components/react-common';

type Props = {
  sortTable: any,
  userFetchReq: any,
}

export function App(props: Props) {
  return (
    <div className="App">
      <Router>
        <header>
          <BreadcrumbsStateless isExpanded="true">
            <BreadcrumbsItem href="/" text="Some project" />
            <Route exact path="/">
              <BreadcrumbsItem href="/" text="Parent page" />
            </Route>
            <Route path="/create">
              <BreadcrumbsItem href="/create" text="Create issue" />
            </Route>
            <Route path="/react-commons">
              <BreadcrumbsItem href="/react-commons" text="React Commons" />
            </Route>
          </BreadcrumbsStateless>
          <h1>Jira issues</h1>
          <Route exact path="/">
            <NavLink to="/react-commons">
              <Button appearance="primary" data-test="react-commons-button" className="react-commons-button">
                  React Commons
              </Button>
            </NavLink>
          </Route>
        </header>
        <main>
          <UnnamedBlock {...props} />
          <ReactCommon />
          <Route exact path="/">
            <Statistics />
          </Route>
          <Route exact path="/create">
            <CreatePage />
          </Route>
        </main>
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    sortTable: value => dispatch(sortTable(value)),
    userFetchReq: data => dispatch(userFetchReq(data)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
