const loggedReducer = (state = {loggedIn: false, id: ""}, action:any) => {
    switch (action.type) {
      case "LOG_IN":
        return {loggedIn: true, id: action.payload.id};
      case "LOG_OUT":
        return state;
      default:
        return state;
    }
  };
  
  export default loggedReducer;