export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
  published_at?: Date;
  updated_at?: Date;
}

export interface ProductState {
  product: Product,
  products: Product[],
};

export interface ProductAction {
  type: string;
  data: ProductState;
}

export const initialProductState: ProductState = {
  product: {
    id: 0,
    name: '',
    description: '',
    price: 0,
    active: false,
  },
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

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  console.log('product reducer ->', action);
  switch (action.type) {
    case 'GET_PRODUCT':
      return {
        ...state,
        products: [...action.data.products],
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
        })
      };
    default:
      return state;
  }
};

export default productReducer;
