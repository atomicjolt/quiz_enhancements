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

      const isCorrect = $(this).hasClass('correct_answer')

      if (!options.hasOwnProperty(varName)) {
        options[varName] = []
      }
      options[varName].push({text, comment, isCorrect})
    })

  return options
}

export function gatherQuestionType($button) {
  return $button
    .closest('.question')
    .find('.question_type')
    .val()
}

// based on logic in $('.delete_answer_link').click() in canvas
export function gatherWillDisableRegrade($button) {
  const $holder = $button.closest('.question_holder')
  const $regradeOpt = $holder.find('span.regrade_option')

  const disabled = $regradeOpt.text() === 'disabled'
  const isNew = $holder.find('#question_new').length > 0
  const hasSubmissions = !!$('#student_submissions_warning').length

  return hasSubmissions && !disabled && !isNew
}
