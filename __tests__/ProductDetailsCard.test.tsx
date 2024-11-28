import { render, screen } from '@testing-library/react';
import { ProductDetails } from '@/components/Product/Details';
import { product } from './__mocks__/product.json';
import { DEFAULT_CURRENCY } from '@/utils/constants';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vitest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn(),
    })),
  });

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: vitest.fn().mockImplementation(() => ({
      observe: vitest.fn(),
      unobserve: vitest.fn(),
      disconnect: vitest.fn()
    }))
  });

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: vitest.fn().mockImplementation(() => ({
      observe: vitest.fn(),
      unobserve: vitest.fn(),
      disconnect: vitest.fn()
    }))
  });
});

describe('renders a product details card', () => {
  const setShowDetailsMock = vitest.fn();
  const useShowDetailsMock = (showDetailsMock : boolean) => [showDetailsMock, setShowDetailsMock];

  const toggleShowDetailsMock = () => {
    setShowDetailsMock(!useShowDetailsMock);
  };

  it('should render a product details card containing all product details', () => {
    render(
      <ProductDetails 
        product={product}
        open={true}
        isProductLoading={false}
        productError=''
        toggleShowDetails={toggleShowDetailsMock}
      />
    );
    
    const productTabs= screen.getByTitle('product-tabs');
    const productTabsContent= screen.getByTitle('product-tabs-content');

    expect(productTabs).toBeInTheDocument();
    expect(productTabsContent).toBeInTheDocument();
    expect(productTabsContent).toHaveTextContent(String(product.price + DEFAULT_CURRENCY));
    expect(productTabsContent).toHaveTextContent(product.category);

  });

  it('should render an error component if error string is passed to props', () => {

    const mockedErrorMessage = 'Example error';
    render(
      <ProductDetails 
        product={product}
        open={true}
        isProductLoading={false}
        productError={mockedErrorMessage}
        toggleShowDetails={toggleShowDetailsMock}
      />
    );

    const errorComponent = screen.getByTitle('error-component');
    expect(errorComponent).toBeInTheDocument();
    expect(errorComponent).toHaveTextContent(mockedErrorMessage);
  });
});