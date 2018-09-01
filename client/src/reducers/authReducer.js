const initialState = {
  isAuthenticated: false,
  user: {
    user: {}
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
