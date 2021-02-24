/*
 * Copyright (C) 2021 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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