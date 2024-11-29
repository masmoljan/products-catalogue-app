


import { render, screen, waitFor } from '@testing-library/react';
import { ProductDetails } from '@/components/Product/Details';

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

describe('renders a skeleton', () => {
  it('should render a skeleton if product is not loaded', () => {

    const mockedShowDetails = vitest.fn();

    render(
      <ProductDetails 
        open={true}
        productId={1}
        toggleShowDetails={mockedShowDetails}
      />
    );

    const productGallerySkeleton = screen.getByTitle('product-gallery-skeleton');
    const productTitleSkeleton = screen.getByTitle('product-title-skeleton');

    expect(productGallerySkeleton).toBeInTheDocument();
    expect(productTitleSkeleton).toBeInTheDocument();

  });
});

describe('renders a product image gallery', () => {
  it('should render a product image gallery', async () => {

    const mockedShowDetails = vitest.fn();

    render(
      <ProductDetails 
        open={true}
        productId={1}
        toggleShowDetails={mockedShowDetails}
      />
    );

    await waitFor(() => {
      const productGallery = screen.getByTitle('product-gallery');
      const productImages = screen.getByTitle('product-images');

  
      expect(productGallery).toBeInTheDocument();
      expect(productImages).toBeInTheDocument();
    });
  });
});

describe('renders a skeleton', () => {
  it('should render an error component if matching product id is not found', async () => {

    const mockedShowDetails = vitest.fn();

    render(
      <ProductDetails 
        open={true}
        productId={100000}
        toggleShowDetails={mockedShowDetails}
      />
    );
    await waitFor(() => {
      const productGallerySkeleton = screen.getByTitle('error-component');
      expect(productGallerySkeleton).toBeInTheDocument();
    });


  });
});