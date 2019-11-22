import React from 'react';
import Button from '@atlaskit/button';
import { ContextData } from './main-context-component';

function ComponentLevel3() {
    const changedData = {
        field1: 'Who changed me?',
        isChanged: true,
        componentLevel: 3
    }
    return <ContextData.Consumer>{contData => <React.Fragment>
        <h2>Component Level 3</h2>
        <br />
        <Button
            appearance="default"
            className="home-button"
            onClick={() => contData.changeField1(changedData)}
        >
            Level 3 Button
        </Button>
    </React.Fragment>}
    </ContextData.Consumer>
}

export default ComponentLevel3;