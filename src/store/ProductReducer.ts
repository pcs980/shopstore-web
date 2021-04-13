export interface ProductImage {
  id: number;
  product_id: number;
  image_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: ProductImage[];
  active: boolean;
  published_at?: Date;
  updated_at?: Date;
}

export interface ProductState {
  productId: number;
  product: Product,
  images: ProductImage[],
  products: Product[],
};

export interface ProductAction {
  type: string;
  data: ProductState;
}

export const initialProductState: ProductState = {
  productId: 0,
  product: {
    id: 0,
    name: '',
    description: '',
    price: 0,
    active: false,
  },
  images: [],
  products: [],
};

export const addProductAction = (product: Product): ProductAction => ({
  type: 'ADD_PRODUCT',
  data: {
    ...initialProductState,
    product,
  },
});

export const updateProductAction = (product: Product): ProductAction => ({
  type: 'UPDATE_PRODUCT',
  data: {
    ...initialProductState,
    product,
  },
});

export const getProductAction = (products: Product[]): ProductAction => ({
  type: 'GET_PRODUCT',
  data: {
    ...initialProductState,
    products,
  },
});

export const getProductImagesAction = (productId: number, images: ProductImage[]): ProductAction => ({
  type: 'GET_PRODUCT_IMAGE',
  data: {
    ...initialProductState,
    productId,
    images,
  },
});

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  console.log('product reducer ->', action);
  switch (action.type) {
    case 'GET_PRODUCT':
      return {
        ...state,
        products: [...action.data.products],
      };
    case 'GET_PRODUCT_IMAGE':
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === action.data.productId) {
            p.images = action.data.images;
          }

          return p;
        }),
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          action.data.product,
        ],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === action.data.product.id) {
            return action.data.product;
          }
          return p;
        }).sort((a, b) => b.name.localeCompare(a.name))
      };
    default:
      return state;
  }
};

export default productReducer;
