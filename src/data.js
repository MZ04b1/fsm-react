export default {
  initialState: 'off',
  off: {
    actions: {
      onEnter() {},
      onExit() {},
    },
    transitions: {
      flick: {
        target: 'on',
        action() {},
      },
    },
  },
  on: {
    actions: {
      onEnter() {},
      onExit() {},
    },
    transitions: {
      flick: {
        target: 'off',
        action() {},
      },
    },
  },
};
