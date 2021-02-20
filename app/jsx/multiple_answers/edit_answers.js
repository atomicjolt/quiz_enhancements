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
