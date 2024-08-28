import React, {useState, setState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import TrackList from '../TrackList/TrackList'
import Track from '../Track/Track'
import Spotify from '../../util/Spotify';



class App extends React.Component {
  const 
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
    playlistName: 'Example Playlist',
    playlistTrack: [],
  }; 
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this)
}
  
  addTrack(track){
    const findTrack = this.state.playlistTrack.find((playlistTrack) => playlistTrack.id === track.id);
    const newTrack = this.state.playlistTrack.concat(track);
    if(findTrack){
      console.log('Track has already been added.')
    }else{ 
      console.log('Track added.')
      this.setState({playlistTrack: newTrack})
    }
  };

  removeTrack(track){
    const present = this.state.playlistTrack.filter(
      (playlistTrack) => playlistTrack.id !== track.id);
      this.setState({playlistTrack: present});
      console.log('Track has been removed.');
  };
    
  updatePlaylistName(name){
    this.setState({playlistName:name})
  };

  savePlaylist(){
    const trackURIs = this.state.playlistTrack.map((track) => track.uri)
    const name = this.state.playlistName; 
    Spotify.savePlaylist(name,trackURIs).then(() => { 
      this.setState({
        playlistName: 'New Playlist',
        playlistTrack: [],
      })
    })
  };

  search(term){ 
    Spotify.search(term).then(result => {
      this.setState({searchResults: result})
    })
    console.log(term)
  }

  render(){
  return (
    <div>

      <h1>
        Ja<span className='highlight'>mmm</span>ing
      </h1>
      <div className='App'>
        {/*Searchbar component*/} 
        <SearchBar onSearch={this.search}/>
      <div className='App-playlist'>
        {/* //Searchresult component  */}
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        {/* //Playlist component  */}
        <Playlist playlistName={this.state.playlistName} 
        playlistTrack={this.state.playlistTrack}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist}/>
      </div>
      </div>
    </div>
    
  );
}}

export default App;
