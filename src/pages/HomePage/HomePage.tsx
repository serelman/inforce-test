import { Header, Product } from "../../components";
import { Col, Row, Spinner } from "reactstrap";
import React, {useEffect, useState} from "react";
import { firebaseApp } from "../../firebase";
import { Product as ProductInterface} from "../../interfaces/product";
import { objectToArray } from "../../utils/utils";
import { DATABASE } from "../../constants/db";

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[] | []>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortBy, setSortBy] = useState('Name');

  useEffect(() => {
    getProducts();
    listenProducts();

    return () => unListenProducts();
  }, [])

  useEffect(() => {
    if(products.length) {
      const data = sortProducts(products);
      // @ts-ignore
      setProducts(data);
    }
  }, [sortBy])

  const getProducts = () => {
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .once('value', snapshot => {
          let data = snapshot.val();
          if(!data) {
            setProducts([]);
          } else {
            data = sortProducts(objectToArray(data));
            setProducts(data);
          }
          setIsLoaded(true);
        })
        .catch(err => console.log(err));
  }

  const listenProducts = () => {
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .on('child_changed', snapshot => {
          getProducts();
        });
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .on('child_added', snapshot => {
          getProducts();
        });
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .on('child_removed', snapshot => {
          getProducts();
        });
  }

  const unListenProducts = () => {
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .off('child_changed');
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .off('child_added');
    firebaseApp.database()
        .ref(DATABASE.PRODUCTS)
        .off('child_removed');
  }

  const sortProducts = (data: any) => {
    if(sortBy.toLowerCase() === 'name') {
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    } else if(sortBy.toLowerCase() === 'amount') {
      // @ts-ignore
      return [...data].sort( (a, b) => b.count - a.count);
    }
  }

  return (
      <div className="App">
        <Header sortProducts={setSortBy} sortBy={sortBy}/>
        <div className="container-fluid">
          <div className="pt-5">
            {isLoaded && products.length > 0 && (
                <Row>
                  {products.map((product: ProductInterface, index: number) => (
                      <Col key={index} md={4}>
                        <Product {...product}/>
                      </Col>
                  ))}
                </Row>)
            }
            { !isLoaded && (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner/>
                </div>
            )}
            { isLoaded && !products.length && (
                <Row className="justify-content-center">
                  Store is empty. Add new items.
                </Row>
            ) }
          </div>
        </div>

      </div>
  );
}
