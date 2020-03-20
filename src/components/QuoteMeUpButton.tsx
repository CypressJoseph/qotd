import React from 'react';
type Props = {
  disabled?: boolean
  onClick: Function
}
export default class QuoteMeUpButton extends React.Component<Props> {
  render() {
    return <button
      disabled={!!this.props.disabled}
      className='LoadQuoteButton btn btn-primary'
      onClick={(e) => this.props.onClick()}
    >
      {this.props.children}
    </button>
  }
}
