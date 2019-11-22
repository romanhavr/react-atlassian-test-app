import React from 'react';
import Button from '@atlaskit/button';
import { ContextData } from './main-context-component';
import ComponentLevel3 from './component-level-3';

function ComponentLevel2() {
    const changedData = {
        field1: 'Why was I changed?',
        isChanged: true,
        componentLevel: 2
    }
    return <ContextData.Consumer>{contData => <React.Fragment>
        <h2>Component Level 2</h2>
        <Button
            appearance="default"
            className="home-button"
            onClick={() => contData.changeField1(changedData)}
        >
            Level 2 Button
        </Button>
        <br />
        <ComponentLevel3 />
    </React.Fragment>}
    </ContextData.Consumer>
}

export default ComponentLevel2;