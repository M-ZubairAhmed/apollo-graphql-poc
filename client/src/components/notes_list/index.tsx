import { Spinner, Stack } from 'react-bootstrap'

import { useQuery } from '@apollo/client'

import NoteView from '../note_view'
import {GET_ALL_NOTES_QUERY} from '../../queries/notes'

interface Props {
  selectedCategoryId: string
}

function NotesList(props: Props) {
  const { loading, data } = useQuery(GET_ALL_NOTES_QUERY, {
    variables: {
      categoryId: props.selectedCategoryId
    },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    return <Spinner animation="border" />
  }

  return (
    <Stack gap={4}>
      {data.notes.map((note: any) => (
        <NoteView
          key={note.id}
          id={note.id}
          content={note.content}
          category={note.category.label}
        />
      ))}
    </Stack>
  )
}

export default NotesList
