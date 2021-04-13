import React, { useContext, useEffect, useState } from 'react';
import { Badge, Dropdown, DropdownButton, Spinner, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Lottie from 'lottie-react';
import CustomAlert from '../components/CustomAlert';
import NavigationBar from '../components/NavigationBar';
import WaitButton from '../components/WaitButton';
import { get } from '../services/products';
import { AppContext } from '../store/AppContext';
import { getProductAction, Product } from '../store/ProductReducer';
import { decimalNumber, truncateLongText } from '../utils/parsers';
import * as styles from '../styles';
import noProducts from '../assets/animations/noProducts.json';

const ProductsHome: React.FC = () => {
  const history = useHistory();
  const { product, dispatchProduct } = useContext(AppContext);
  const [fetching, setFetching] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('sorting');
    product.products.sort((a, b) => b.name.localeCompare(a.name))
  }, [sortBy, product]);

  useEffect(() => {
    if (fetching) {
      get()
        .then((response) => {
          setFetching(false);
          if (response.error) {
            setError(response.error);
          } else {
            dispatchProduct(getProductAction(response));
          }
        });
    }
  }, [fetching, product, dispatchProduct]);

  const refreshProducts = () => {
    setError('');
    setFetching(true);
  };

  const openProduct = (id: string | number) => {
    history.push(`/products/${id}`);
  };

  const sortProducts = (a: Product, b: Product): number => {
    if (sortBy === 'active') {
      return a.active < b.active ? 1 : -1;
    } else if (sortBy === 'price') {
      return a.price > b.price ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  };

  return (
    <div>
      <NavigationBar />
      <div style={styles.marginPainel}>
        {
          error && (
            <CustomAlert type='danger' message={error} onClose={() => setError('')} />
          )
        }
        <div style={{...styles.rightAlign, marginBottom: 30}}>
          <h5><b>Search products</b></h5>
          <div>
            <DropdownButton
              disabled={product.products.length === 0}
              variant='light'
              title='Sort by'
              size='sm'
            >
              <Dropdown.Item
                active={sortBy === 'name'}
                onSelect={() => setSortBy('name')}
              >
                <span style={{fontSize: 12}}>Name</span>
              </Dropdown.Item>
              <Dropdown.Item
                active={sortBy === 'price'}
                onSelect={() => setSortBy('price')}
              >
                <span style={{fontSize: 12}}>Cheapest</span>
              </Dropdown.Item>
              <Dropdown.Item
                active={sortBy === 'active'}
                onSelect={() => setSortBy('active')}
              >
                <span style={{fontSize: 12}}>Active</span>
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div>
            <WaitButton
              variant='light'
              onClick={refreshProducts}
              text='Refresh'
            />
            <WaitButton
              onClick={() => openProduct('new')}
              text='New product'
            />
          </div>
        </div>
        {
          fetching && (
            <div>
              <Spinner animation='border' />
            </div>
          )
        }
        {
          !fetching && product.products.length === 0 && (
            <div style={styles.centeredPainel}>
              <Lottie animationData={noProducts} autoplay style={{ width: '40%', height: '40%'}} />
              No products
            </div>
          )
        }
        {
          product.products.length > 0 && (
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th style={{textAlign: 'center'}}>Price</th>
                  <th style={{textAlign: 'center'}}>Active?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  product.products.sort(sortProducts).map((p) => (
                    <tr key={p.id}>
                      <td style={{width: '30%'}}>
                        {p.name}
                      </td>
                      <td style={{width: '25%'}}>
                        {truncateLongText(p.description || '')}
                      </td>
                      <td style={{textAlign: 'center'}}>
                        {decimalNumber(p.price || 0)}
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <Badge variant={p.active ? 'success' : 'danger'} pill>
                          {p.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <WaitButton
                          variant='light'
                          onClick={() => openProduct(p.id)}
                          text='Edit'
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          )
        }
      </div>
    </div>
  );
};

export default ProductsHome;
