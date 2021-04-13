import React from 'react';
import { Card, CardColumns, Spinner } from 'react-bootstrap';
import colors from '../styles/colors';
import WaitButton from './WaitButton';

export interface UploadedImage {
  id: string;
  image_name: string;
}

interface ImageCardProps {
  images?: any[],
  onImageRemove: Function,
  fetching?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ images, fetching, onImageRemove }) => {
  return (
    <>
      {
        fetching && (
          <Spinner animation='border' />
        )
      }
      <CardColumns style={{ marginTop: 10 }}>
        {
          images && images.map((img, index) => (
            <Card key={index}>
              <CardImage
                src={img.image_name}
              />
              <CardFooter
                stored={img.product_id ? true : false}
                onImageRemove={() => onImageRemove(img)}
              />
            </Card>
          ))
        }
      </CardColumns>
    </>
  );
};

interface CardImageProps {
  src: string;
}

const CardImage: React.FC<CardImageProps> = ({ src }) => (
  <Card.Img
    alt='Product'
    variant='top'
    src={src}
  />
);

interface CardFooterProps {
  onImageRemove?: Function,
  stored?: boolean;
}

const CardFooter: React.FC<CardFooterProps> = ({ onImageRemove, stored }) => (
  <Card.Footer
    style={{
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: stored ? colors.gray : colors.text
    }}
  >
    <WaitButton
      small
      variant='danger'
      onClick={onImageRemove}
      text={stored ? 'Remove' : 'Remove*'}
    />
  </Card.Footer>
);

export default ImageCard;
