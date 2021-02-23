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

function gatherVars($button) {
  return $button
    .parent()
    .find('.blank_id_select option')
    .not('.shown_when_no_other_options_available')
    .not(':selected')
    .map(function() {
      return this.innerText
    })
    .toArray()
}

$(() => {
  $('.multi_answer_sets .blank_id_select').after(
    '<button class="aj_copy_answers_button">Copy Answers</button>'
  )

  $('#questions').delegate('.aj_copy_answers_button', 'click', function(e) {
    e.preventDefault()

    const vars = gatherVars($(this))

    console.log(vars)
  })
})
