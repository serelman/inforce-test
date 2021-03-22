import React, { useEffect, useState } from "react";
import { Comments } from "../../components/Comments/Comments";
import { Header, Product } from "../../components";
import { firebaseApp} from "../../firebase";
import { DATABASE } from "../../constants/db";
import { productInstance, Product as ProductInterface } from '../../interfaces/product';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ROUTES } from "../../constants/routes";

export const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<ProductInterface>(productInstance);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    getProduct();
    listenComments();
  }, []);

  const getProduct = () => {
    firebaseApp.database()
        .ref(`${DATABASE.PRODUCTS}/${id}`)
        .once('value', snapshot => {
          const product = snapshot.val();
          if(!product) {
            history.push(ROUTES.HOME);
          } else {
            setProduct(product);
          }
          setIsLoaded(true)
        })
        .catch(err => console.log(err));

    return () => unListenComments();
  }

  const listenComments = () => {
    firebaseApp.database()
        .ref(`${DATABASE.PRODUCTS}/${id}`)
        .on('child_changed', snapshot => {
          getProduct();
        });
  }

  const unListenComments = () => {
    firebaseApp.database()
        .ref(`${DATABASE.PRODUCTS}/${id}`)
        .off('child_changed');
  }

  return (
      <>
        <Header/>
        <div className="container-fluid w-50 py-5">
          {
            isLoaded && (
                <>
                  <Product {...product}/>
                  <Comments product={product}/>
                </>
            )
          }
        </div>
      </>
  )
}
