import React from 'react';
import Button from '@atlaskit/button';
import '../styles/react-commons.css';
import ComponentLevel1 from './component-level-1';

export const ContextData = React.createContext()

class MainContextComponent extends React.Component {
    state = {
        field1: 'Field 1 string data',
        componentLevel: null,
        isChanged: false,
        changeField1: changedData => this.setState(changedData)
    }

    render() {
        const changedBy = (level) => <span>
            Was changed by component of level <b>{level}</b>.
        </span>
        return <div className="tabs">
            <div><b>Context data:</b> {this.state.field1}</div>
            {this.state.isChanged ?
                changedBy(this.state.componentLevel) :
                'It is original value.'}
            <br />
            {this.state.isChanged && 
            <Button
                appearance="secondary"
                className="home-button"
                onClick={() => this.state.changeField1({
                    field1: 'Field 1 string data',
                    componentLevel: null,
                    isChanged: false
                })}
            >
                Restore default
            </Button>}
            <br />
            <ContextData.Provider value={this.state}>
                <ComponentLevel1 />
            </ContextData.Provider>
        </div>
    }
}

export default MainContextComponent;