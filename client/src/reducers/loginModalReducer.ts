const loginModalReducer = (state = {active: false}, action:any) => {
    switch (action.type) {
      case "ACTIVATE_loginModal":
        return {active: true};
      case "DEACTIVATE_loginModal":
        return {active: false};
      default:
        return state;
    }
  };
  
  export default loginModalReducer;