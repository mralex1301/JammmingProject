let accessToken
const clientID = '91d55c4a198c40829bba97190bd5282a';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){ 
        if(accessToken){
            return accessToken;
        }
        const urlToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpires = window.location.href.match(/expires_in=([^&]*)/);
        if(urlToken && urlExpires){
            accessToken = urlToken[1];  
            const expiresIn = Number(urlExpires[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        }else{
          const redirect =  `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = redirect;

        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            return response.json()
            console.log(response.json)
            
        })
        .then((jsonResponse) => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name, 
                artist: track.artists[0].name,
                album: track.album.uri,

                
            } ))
        })

    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers }
        ).then(response => response.json()

        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                        {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        })
                });
        })
    }
    }

    

    


export default Spotify;