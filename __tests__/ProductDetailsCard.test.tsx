import { render, screen, waitFor } from '@testing-library/react';
import { product } from './__mocks__/product.json';
import { ProductDetailsTable } from '@/components/Product/DetailsTable';

describe('renders a product details table', () => {

  it('should render a product details table containing all product details', async () => {
    render(
      <ProductDetailsTable
        product={product}
      />
    );

    await waitFor(() =>{
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

});