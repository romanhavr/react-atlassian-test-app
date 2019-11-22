import React from 'react';
import { Route, NavLink } from "react-router-dom";
import Button from '@atlaskit/button';
import Tabs from '@atlaskit/tabs';
import '../styles/react-commons.css';
import MainContextComponent from './main-context-component';
import LifecycleMethods from './lifecycle-methods';

class ReactCommon extends React.Component {
    
    render() {
        const tabs = [
            { label: 'Context', content: <MainContextComponent /> },
            { label: 'Lifecycle Methods', content: <LifecycleMethods /> },
            // { label: 'Tab 3', content: <Content>Three</Content> },
            // { label: 'Tab 4', content: <Content>Four</Content> },
        ]
        return <Route exact path="/react-commons">
            <NavLink to="/">
                <Button appearance="primary" data-test="home-button" className="home-button">
                    Issues Table
                </Button>
            </NavLink>
            <br />
            <Tabs tabs={tabs} />
        </Route>
    }
}

export default ReactCommon;