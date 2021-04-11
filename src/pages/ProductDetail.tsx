import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import NavigationBar from '../components/NavigationBar';
import { create, update } from '../services/products';
import { AppContext } from '../store/AppContext';
import { addProductAction, updateProductAction } from '../store/ProductReducer';
import * as styles from '../styles';

const ProductDetail: React.FC = () => {
  const { product, dispatchProduct } = useContext(AppContext);
  const history = useHistory();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [active, setActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {id} = useParams<any>();
  const isNew = id === 'new';

  const submit = (event: React.MouseEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError('');
    if (validateForm()) {
      setSubmitting(true);
    }
  }

  const validateForm = (): boolean => {
    let errors = 0;
    if (name.trim() === '') {
      setNameError('Type the product\'s name');
      errors =+ 1;
    } else {
      setNameError('');
    }
    if (isNaN(Number(price)) || price.trim() === '' || Number(price) <= 0) {
      setPriceError('Type a valid number greather than zero');
      errors =+ 1;
    } else {
      setPriceError('');
    }
    return errors === 0;
  }

  useEffect(() => {
    const selectedProduct = product.products.filter((p) => p.id === id);
    if (selectedProduct.length > 0) {
      setName(selectedProduct[0].name);
      setDescription(selectedProduct[0].description);
      setPrice(String(selectedProduct[0].price));
      setActive(selectedProduct[0].active);
    }
  }, [id, product]);

  useEffect(() => {
    if (submitting) {
      if (isNew) {
        create({
          name,
          description,
          price,
          active,
        })
          .then((response) => {
            setSubmitting(false);
            if (response.error) {
              setError(response.error);
            } else if (response.name) {
              dispatchProduct(addProductAction(response));
              history.goBack();
            } else {
              setError(`Oops... couldn't get server answer`);
            }
          });
      } else {
        update({
          id,
          name,
          description,
          price,
          active,
        })
          .then((response) => {
            setSubmitting(false);
            if (response.error) {
              setError(response.error);
            } else if (response.name) {
              dispatchProduct(updateProductAction(response));
              history.goBack();
            } else {
              setError(`Oops... couldn't get server answer`);
            }
          });
      }
    }
  }, [submitting, isNew, id, name, description, price, active, dispatchProduct, history]);

  return (
    <div>
      <NavigationBar />
      <div style={styles.centeredPainel}>
        {
          error && (
            <CustomAlert type='danger' message={error} onClose={() => setError('')} />
          )
        }
        <div style={{ ...styles.bordered, ...styles.largePadded }}>
          <h3>{isNew ? 'New Product' : 'Edit product'}</h3>
          <Form noValidate onSubmit={submit} id='product_form'>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={name}
                maxLength={50}
                isInvalid={nameError !== ''}
                onChange={({ target }) => setName(target.value)}
              />
              <Form.Text style={{ color: 'red' }}>{nameError}</Form.Text>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                value={description}
                maxLength={150}
                onChange={({ target }) => setDescription(target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type='number'
                value={price}
                min={0.00}
                max={999999999.99}
                step={0.01}
                isInvalid={priceError !== ''}
                onChange={({ target }) => setPrice(target.value)}
              />
              <Form.Text style={{ color: 'red' }}>{priceError}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type='switch'
                id='active'
                label='Active'
                checked={active}
                onChange={({ target }) => setActive(target.checked)}
              />
              <Form.Text muted>Keep this disabled to make the product inactive and prevent it being listed by customers.</Form.Text>
            </Form.Group>
            <div style={{ ...styles.centered }}>
              <Button type='submit' disabled={submitting}>
                {submitting ? 'Please wait...' : ' Save '}
              </Button>
              <Button
                variant='light'
                disabled={submitting}
                style={{marginLeft: 10}}
                onClick={() => history.goBack()}
              >
                Voltar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
