import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Card, Spinner, Form, Button } from 'react-bootstrap'

const GET_NOTE_QUERY = gql`
  query GetNote($id: String!) {
    note(id: $id) {
      id
      content
    }
  }
`

function NoteEdit() {
  const { noteId } = useParams<{ noteId: string }>()

  const { loading, data } = useQuery(GET_NOTE_QUERY, {
    variables: {
      id: noteId
    }
  })

  if (loading) {
    return (
      <div style={{ marginTop: '5rem' }}>
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <div style={{ marginTop: '5rem' }}>
      <Card>
        <Card.Header as="h5">Edit note: {data.note.id}</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={20}
              defaultValue={data.note.content}
              autoFocus={true}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              Save
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default NoteEdit
