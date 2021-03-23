const loggedReducer = (state = {loggedIn: false, id: ""}, action:any) => {
    switch (action.type) {
      case "LOG_IN":
        return {loggedIn: true, id: action.payload.id};
      case "LOG_OUT":
        return {loggedIn: false, id: action.payload.id};
      default:
        return state;
    }
  };
  
  export default loggedReducer;