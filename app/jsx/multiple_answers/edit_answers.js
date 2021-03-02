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

import {makeFormAnswer} from './canvas_functions'

function determineWeight(questionType, isCorrect) {
  if (questionType === 'fill_in_multiple_blanks_question') {
    return 0
  }

  return isCorrect ? 100 : 0
}

export function copyAnswers(questionType, currentVar, currentVarIndex, selectedOptions, $answers) {
  const baseAnswer = {
    comments: 'Response if the student chooses this answer',
    answer_type: 'short_answer',
    question_type: questionType,
    blank_id: currentVar,
    blank_index: currentVarIndex
  }

  selectedOptions.forEach(({text, comment, isCorrect}) => {
    const $answer = makeFormAnswer({
      ...baseAnswer,
      answer_text: text,
      answer_comment_html: comment,
      answer_weight: determineWeight(questionType, isCorrect)
    })

    $answers.append($answer)
  })
}

export function deleteCurrentAnswers($button, currentVarIndex) {
  $button
    .closest('.text')
    .find(`.answer_idx_${currentVarIndex} .delete_answer_link`)
    .click()
}
