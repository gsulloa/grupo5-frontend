import React from "react"
import PropTypes from "prop-types"
import SearchInput from "./SearchInput"

const Search = ({ handleSearch, query, results }) => {
  return query !== "" ? (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flex: 1,
      }}
    >
      <SearchInput onSearch={handleSearch} query={query} />
      {results.length > 0 ? (
        results.map((result, i) => <p key={i}>{result}</p>)
      ) : (
        <p>No resu</p>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <SearchInput onSearch={handleSearch} query={query} />
    </div>
  )
}
Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.string,
  results: PropTypes.array,
}
Search.defaultProps = {
  query: "",
  results: [],
}

export default Search
