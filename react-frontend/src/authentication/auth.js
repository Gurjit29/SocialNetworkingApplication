export const SignOut = () => {

    return fetch(`http://localhost:8080/signout`, {
            method: "POST",
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then((data) => {

                console.log(data.message);

                window.localStorage.clear();
            });


}

export const isLoggedIn = () => {
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("userInfo")){

        /**
         * Sample Data ====>
         * 
         * token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTBkOGRmNTJlNzczMDQxZjE1Yzc3NyIsImlhdCI6MTU5NTA5MDA5MiwiZXhwIjoxNTk1MDkwMzkyfQ.4yh90uOSKtk_RN52L7N_1W5AvJNMojXOmOtkY9HCEMs"
            user: {
                _id: "5f10d8df52e773041f15c777", 
                name: "Peter", 
                email: "peter@gmail.com"
            }
         */
        console.log(JSON.parse(localStorage.getItem("userInfo")).user._id)

        //return local storage info
        return JSON.parse(localStorage.getItem("userInfo"));
    }
    else{
        return false;
    }
}

/**
 * https://www.w3schools.com/js/tryit.asp?filename=tryjson_parse --convert json to JSON object and then retrieve data
 */