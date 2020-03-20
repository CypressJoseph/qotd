import React from 'react';
type Props = {
  disabled?: boolean
  onInspire: Function
}
export default class QuoteMeUpButton extends React.Component<Props> {
  render() {
    return <button
      disabled={!!this.props.disabled}
      className='LoadQuoteButton btn btn-primary'
      onClick={(e) => this.props.onInspire()}
    >
      {this.props.children}
    </button>
  }
}
