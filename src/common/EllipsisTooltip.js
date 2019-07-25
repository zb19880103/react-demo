import React from 'react'
import { Tooltip } from 'antd';

class EllipsisTooltip extends React.Component {
  state = {
    visible: false
  }
  handleVisibleChange = (visible) => {
    if (this.container.clientWidth < this.container.scrollWidth) {
      this.setState({
        visible: visible
      })
    }
  }
  render () {
    const style = {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      ...this.props.style
    }
    return (
      <Tooltip visible={this.state.visible} onVisibleChange={this.handleVisibleChange} title={this.props.title}>
        <div ref={node => this.container = node} style={style}>{this.props.children}</div>
      </Tooltip>
    )
  }
}
export default EllipsisTooltip
