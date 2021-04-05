const loggedReducer = (state = {loggedIn: false, id: "", email: ""}, action:any) => {
    switch (action.type) {
      case "LOG_IN":
        return {loggedIn: true, id: action.payload.id, email: action.payload.email};
      case "LOG_OUT":
        return {loggedIn: false, id: action.payload.id, email: action.payload.email};
      default:
        return state;
    }
  };
  
  export default loggedReducer;