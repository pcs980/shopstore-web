import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Dropdown, DropdownButton, Spinner, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import CustomAlert from '../components/CustomAlert';
import NavigationBar from '../components/NavigationBar';
import { get } from '../services/products';
import { AppContext } from '../store/AppContext';
import { getProductAction } from '../store/ProductReducer';
import * as styles from '../styles';
import { decimalNumber, truncateLongText } from '../utils/parsers';

const ProductsHome: React.FC = () => {
  const history = useHistory();
  const { product, dispatchProduct } = useContext(AppContext);
  const [fetching, setFetching] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [error, setError] = useState('');

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
  }, [fetching]);

  const refreshProducts = () => {
    setFetching(true);
  };

  const openProduct = (id: string | number) => {
    history.push(`/products/${id}`);
  };

  const sortProducts = (e: string) => {
    setSortBy(e);
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
                onSelect={() => sortProducts('name')}
              >
                <span style={{fontSize: 12}}>Name</span>
              </Dropdown.Item>
              <Dropdown.Item
                active={sortBy === 'newest'}
                onSelect={() => sortProducts('newest')}
              >
                <span style={{fontSize: 12}}>Newest</span>
              </Dropdown.Item>
              <Dropdown.Item
                active={sortBy === 'active'}
                onSelect={() => sortProducts('active')}
              >
                <span style={{fontSize: 12}}>Active</span>
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div>
            <Button size='sm' variant='light' onClick={refreshProducts}>
              Refresh
            </Button>
            <Button
              size='sm'
              style={{marginLeft: 10}}
              onClick={() => openProduct('new')}
            >
              New product
            </Button>
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
          product.products.length > 0 && (
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Code</th>
                  <th style={{textAlign: 'center'}}>Price</th>
                  <th style={{textAlign: 'center'}}>Active?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  product.products.map((p) => (
                    <tr key={p.id}>
                      <td style={{width: '30%'}}>
                        {p.name}
                      </td>
                      <td style={{width: '25%'}}>
                        {truncateLongText(p.description || '')}
                      </td>
                      <td>
                        {p.code}
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
                        <Button
                          variant='light'
                          size='sm'
                          style={{marginLeft: 10}}
                          onClick={() => openProduct(p.id)}
                        >
                          Edit
                        </Button>
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
