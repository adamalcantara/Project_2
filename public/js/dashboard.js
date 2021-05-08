// const { response } = require("express");

// const { response } = require("express");

const userFetcher = async (event, userId) => {
    console.log(userId);
    event.preventDefault();
    let currentUserPref;
    let currentUserGenre;
    let currentUsersMatches;
    await fetch(`/api/users/${userId}`).then(data => data.json()).then(x => {
        currentUserPref = x.user.gender_pref;
        currentUserGenre = x.user.genre;
    });
    await fetch(`/api/users/${currentUserPref}/${currentUserGenre}`).then(data => data.json()).then(x => {
        currentUsersMatches = x.data;
    });
    console.log(currentUsersMatches);
    if (currentUsersMatches.ok) {
        console.log("Into the garbage chute, flyboy")
        document.location.replace('/profiles');
    } else {
        alert('Failed to get matches');
    }

    // const filterdData = await fetch('api/users/')
    // document.location.reload()
}

// document.querySelector("#get-matches").addEventListener("click", userFetcher)

//Main dash button route
const main = async () => {
    console.log("Rattle your jewelry")
    document.location.replace('/dashboard')
}

document.querySelector('#dash').addEventListener('click', main);

//logout route
const logout = async () => {
    console.log("Leaving now")
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

document.querySelector('#logout').addEventListener('click', logout);


//going to the update page
const update = async () => {
    console.log("Are you there, God?  It's me, Fiona")
    document.location.replace('/updateprofile')
}

document.querySelector('#update').addEventListener('click', update);

//this is our update route
const test = async () => {
    console.log("Clicky click")
    const userBio = document.getElementById('bioInput').value;
    const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            bio: userBio || ''
        })
    });

    if (response.ok) {
        console.log("Congratulations, you did it!")
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update bio.');
    }
}

  // document.querySelector('#updateBtn').addEventListener('click', test);

//Going to the delete page
const settings = async () => {
    console.log("Pull the lever, kronk")
    document.location.replace('/settings')
}

document.querySelector('#settings').addEventListener('click', settings);

//Delete route
const byeForNow = async () => {
    console.log("Come with me, and you'll be in a world of OSHA violations")
    const byeResponse = await fetch('/api/users/bye', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (byeResponse.ok) {
        console.log("We're Sgt. Pepper's Lonely Heart's Club Band, we're sorry but it's time to go");
        //TERMINATE THE SESSION HERE
        document.location.replace('/');
    } else {
        alert('You can check out any time you like, but you can never leave');
    }
}