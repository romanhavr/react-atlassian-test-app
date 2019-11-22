import React from 'react';
import Button from '@atlaskit/button';
import ComponentLevel2 from './component-level-2';
import { ContextData } from './main-context-component';

function ComponentLevel1() {
    const changedData = {
        field1: 'Am I changed?',
        isChanged: true,
        componentLevel: 1
    }
    return <ContextData.Consumer>{contData => <React.Fragment>    
        <h2>Component Level 1</h2>
        <Button
            appearance="default"
            className="home-button"
            onClick={() => contData.changeField1(changedData)}
        >
            Level 1 Button
        </Button>
        <br />
        <ComponentLevel2 />
        </React.Fragment>}
    </ContextData.Consumer>
}

export default ComponentLevel1;