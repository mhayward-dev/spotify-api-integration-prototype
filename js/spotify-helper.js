document.addEventListener('DOMContentLoaded', function () {
    getNowPlaying();
});

function getToken() {
    return axios({
        method: 'get',
        url: 'http://localhost:5001/markhaywardtech/europe-west2/getSpotifyToken',
    })
        .then(function (response) {
            return response.data.access_token;
        });
}

function showNowPlaying(song) {
    const notPlayingEl = document.querySelector('.song-not-playing');
    const songPlayingEl = document.querySelector('.song-is-playing');

    notPlayingEl.style.display = 'none';
    songPlayingEl.style.display = 'block';

    const artworkEl = document.querySelector('.song-artwork');
    artworkEl.src = song.albumImageUrl;

    const titleEl = document.querySelector('.song-title');
    titleEl.textContent = song.title;

    const artistEl = document.querySelector('.song-artist');
    artistEl.textContent = song.artist;

    const albumEl = document.querySelector('.song-album');
    albumEl.textContent = song.album;
}

async function getNowPlaying() {
    const token = await getToken();
    //console.log(token);

    return axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(function (response) {
        if (response.status === 204 || response.status > 400) {
            // song is not playing or there is an issue
            console.log("not playing");
            return;
        }

        const song = response.data;

        showNowPlaying({
            isPlaying: song.is_playing,
            title: song.item.name,
            artist: song.item.artists.map((_artist) => _artist.name).join(', '),
            album: song.item.album.name,
            albumImageUrl: song.item.album.images[0].url,
            songUrl: song.item.external_urls.spotify
        });
    });
}