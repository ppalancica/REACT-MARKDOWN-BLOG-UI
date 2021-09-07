import React, { useRef, useState } from 'react'
import { Header, Button, Form } from 'semantic-ui-react'
import axios from "axios";
import Message from '../components/Message'

const PostCreate = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const fileInputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(title)
    console.log(markdown)
    console.log(thumbnail)

    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("markdown", markdown)
    console.log(formData);

    axios
      .post('http:/127.0.0.1:8000/api/posts/create/', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res)
        setLoading(false);
        // redirect back to the post list
      })
      .catch(err => {
        setLoading(false);
        setError(err.message || err)
      })
  }

  return (
    <div>
      <Header>Create a post</Header>
      {thumbnail && <Message info message={`Selected image: ${thumbnail.name}`} />}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder='Title of your post'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.TextArea
          label='Markdown content'
          placeholder='This is your post content...'
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
        />
        <Form.Field>
          <Button
            fluid
            content="Choose a thumbnail"
            labelPosition="left"
            icon="file"
            onClick = {() => fileInputRef.current.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={e => setThumbnail(e.target.files[0])}
          />
        </Form.Field>
        <Button primary fluid type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

export default PostCreate;
