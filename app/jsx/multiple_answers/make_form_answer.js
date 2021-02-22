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

const quiz = {
  defaultAnswerData: {
    answer_type: 'select_answer',
    answer_comment: '',
    answer_weight: 0,
    numerical_answer_type: 'exact_answer',
    answer_exact: '0',
    answer_error_margin: '0',
    answer_range_start: '0',
    answer_range_end: '0',
    answer_approximate: '0',
    answer_precision: '10'
  }
}

export default function makeFormAnswer(data) {
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

  // if (isNaN(answer.answer_weight)) {
  //   answer.answer_weight = 0
  // }
  answer.answer_weight = 0
  quiz.updateFormAnswer($answer, answer, true)
  $answer.show()
  return $answer
}
