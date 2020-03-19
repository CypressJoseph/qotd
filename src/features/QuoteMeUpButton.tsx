import React from 'react';
type Props = { onClick: Function }
export default class QuoteMeUpButton extends React.Component<Props> {
  render() {
    return <button
      className='the-quote-button'
      onClick={(e) => this.props.onClick()}
    >
      give me that quote
    </button>
  }
}
