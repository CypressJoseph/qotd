import React, { Component } from "react";
export class Header extends Component<{ onClick: () => void }> {
    render() {
        return <header className="App-header">
            <div className="App-logo" onClick={(e) => this.props.onClick()}>
                quotr
        </div>
                   </header>;
    }
}
