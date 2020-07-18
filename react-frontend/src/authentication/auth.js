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

    if(localStorage.getItem("token")){
        return true;
    }
    else{
        return false;
    }
}