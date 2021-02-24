import React from 'react';

import createMachine from './fsm';
import stateMachineDefinition from './data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.machine = createMachine(stateMachineDefinition);
    this.state = getReactState(stateMachineDefinition);
    this.transitionHandler = this.transitionHandler.bind(this);
  }

  transitionHandler(transition) {
    return () => {
      this.machine.transition(this.machine.value, transition);
      this.setState({
        ...this.setState,
        machineCurrentState: this.machine.value,
      });
    };
  }

  render() {
    const { machineCurrentState, machineStates } = this.state;

    return (
      <React.Fragment>
        <div className="title">Visualizer</div>
        <div className="content">
          <div className="transitions">
            <div className="title">Transitions</div>
            {machineStates[machineCurrentState].transitions.map(transition => (
              <button
                key={transition}
                onClick={this.transitionHandler(transition)}
              >
                {transition}
              </button>
            ))}
          </div>
          <div className="Machine-states">
            {Object.keys(machineStates).map(machineState => (
              <div
                key={machineState}
                className={machineState === machineCurrentState ? 'active' : ''}
              >
                {machineState}
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function getReactState(stateMachineDefinition) {
  return Object.keys(stateMachineDefinition).reduce(
    (acc, curr) => {
      if (curr !== 'initialState') {
        acc.machineStates[curr] = {
          transitions: Object.keys(stateMachineDefinition[curr].transitions),
        };
      }

      return acc;
    },
    {
      machineCurrentState: stateMachineDefinition.initialState,
      machineStates: {},
    }
  );
}

export default App;
