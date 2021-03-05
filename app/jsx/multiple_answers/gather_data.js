import $ from 'jquery'

function $varSelect($question) {
  return $question.find('.question_form .blank_id_select')
}

export function $answersHolder($question) {
  return $question.find('.form_answers')
}

export function gatherCurrentVar($question) {
  const $select = $varSelect($question)

  return {
    id: $select.val(),
    index: $select[0].selectedIndex
  }
}

export function gatherVars($question) {
  return $varSelect($question)
    .find('option')
    .not('.shown_when_no_other_options_available')
    .not(':selected')
    .map(function() {
      return this.innerText
    })
    .toArray()
}

export function gatherOptions($question) {
  const options = {}

  $answersHolder($question)
    .find('.answer')
    .each(function() {
      const varName = $(this)
        .find('.blank_id')
        .text()

      // short is for fitb
      const text = $(this)
        .find('.short_answer input')
        .val()

      const comment = $(this)
        .find('.comment input[name=answer_comment_html]')
        .val()

      const isCorrect = $(this).hasClass('correct_answer')

      if (!options.hasOwnProperty(varName)) {
        options[varName] = []
      }
      options[varName].push({text, comment, isCorrect})
    })

  return options
}

export function gatherQuestionType($question) {
  return $question.find('select.question_type').val()
}

// based on logic in $('.delete_answer_link').click() in canvas
export function gatherWillDisableRegrade($question) {
  const $regradeOpt = $question.find('span.regrade_option')

  const disabled = $regradeOpt.text() === 'disabled'
  const isNew = $question.find('#question_new').length > 0
  const hasSubmissions = !!$('#student_submissions_warning').length

  return hasSubmissions && !disabled && !isNew
}
