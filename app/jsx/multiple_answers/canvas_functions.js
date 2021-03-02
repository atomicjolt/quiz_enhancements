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

export function makeFormAnswer(data) {
  const {quiz} = window
  const answer = $.extend({}, quiz.defaultAnswerData, data)
  const $answer = $('#form_answer_template')
    .clone(true)
    .attr('id', '')
  $answer
    .find('.answer_type')
    .hide()
    .filter('.' + answer.answer_type)
    .show()
  // answer.answer_weight = numberHelper.parse(answer.answer_weight)

  if (isNaN(answer.answer_weight)) {
    answer.answer_weight = 0
  }
  quiz.updateFormAnswer($answer, answer, true)
  $answer.show()
  return $answer
}

export function disableRegrade($holder) {
  $holder.find('.regrade_enabled').hide()
  $holder.find('.regrade_disabled').show()
  $holder.find('input[name="regrade_option"]').attr('disabled', true)
  $holder.find('input[name="regrade_option"]').attr('checked', false)
  $holder.find('input[name="regrade_disabled"]').val('1')
  // Added this one to prevent the modal from opening
  $holder.find('span.regrade_option').text('disabled')
}
