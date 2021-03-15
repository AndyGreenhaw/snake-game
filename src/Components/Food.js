import React from 'react';
import cherry from '../images/cherry-one.png'

export default (props) => {

    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }
    return(
        <div className="snake-food" 
            style={style}
        >
            {/* <img className="cherry" src= {cherry} /> */}

        </div>
    )
}