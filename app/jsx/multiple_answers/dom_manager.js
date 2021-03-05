import $ from 'jquery'
import {makeFormAnswer} from './canvas_functions'

export default class DomManager {
  constructor(copyAnswersButton) {
    this.$q = $(copyAnswersButton).closest('.question_holder')
  }

  get $varSelect() {
    return this.$q.find('.question_form .blank_id_select')
  }

  get $answersHolder() {
    return this.$q.find('.form_answers')
  }

  get selectedVar() {
    return {
      id: this.$varSelect.val(),
      index: this.$varSelect[0].selectedIndex
    }
  }

  get otherVars() {
    return this.$varSelect
      .find('option')
      .not('.shown_when_no_other_options_available')
      .not(':selected')
      .map(function() {
        return this.innerText
      })
      .toArray()
  }

  get allAnswers() {
    const options = {}
    this.otherVars.forEach(varName => (options[varName] = []))

    const dom = this
    this.$answersHolder.find('.answer').each(function() {
      const varName = $(this)
        .find('.blank_id')
        .text()

      // short is for fitb
      const text = $(this)
        .find(`.${dom.answerType} input`)
        .val()

      const comment = $(this)
        .find('.comment input[name=answer_comment_html]')
        .val()

      const isCorrect = $(this).hasClass('correct_answer')

      if (options.hasOwnProperty(varName)) {
        options[varName].push({text, comment, isCorrect})
      }
    })

    return options
  }

  get questionType() {
    return this.$q.find('select.question_type').val()
  }

  get answerType() {
    return this.questionType === 'fill_in_multiple_blanks_question'
      ? 'short_answer'
      : 'select_answer'
  }

  // based on logic in $('.delete_answer_link').click() in canvas
  get gatherWillDisableRegrade() {
    const $regradeOpt = this.$q.find('span.regrade_option')

    const disabled = $regradeOpt.text() === 'disabled'
    const isNew = this.$q.find('#question_new').length > 0
    const hasSubmissions = !!$('#student_submissions_warning').length

    return hasSubmissions && !disabled && !isNew
  }

  copyAnswers(selectedOptions) {
    const baseAnswer = {
      comments: 'Response if the student chooses this answer',
      answer_type: this.answerType,
      question_type: this.questionType,
      blank_id: this.selectedVar.id,
      blank_index: this.selectedVar.index
    }

    selectedOptions.forEach(({text, comment, isCorrect}) => {
      const $answer = makeFormAnswer({
        ...baseAnswer,
        answer_text: text,
        answer_comment_html: comment,
        answer_weight: this.determineAnswerWeight(isCorrect)
      })

      this.$answersHolder.append($answer)
    })
  }

  determineAnswerWeight(isCorrect) {
    if (this.questionType === 'fill_in_multiple_blanks_question') {
      return 0
    }

    return isCorrect ? 100 : 0
  }

  deleteCurrentAnswers() {
    this.$q.find(`.answer_idx_${this.selectedVar.index} .delete_answer_link`).click()
  }
}
