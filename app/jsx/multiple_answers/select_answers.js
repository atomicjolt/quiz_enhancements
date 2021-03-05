import React, {useState} from 'react'
import PropTypes from 'prop-types'

export default function CopyAnswers(props) {
  const {vars, options, onCancel, onSubmit} = props

  const [selectedVar, setSelectedVar] = useState(vars[0])
  const currentOptions = options[selectedVar]

  const formSubmit = e => {
    e.preventDefault()
    onSubmit(currentOptions)
  }

  if (!vars.length) {
    return <p>There are no other variables to copy answers from.</p>
  }

  return (
    <form className="form-dialog" onSubmit={formSubmit}>
      <p>
        Please choose a variable to copy answers from. This will replace any answers in the current
        variable
      </p>

      <div>
        <label htmlFor="selected_variable">
          Choose Variable &nbsp;
          <select
            id="selected_variable"
            value={selectedVar}
            onChange={e => setSelectedVar(e.target.value)}
          >
            {vars.map(varName => (
              <option key={varName} value={varName}>
                {varName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <strong>Answers:</strong>
      <div className="aj_copy_answer_scroll_container">
        {currentOptions.map(({text}, i) => (
          <p key={`${i}-${text}`}>{text}</p>
        ))}
      </div>

      <div className="form-controls">
        <button type="button" className="btn dialog_closer" onClick={onCancel}>
          Cancel
        </button>
        &nbsp;
        <input
          id="newGroupSubmitButton"
          type="submit"
          value="Save"
          className="btn btn-primary"
          data-text-while-loading="Saving..."
        />
      </div>
    </form>
  )
}

CopyAnswers.propTypes = {
  vars: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        comment: PropTypes.string,
        isCorrect: PropTypes.bool
      })
    )
  ).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
