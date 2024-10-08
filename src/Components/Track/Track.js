import './Track.css';
import React from 'react';

class Track extends React.Component{ 
    renderAction(){
        if(this.props.isRemoval){
            return <button className='Track-action' onClick={() => this.props.onRemove(this.props.track)}>-</button>
        }else{
            return <button className='Track-action' onClick={() => this.props.onAdd(this.props.track)}>+</button>
        }
    }



    render(){ 
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>{this.props.track.name}</h3> 
                    <p>{this.props.track.artist} | {this.props.track.album} </p>

                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;