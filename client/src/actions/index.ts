export const logIn = (id:string) => {
    return {
      type: "LOG_IN",
      payload: {id: id}
    };
  };
  
  export const logOut = () => {
    return {
      type: "LOG_OUT",
      payload: {id: ""}
    };
  };
  
// const res = await axios.get('http://locahost:5000/route-here')
