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
import Modal from './modal'
import {gatherCurrentVar, gatherVars, gatherOptions, gatherQuestionType} from './gather_data'
import SelectAnswers from './select_answers'
import copyAnswers from './copy_answers'

$(() => {
  $('.multi_answer_sets .blank_id_select').after(
    '<button class="aj_copy_answers_button">Copy Answers</button>'
  )

  $('#questions').delegate('.aj_copy_answers_button', 'click', function(e) {
    e.preventDefault()

    const {id: currentVar, index: currentVarIndex} = gatherCurrentVar($(this))
    const vars = gatherVars($(this))
    const options = gatherOptions($(this))
    const questionType = gatherQuestionType($(this))

    const $answers = $(this)
      .closest('.text')
      .find('.form_answers')

    const modal = new Modal()

    ReactDOM.render(
      <SelectAnswers
        vars={vars}
        options={options}
        onCancel={() => modal.close()}
        onSubmit={selectedOptions => {
          copyAnswers(questionType, currentVar, currentVarIndex, selectedOptions, $answers)
          modal.close()
        }}
      />,
      modal.content
    )
  })
})
