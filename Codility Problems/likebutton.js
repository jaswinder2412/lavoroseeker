import cx from 'classnames';
import { Component } from 'react';

export default class LikeButton extends Component {
    constructor(){
        super();
        this.likes=100
        this.state = {
            'number' : 100,
            'classAddition':false
        }
    }

    handleOnchange = (e)=>{
            var classes = e.target.className;
            if(!classes.includes('liked')){
                 this.setState({
            'number' : this.state.number+1,
            'classAddition':true
        })
            }else { 
                  this.setState({
            'number' : this.state.number-1,
            'classAddition':false
        })
                
            }
    }

    render() {
        return (
            <>
                <div>
                    <h2><button  type='button' className={this.state.classAddition ? `like-button liked` : `like-button`} onClick={this.handleOnchange}>Like | <span classname='likes-counter'>{this.state.number} </span></button></h2>
                </div>
                <style>{`
                    .like-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                   .liked {
                        font-weight: bold;
                        color: #1565c0;
                   }
                `}</style>
            </>
        );
    }
}
