import React from "react"
import PropTypes from "prop-types"
import { withStyles, Typography } from "@material-ui/core"
import SearchInput from "./SearchInput"
import ResultElement from "./ResultElement";

const styles = theme => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  containerCenter: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  results: {
    display: "flex",
    flexFlow: "row wrap",
    flex: 1,
    width: "100%",
  }
})
const Search = ({ handleSearch, query, results, goPost, classes }) => {
  return query !== "" ? (
    <div
      className={classes.container}
    >
      <SearchInput onSearch={handleSearch} query={query} />
      <div className={classes.results}>
        {results.length > 0 ? (
          results.map(result => <ResultElement key={`${result.type}-${result.id}`} {...result} goPost={goPost} />)
        ) : (
          <Typography variant="h5">No se encuentran resultados para <Typography variant="body1">{query}</Typography></Typography>
        )}
      </div>
    </div>
  ) : (
    <div
      className={classes.containerCenter}
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

export default withStyles(styles)(Search)
