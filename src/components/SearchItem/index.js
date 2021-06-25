import {Component} from 'react'
import './index.css'

class SearchItem extends Component {
  render() {
    const {searchDetails, updateSearchInput} = this.props
    const {stateCode, stateName} = searchDetails
    const onClickArrow = () => {
      updateSearchInput(stateCode, stateName)
    }

    return (
      <li className="search-list-container">
        <p className="code">{stateCode}</p>
        <p className="name">{stateName}</p>
        <button className="button" type="button" onClick={onClickArrow}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
            className="arrow-image"
            alt="arrow"
          />
        </button>
      </li>
    )
  }
}

export default SearchItem
