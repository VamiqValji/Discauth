export const logIn = (id:string, email:string) => {
    return {
      type: "LOG_IN",
      payload: {id, email}
    };
  };
  
  export const logOut = () => {
    return {
      type: "LOG_OUT",
      payload: {id: "", email: ""}
    };
  };
  
// const res = await axios.get('http://locahost:5000/route-here')
