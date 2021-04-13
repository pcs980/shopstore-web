import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import NavigationBar from '../components/NavigationBar';
import { create, getImages, update } from '../services/products';
import { AppContext } from '../store/AppContext';
import { addProductAction, ProductImage, updateProductAction } from '../store/ProductReducer';
import WaitButton from '../components/WaitButton';
import ImageCard, { UploadedImage } from '../components/ImageCard';
import k from '../utils/constants';
import colors from '../styles/colors';
import * as styles from '../styles';
import { formatDate } from '../utils/dates';

const ProductDetail: React.FC = () => {
  const { product, dispatchProduct } = useContext(AppContext);
  const history = useHistory();
  const maxProductImages = k.MAX_PRODUCT_IMAGES;

  const [publishedAt, setPublishedAt] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [active, setActive] = useState(true);
  const [fetchingImages, setFetchingImages] = useState(true);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<ProductImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {id} = useParams<any>();
  const isNew = id === 'new';

  if (!isNew && product.products.length === 0) {
    history.push('/products');
  }

  const onChangeFiles = (event: any) => {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => setUploadedImages(
        (previous) => [...previous, {
          id: event.target.files[0].name,
          image_name: String(reader.result),
        }]
      );
    }
  };

  const onRemoveAnyImage = (removed: ProductImage | UploadedImage) => {
    if ('product_id' in removed) {
      setRemovedImageIds((previous) => [...previous, ...images.filter((image) => image.id === removed.id)]);
      setImages(images.filter((image) => image.image_name !== removed.image_name));
    } else {
      setUploadedImages(uploadedImages.filter((image) => image.image_name !== removed.image_name));
    }
  }

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
    if (fetchingImages && !isNew) {
      getImages(id)
        .then((response) => {
          setFetchingImages(false);
          if (response.error) {
            setError(response.error);
          } else {
            setImages(response.map((image: any) => ({
              ...image,
              image_name: `${k.SERVER_BASE_URL}/images/${image.image_name}`,
            })));
          }
        });
    }
  }, [id, isNew, fetchingImages, setFetchingImages]);

  useEffect(() => {
    const selectedProduct = product.products.filter((p) => p.id === id);
    if (selectedProduct.length > 0) {
      setPublishedAt(formatDate(selectedProduct[0].published_at));
      setName(selectedProduct[0].name);
      setDescription(selectedProduct[0].description);
      setPrice(String(selectedProduct[0].price));
      setActive(selectedProduct[0].active);
    }
  }, [id, product]);

  useEffect(() => {
    if (submitting) {
      const product = {
        name,
        description,
        price,
        active,
        base64images: uploadedImages.map((img) => img.image_name)
      };
      if (isNew) {
        create(product)
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
          ...product,
          id,
          removedImageIds,
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
  }, [submitting, isNew, id, name, description, price, images, uploadedImages, removedImageIds, active, dispatchProduct, history]);

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
            <Form.Group controlId='upload'>
              <Form.Label>Images</Form.Label>
              <ImageCard
                fetching={fetchingImages && !isNew}
                images={[...images, ...uploadedImages]}
                onImageRemove={onRemoveAnyImage}
              />
              <Form.File
                draggable
                disabled={(uploadedImages.length + images.length >= maxProductImages || fetchingImages)}
                accept='image/*'
                onChange={onChangeFiles}
                style={{ padding: 10, marginBottom: 10, backgroundColor: colors.gray }}
              />
              <Form.Text muted>
                {`The product can have up to ${maxProductImages} images. Selected ${uploadedImages.length + images.length} image(s).`}
              </Form.Text>
              <Form.Text muted>
                Images marked with asterisk (*) aren't stored in server yet.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='publishedAt'>
              <Form.Label>Published At</Form.Label>
              <Form.Control
                disabled
                value={publishedAt ? publishedAt : 'Automatically filled'}
                isInvalid={nameError !== ''}
              />
            </Form.Group>
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
              <WaitButton
                type='submit'
                disabled={submitting}
                text='Save'
              />
              <div style={{marginLeft: 10}}>
                <WaitButton
                  variant='light'
                  disabled={submitting}
                  onClick={() => history.goBack()}
                  text='Voltar'
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
