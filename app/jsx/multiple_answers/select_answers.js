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

  return (
    <form onSubmit={formSubmit}>
      <p>
        Please choose a variable to copy answers from. This will replace any answers in the current
        variable
      </p>
      <select value={selectedVar} onChange={e => setSelectedVar(e.target.value)}>
        {vars.map(varName => (
          <option key={varName} value={varName}>
            {varName}
          </option>
        ))}
      </select>
      <ul>
        {currentOptions.map(({text}, i) => (
          <li key={`${i}-${text}`}>{text}</li>
        ))}
      </ul>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <input type="submit" value="Submit" />
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
