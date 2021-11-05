import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Like extends React.Component {
    render() { 
        let classes = "fa f-heart";
        if (!this.props.liked) classes += "-o";

        return (
       
            <i onclick={this.props.onLike} className={classes} aria-hidden="true" m-2></i>
        );
    }
}
 
export default Like;