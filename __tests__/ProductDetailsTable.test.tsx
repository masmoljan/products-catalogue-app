import { render, screen } from '@testing-library/react';
import { product } from './__mocks__/product.json';
import { ProductDetailsTable } from '@/components/ProductDetails/DetailsTable';

describe('renders a product details table', () => {

  it('should render a product details table containing all product details', () => {
    render(
      <ProductDetailsTable
        product={product}
      />
    );

      const productTabsContent= screen.getByTitle('product-details-table');
  
      expect(productTabsContent).toBeInTheDocument();
      expect(productTabsContent).toHaveTextContent(product.category);
      expect(productTabsContent).toHaveTextContent(product.warrantyInformation);
      expect(productTabsContent).toHaveTextContent(product.availabilityStatus);
      expect(productTabsContent).toHaveTextContent(product.shippingInformation);
      expect(productTabsContent).toHaveTextContent(`${product.weight}`);
      expect(productTabsContent).toHaveTextContent(product.returnPolicy);

  });

});