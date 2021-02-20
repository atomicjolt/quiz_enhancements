import $ from 'jquery'
import 'jqueryui/dialog'
import ReactDOM from 'react-dom'

export default class Modal {
  constructor(options) {
    this.content = document.createElement('div')

    const {width, title} = options
    $(this.content).dialog({
      // if there's no react component, ReactDOM simply returns false
      beforeClose: () => ReactDOM.unmountComponentAtNode(this.content),
      title,
      width
    })
  }

  close() {
    $(this.content).dialog('close')
  }
}
