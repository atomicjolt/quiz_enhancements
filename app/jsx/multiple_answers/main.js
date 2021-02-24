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
import React from 'react'
import ReactDOM from 'react-dom'
import createModal from './modal'
import {gatherVars, gatherOptions} from './gather_data'
import CopyAnswers from './copy_answers'

$(() => {
  $('.multi_answer_sets .blank_id_select').after(
    '<button class="aj_copy_answers_button">Copy Answers</button>'
  )

  $('#questions').delegate('.aj_copy_answers_button', 'click', function(e) {
    e.preventDefault()

    const vars = gatherVars($(this))
    const options = gatherOptions($(this))

    const modalContent = createModal()

    ReactDOM.render(<CopyAnswers vars={vars} options={options} />, modalContent)
  })
})
