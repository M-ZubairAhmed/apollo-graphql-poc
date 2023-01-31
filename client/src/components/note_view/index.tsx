import { gql, useMutation } from '@apollo/client'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { GET_ALL_NOTES_QUERY } from '../../queries/notes'

interface Props {
  id: string
  content: string
  category: string
}

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($noteId: String!) {
    deleteNote(id: $noteId) {
      successful
    }
  }
`

function NoteView(props: Props) {
  const [deleteNoteMutation] = useMutation(DELETE_NOTE_MUTATION, {
    refetchQueries: [GET_ALL_NOTES_QUERY]
  })

  function handleNoteDelete() {
    console.log('delete note', props.id)
    deleteNoteMutation({
      variables: {
        noteId: props.id
      }
    })
  }

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
        <div>
          <Link to={`/notes/${props.id}`}>
            <Button variant="secondary" size="sm">
              View
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            style={{ marginLeft: '1rem' }}
            onClick={handleNoteDelete}
          >
            Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default NoteView
