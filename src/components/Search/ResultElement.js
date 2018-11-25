import React from "react"
import { Button, Card, withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "1 0 25%",
    margin: 25,
    padding: 25,
  },
  content: {
    flex: 1
  }
})

export default withStyles(styles)(({ title, description, type, postId, goPost, classes }) => {
  return (
    <Card className={classes.container}>
      {type === "post" ? (
        <div className={classes.content}>
          <Typography key="title" variant="h5">Titulo: {title}</Typography>
          <Typography key="description" variant="body1">Descripción: {description}</Typography>
          <Typography key="caption" variant="caption">Post</Typography>
        </div>
      ) : (
        <div className={classes.content}>
          <Typography key="description" variant="body1">{description}</Typography>
          <Typography key="caption" variant="caption">{type === "message" ? "Mensaje" : "Respuesta"}</Typography>
        </div>
      )}
      <Button onClick={() => goPost(postId)} color="primary" variant="contained">Ver</Button>
    </Card>
  )
})
