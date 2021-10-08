document.addEventListener('DOMContentLoaded', function () {
    getNowPlaying();
});

function getToken() {
    return new Promise(resolve => {
        // get token from Firebase Dev
        axios({
            method: 'get',
            url: 'http://localhost:5001/markhaywardtech/europe-west2/getSpotifyToken',
        })
            .then(function (response) {
                resolve(response.data.access_token);
            });
    });
}

async function getNowPlaying(token) {
    var x = await getToken();
    console.log(x);
}