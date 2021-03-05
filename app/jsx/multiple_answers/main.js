import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './modal'
import {
  gatherCurrentVar,
  gatherVars,
  gatherOptions,
  gatherQuestionType,
  gatherWillDisableRegrade,
  $answersHolder
} from './gather_data'
import SelectAnswers from './select_answers'
import {copyAnswers, deleteCurrentAnswers} from './edit_answers'
import {disableRegrade} from './canvas_functions'

$(() => {
  $('.multi_answer_sets .blank_id_select').after(
    '<button class="btn btn-small aj_copy_answers_button">Copy Answers</button>'
  )

  $('#questions').delegate('.aj_copy_answers_button', 'click', function(e) {
    e.preventDefault()

    const $question = $(this).closest('.question_holder')

    const {id: currentVar, index: currentVarIndex} = gatherCurrentVar($question)
    const vars = gatherVars($question)
    const options = gatherOptions($question)
    const questionType = gatherQuestionType($question)
    const willDisableRegrade = gatherWillDisableRegrade($question)

    const $answers = $answersHolder($question)

    const modal = new Modal({title: 'Copy Answers', width: 600})

    ReactDOM.render(
      <SelectAnswers
        vars={vars}
        options={options}
        onCancel={() => modal.close()}
        onSubmit={selectedOptions => {
          if (willDisableRegrade) {
            disableRegrade($question)
          }
          deleteCurrentAnswers($(this), currentVarIndex)
          copyAnswers(questionType, currentVar, currentVarIndex, selectedOptions, $answers)
          modal.close()
        }}
      />,
      modal.content
    )
  })
})
