import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Modal } from "reactstrap";
import {ModalField} from "../ModalField/ModalField";
import { firebaseApp } from "../../firebase";
import {DATABASE} from "../../constants/db";
import {Product} from "../../interfaces/product";

interface Interface {
  isOpen?: boolean
  toggleModal: any
  type: string
  product?: Product
}

export const ProductModal: React.FC<Interface> = ({ isOpen, toggleModal, type, product }) => {
  const formRef = useRef(null);

  const [name, setName] = useState(product?.name || '');
  const [width, setWidth] = useState(product?.width || '');
  const [height, setHeight] = useState(product?.height || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [description, setDescription] = useState(product?.description || '');
  const [count, setCount] = useState(product?.count || '');
  const [color, setColor] = useState(product?.color ||'');

  const onSubmit = () => {
    const values = {
      name,
      width,
      height,
      weight,
      imageUrl,
      description,
      count,
      color,
      comments: `${product?.comments || []}`
    }

    if(type === 'add') {
      addNewProduct(values)
    } else if(type === 'edit') {
      editProduct(values)
    }
  }

  const addNewProduct = (values: any) => {
    const id = Date.now();
    firebaseApp.database()
               .ref(`${DATABASE.PRODUCTS}/${id}`)
               .set({
                   ...values,
                   id,
                   comments: `${product?.comments || []}`
               })
               .then(() => toggleModal());
  }

  const editProduct = (values: any) => {
    firebaseApp.database()
        .ref(`${DATABASE.PRODUCTS}/${product?.id || Date.now()}`)
        .set({
            ...values,
            id: product?.id || Date.now(),
        })
        .then(() => toggleModal());
  }

  return (
      <>
        <Modal isOpen={isOpen} toggle={toggleModal} className="">
          <h1 className="pt-4 px-4">
            { type === 'add' && 'Add new product'}
            { type === 'edit' && 'Edit product'}
          </h1>
          <Form className="p-4" ref={formRef}>
            <ModalField onChange={(e: any) => setName(e.target.value)}
                        type="text"
                        name="productName"
                        id="productName"
                        placeholder="Apple..."
                        value={name}
                        text="Product name"
            />
            <ModalField onChange={(e: any) => setColor(e.target.value)}
                        type="text"
                        name="color"
                        id="color"
                        placeholder="Red, yellow..."
                        value={color}
                        text="Color"
            />
            <ModalField onChange={(e: any) => setHeight(e.target.value)}
                        type="number"
                        name="height"
                        id="height"
                        placeholder="0"
                        value={height}
                        text="Height in cm"
            />
            <ModalField onChange={(e: any) => setWidth(e.target.value)}
                        type="number"
                        name="width"
                        id="width"
                        placeholder="0"
                        value={width}
                        text="Width in cm"
            />
            <ModalField onChange={(e: any) => setWeight(e.target.value)}
                        type="number"
                        name="weight"
                        id="weight"
                        placeholder="0"
                        value={weight}
                        text="Weight in grams"
            />
            <ModalField onChange={(e: any) => setCount(e.target.value)}
                        type="number"
                        name="count"
                        id="count"
                        placeholder="0"
                        value={count}
                        text="Count"
            />
            <ModalField onChange={(e: any) => setImageUrl(e.target.value)}
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        placeholder="https://example.com/my-image.jpg"
                        value={imageUrl}
                        text="Image url"
            />
            <ModalField onChange={(e: any) => setDescription(e.target.value)}
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Short description..."
                        value={description}
                        text="Description"
            />
            <Button color="primary" onClick={onSubmit}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </Form>
        </Modal>
      </>
  )
}
