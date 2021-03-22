import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody, CardHeader,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle, Modal, ModalFooter, ModalHeader
} from "reactstrap";
import { ProductModal } from "../";
import { Product as ProductInterface } from "../../interfaces/product";
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from "../../constants/routes";
import { firebaseApp } from "../../firebase";
import { DATABASE } from "../../constants/db";

export const Product: React.FC<ProductInterface> = (product) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { pathname } = useLocation();
  const { id } = product;

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const onDelete = () => {
    firebaseApp.database()
        .ref(`${DATABASE.PRODUCTS}/${id}`)
        .remove(() => {
          toggleDeleteModal();
        });
  }

  const DeleteModal = () => (
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader >Are you sure?</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={() => onDelete()}>Delete</Button>
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
  )

  return (
      <>
        <Card className="mb-5">
          <Link to={`/product/${product.id}`} className="clear-link">
            <CardHeader>
              <CardImg src={product?.imageUrl || 'https://i.stack.imgur.com/y9DpT.jpg'} style={{ minHeight: '350px', maxHeight: '350px' }}/>
            </CardHeader>
          </Link>
          <CardBody>
            <CardTitle tag="h5">{ product.name }</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-dark">
              Amount: <span className="text-muted">{ product?.count }</span>
            </CardSubtitle>
            { pathname !== ROUTES.HOME  && (
                <>
                  <CardSubtitle tag="h6" className="mb-2 text-dark">
                    Height: <span className="text-muted">{ product?.height }</span>
                  </CardSubtitle>
                  <CardSubtitle tag="h6" className="mb-2 text-dark">
                    Width: <span className="text-muted">{ product?.width }</span>
                  </CardSubtitle>
                  <CardSubtitle tag="h6" className="mb-2 text-dark">
                    Weight: <span className="text-muted">{ product?.weight }</span>
                  </CardSubtitle>
                  <CardSubtitle tag="h6" className="mb-2 text-dark">
                    Color: <span className="text-muted">{ product?.color }</span>
                  </CardSubtitle>
                </>
            )}
            <CardText>{ product.description }</CardText>
            { pathname === ROUTES.HOME  && (
                <div className="d-flex justify-content-between">
                  <Button onClick={toggleModal} color="primary">Edit</Button>
                  <Button onClick={toggleDeleteModal} color="danger">Delete</Button>
                </div>
            )}
          </CardBody>
        </Card>
        <DeleteModal/>
        { isOpen && (<ProductModal isOpen={isOpen} toggleModal={toggleModal} type="edit" product={product}/>) }
      </>
  )
}
