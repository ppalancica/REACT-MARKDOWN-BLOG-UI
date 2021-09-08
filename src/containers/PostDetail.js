import React, { useState } from 'react'
import {Button, Container, Divider, Header, Image, Icon, Modal} from 'semantic-ui-react'
import axios from "axios"
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useFetch, history } from "../helpers";

const DeleteModal = ({title, postSlug, thumbnail}) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    setLoading(true);
    axios
      .delete(api.posts.delete(postSlug), {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Token aeaaaf8d52e2c7a986d3b25a4b379cca1c51b27b"
        }
      })
      .then(res => {
        // console.log(res)
        setLoading(false);
        history.push('/')
        // redirect back to the post list
      })
      .catch(err => {
        setLoading(false);
        setError(err.message || err)
      })
  }

  // state = { modalOpen: false }
  // handleOpen = () => this.setState({ modalOpen: true })
  // handleClose = () => this.setState({ modalOpen: false })
  const [open, toggle] = useState(false);

  return (
    <Modal
      trigger={<Button secondary floated="right" onClick={() => toggle(true)}>Delete post</Button>}
      open={open}
      onClose={() => toggle(false)}
      size='small'
    >
      <Modal.Header>Delete post</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={thumbnail} wrapped />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message negative message={error} />}
          <p>
            Are you sure you want to delete this post?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggle(false)}>
          No
        </Button>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content="Confirm delete"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          />
      </Modal.Actions>
    </Modal>
  )
}

const PostDetail = () => {
  // const params = useParams()
  // console.log(params);
  const { postSlug } = useParams()
  const {data, loading, error} = useFetch(api.posts.retrieve(postSlug))

  return (
    <Container text>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <div>
          <Image src={data.thumbnail} />
          <Header as='h1'>
            {data.title}
          </Header>
          <Header as='h4'>Last updated: {`${new Date(data.last_updated).toLocaleDateString()}`}</Header>
          <p>
            {data.content}
          </p>
          <Divider />
          <DeleteModal postSlug={postSlug} title={data.title} thumbnail={data.thumbnail} />
        </div>
      )}
    </Container>
  );
}

export default PostDetail;
