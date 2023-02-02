import { useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from '../header'
import Sidebar from '../sidebar'
import NotesList from '../notes_list'
import CategorySelect from '../category_select'
import NoteEdit from '../note_edit'

import './index.css'

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <Sidebar
            onClick={(selectedCategoryId) =>
              setSelectedCategoryId(selectedCategoryId)
            }
          />
        </Col>
        <Col xs={6}>
          <main>
            <Stack gap={5}>
              <CategorySelect
                defaultValue={selectedCategoryId}
                value={selectedCategoryId}
                onChange={(selectedCategoryId) =>
                  setSelectedCategoryId(selectedCategoryId)
                }
              />
              <NotesList selectedCategoryId={selectedCategoryId} />
            </Stack>
          </main>
        </Col>
        <Col xs={4}>
          <Route path="/notes/:noteId">
            <NoteEdit />
          </Route>
        </Col>
      </Row>
    </Container>
  )
}

export default App
