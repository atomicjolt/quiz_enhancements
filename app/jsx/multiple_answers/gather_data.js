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

export function gatherCurrentVar($button) {
  const $select = $button.parent().find('.blank_id_select')

  return {
    id: $select.val(),
    index: $select[0].selectedIndex
  }
}

export function gatherVars($button) {
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

export function gatherOptions($button) {
  const options = {}

  $button
    .closest('.text')
    .find('.form_answers .answer')
    .each(function() {
      const varName = $(this)
        .find('.blank_id')
        .text()

      const text = $(this)
        .find('.short_answer input')
        .val()

      const comment = $(this)
        .find('.comment input[name=answer_comment_html]')
        .val()

      if (!options.hasOwnProperty(varName)) {
        options[varName] = []
      }
      options[varName].push({text, comment})
    })

  return options
}
