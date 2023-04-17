// Actions
async function requestEndTurn() {
    try {
        const response = await fetch(`/api/plays/endturn`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PATCH"
      });
      return {successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestCloseScore() {
    try {
        const response = await fetch(`/api/scores/auth/close`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PATCH"
      });
      return {successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestBoard() {
    try
    {
        console.log("Error here perhaps?");
        const response = await fetch (`/api/board/auth`);
        console.log("It managed to go thro");
        let result = await response.json();

        return {
            successful: response.status == 200,
            unauthenticated: response.status == 401,
            matchBoard: result
        };

    } catch (err) {
        console.log(err);
        return {err: err};
    }
}

async function requestDecks() {
    try{
        console.log("Error here perhaps?");
        const response = await fetch(`/api/deck/auth`);
        console.log("It managed to go thro");
        let result = await response.json();
        return {
            successful: response.status == 200,
            unauthenticated: response.status == 401,
            matchDecks: result
         };
    } catch (err) {
        //500 error code here
        console.log(err);
        return {err: err};  
    }
}


async function requestPlayCard(deckId) {
    try {
        const response = await fetch(`/api/deck/play`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PATCH",
          body: JSON.stringify({
            deckId: deckId
        })
      });
      let result = await response.json();
      return {successful: response.status == 200, msg: result.msg};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

