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

import makeFormAnswer from './make_form_answer'

export default function copyAnswers(currentVar, currentVarIndex, selectedOptions, $answers) {
  const baseAnswer = {
    comments: 'Response if the student chooses this answer',
    answer_type: 'short_answer',
    question_type: 'fill_in_multiple_blanks_question',
    blank_id: currentVar,
    blank_index: currentVarIndex
  }

  selectedOptions.forEach(option => {
    const $answer = makeFormAnswer({
      ...baseAnswer,
      answer_text: option
    })

    $answers.append($answer)
  })
}
