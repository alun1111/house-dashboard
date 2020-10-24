import React, { Component } from 'react';

class InfoPanel extends Component {
    render() {
        return ( 
            <div>
                {
                    this.props.stopLoading
                        ? "Loaded in " + this.props.stopLoading.diff(this.props.startLoading) + "ms"
                        : "loading..." 
                }
            </div>
        )
    };
};

export default InfoPanel