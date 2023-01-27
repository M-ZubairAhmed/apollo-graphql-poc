import { ChangeEvent } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Card, Spinner, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const GET_NOTE_QUERY = gql`
  query GetNote($id: String!) {
    note(id: $id) {
      id
      content
    }
  }
`

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      successful
      note {
        id
        content
      }
    }
  }
`

function NoteEdit() {
  const { noteId } = useParams<{ noteId: string }>()

  const { loading: isFetching, data } = useQuery(GET_NOTE_QUERY, {
    variables: {
      id: noteId
    }
  })

  const [updateNote, { loading: isSaving }] = useMutation(
    UPDATE_NOTE_MUTATION,
    {
      variables: {
        id: noteId,
        content: ''
      }
    }
  )

  const [editNote, setEditNote] = useState(data?.note?.content ?? '')

  useEffect(() => {
    setEditNote(data?.note?.content ?? '')
  }, [data?.note?.content])

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setEditNote(event.target.value)
  }

  function handleSave() {
    updateNote({
      variables: {
        id: noteId,
        content: editNote
      }
    })
  }

  if (isFetching) {
    return (
      <div style={{ marginTop: '5rem' }}>
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <div style={{ marginTop: '5rem' }}>
      <Card>
        <Card.Header as="h5">Edit note: {data?.note.id}</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={20}
              defaultValue={editNote}
              autoFocus={true}
              onChange={handleChange}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving && (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: '1rem' }}
                />
              )}
              {isSaving ? 'Saving' : 'Save'}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default NoteEdit
