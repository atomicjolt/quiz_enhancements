import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './modal'
import SelectAnswers from './select_answers'
import DomManager from './dom_manager'
import {disableRegrade} from './canvas_functions'

$(() => {
  $('.multi_answer_sets .blank_id_select').after(
    '<button class="btn btn-small aj_copy_answers_button">Copy Answers</button>'
  )

  $('#questions').delegate('.aj_copy_answers_button', 'click', function(e) {
    e.preventDefault()

    const dom = new DomManager(this)
    const {otherVars, allAnswers, willDisableRegrade} = dom

    const modal = new Modal({title: 'Copy Answers', width: 600})

    ReactDOM.render(
      <SelectAnswers
        vars={otherVars}
        answers={allAnswers}
        onCancel={() => modal.close()}
        onSubmit={selectedAnswers => {
          // if we don't disable regrading, it will open a confirm dialog once
          // for each answer we delete
          if (willDisableRegrade) {
            disableRegrade(dom.$q)
          }
          dom.deleteCurrentAnswers()
          dom.copyAnswers(selectedAnswers)
          modal.close()
        }}
      />,
      modal.content
    )
  })
})
