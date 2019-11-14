// @flow

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { sortTable, userFetchReq } from './store/actions';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import './App.css';
import CreatePage from './components/create-page';
import UnnamedBlock from './components/unnamed-block';

export function App(props: any) {
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
          </BreadcrumbsStateless>
          <h1>Jira issues</h1>
        </header>
        <main>
          <UnnamedBlock {...props} />
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
    sortTable: value => dispatch(sortTable(value)),
    userFetchReq: data => dispatch(userFetchReq(data)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
