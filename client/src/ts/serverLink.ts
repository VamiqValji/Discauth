const production = true;
let url:string;

if (production) {
    url = "https://discauthapp.herokuapp.com";
} else {
    url = "http://localhost:3001";
}

export default url;