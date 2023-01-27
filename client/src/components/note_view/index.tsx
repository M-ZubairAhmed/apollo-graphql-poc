import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface Props {
  id: string
  content: string
  category: string
}

function NoteView(props: Props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.id}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Badge pill bg="dark">
          {props.category}
        </Badge>
        <Link to={`/notes/${props.id}`}>
          <Button variant="outline-secondary" size="sm">
            View
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  )
}

export default NoteView
