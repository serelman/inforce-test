import React, {useState} from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label, ListGroup, ListGroupItem
} from "reactstrap";
import { Comment } from '../../interfaces/comment';
import { firebaseApp } from "../../firebase";
import { DATABASE } from "../../constants/db";
import { Product } from "../../interfaces/product";

interface Comments {
  product: Product
}

export const Comments: React.FC<Comments> = ({ product }) => {
  const [commentary, setCommentary] = useState('');

  const addComment = () => {
    const date = new Date().toISOString().slice(0,10).split('-').join('.');
    const time = new Date().toTimeString().split(' ')[0]

    const comment = {
      id: Date.now(),
      productId: product.id,
      description: commentary,
      date: `${time} ${date}`
    }

    let comments = [];

    if(product?.comments && product?.comments.length) {
      comments = [...product.comments, comment];
    } else {
      comments.push(comment);
    }

    firebaseApp.database()
               .ref(`${DATABASE.PRODUCTS}/${product.id}`)
               .set({
                   ...product,
                   comments
               })
               .then(() => setCommentary(''));
  }

  return (
      <>
        <h4>Comments: </h4>
        <ListGroup>
            { product?.comments
              && product?.comments.length
              && product.comments.map((el: Comment) => (
                  <ListGroupItem key={el.date} className="justify-content-between">
                    <span className="font-weight-bold text-dark">
                      Anonymous at { el.date }: </span>
                    <br/>
                    { el.description }
                  </ListGroupItem>
              ))
            }
        </ListGroup>
        <Form className="pt-2">
          <FormGroup>
            <Label for="description">Add commentary</Label>
            <Input value={commentary}
                   onChange={e => setCommentary(e.target.value)}
                   type="textarea"
                   name="description"
                   id="description"
            />
          </FormGroup>
          <Button color="primary" onClick={addComment}>Add comment</Button>
        </Form>
      </>
  )
}
