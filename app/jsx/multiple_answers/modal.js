import $ from 'jquery'
import 'jqueryui/dialog'
import ReactDOM from 'react-dom'

export default class Modal {
  constructor() {
    this.content = document.createElement('div')

    $(this.content).dialog({
      title: 'Copy Answers',
      // if there's no react component, ReactDOM simply returns false
      beforeClose: () => ReactDOM.unmountComponentAtNode(this.content)
    })
  }

  close() {
    $(this.content).dialog('close')
  }
}
