import React from 'react';
import Button from '@atlaskit/button';

class LifecycleMethod extends React.Component {
    constructor() {
        super();

        this.state = {
            isMounted: false,
            isUpdated: false,
            isButtonClicked: false
        }
        this.updateButtonClick = this.updateButtonClick.bind(this)
    }

    componentDidMount() {
        console.log('Component is mounted.')
        this.setState({
            isMounted: true
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Component should update - ')
        console.log('this.state - ', this.state, 'nextState - ', nextState)
        if (this.state !== nextState) {
            console.log('should update TRUE')
            return true
        }else {
            console.log('should update FALSE')
            return false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component did update - ')
        console.log('this.state - ',this.state, 'prevState - ', prevState)
        if (this.state.isButtonClicked !== prevState.isButtonClicked) {
                this.setState({
                isUpdated: true
            })
        }
    }

    componentWillUnmount() {
        console.log('Unmounting component "Lifecycle Methods"...')
    }

    updateButtonClick() {
        console.log('click')
        this.setState((prevState) => ({
            isButtonClicked: !prevState.isButtonClicked
        }))
        console.log('this.state - ',this.state)
    }

    render() {
        console.log('Component is rendered.')
        console.log('this.state - ',this.state)
        return <div className="tabs">
            <h2>Lifecycle Methods</h2>
            {this.state.isMounted && 'Component is already mounted.'}
            <br />
            <Button onClick={this.updateButtonClick}>
                Update component
            </Button>
            <br />
            {this.state.isUpdated && 'Component is updated.'}
        </div>
    }
}

export default LifecycleMethod;

// React component lifecycle has three categories: Mounting, Updating and Unmounting.

// - The render() is the most used lifecycle method.
// It is a pure function.
// You cannot set state in render()

// - The componentDidMount() happens as soon as your component is mounted.
// You can set state here but with caution.

// - The componentDidUpdate() happens as soon as the updating happens.
// You can set state here but with caution.

// - The componentWillUnmount() happens just before the component unmounts and is destroyed.
// This is a good place to cleanup all the data.
// You cannot set state here.

// - The shouldComponentUpdate() can be used rarely.
// It can be called if you need to tell React not to re-render for a certain state or prop change.
// This needs to be used with caution only for certain performance optimizations.

// The two new lifecycle methods are getDerivedStateFromProps() and getSnapshotBeforeUpdate().
// They need to be used only occasionally.