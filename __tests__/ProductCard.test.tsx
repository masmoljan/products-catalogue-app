/* eslint-disable max-len */
import { ProductCard } from "@/components/Product/Card";
import { CardDescription } from "@/components/Product/CardDescription";
import {render, screen} from '@testing-library/react';

import { product } from './__mocks__/product.json';
import { DESCRIPTION_CHARACTER_LIMIT } from "@/utils/constants";
import { truncate } from "@/utils";

describe('renders a product card', () => {
  it('should render a product card with CardDescription component and provided product details', () => {
    render(
      <ProductCard
        key={product.id} 
        id={product.id}
        title={product.title}
        description={<CardDescription description={product.description}/>}
        price={product.price}
        thumbnail={product.thumbnail}
      />
    );

    const cardTitle = screen.getByTitle('product-title');
    const cardDescription = screen.getByTitle('product-description');
    const cardPrice = screen.getByTitle('product-price');

    product.description = truncate(product.description, DESCRIPTION_CHARACTER_LIMIT);
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent(product.title);
    expect(cardPrice).toBeInTheDocument();
    expect(cardPrice).toHaveTextContent(String(product.price));
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveTextContent(product.description);    
  });

  it('should render a details button if showDetails prop is passed', () => {
    const setShowDetailsMock = vitest.fn();
    const useShowDetailsMock = (showDetailsMock : boolean) => [showDetailsMock, setShowDetailsMock];

    const setSelectedProductIdMock = vitest.fn();

    const toggleShowDetailsMock = () => {
      setShowDetailsMock(!useShowDetailsMock);
    };

    render(
      <ProductCard
        key={product.id} 
        id={product.id}
        title={product.title}
        description={<CardDescription description={product.description}/>}
        price={product.price}
        thumbnail={product.thumbnail}
        toggleShowDetails={toggleShowDetailsMock}
        setProductId={setSelectedProductIdMock}
      />
    );

    const productDetails = screen.getByRole('button');
    expect(productDetails).toBeInTheDocument();
  });

  it('should not render a details button if showDetails prop is not passed', () => {
    render(
      <ProductCard
        key={product.id} 
        id={product.id}
        title={product.title}
        description={<CardDescription description={product.description}/>}
        price={product.price}
        thumbnail={product.thumbnail}
      />
    );

    const productDetails = screen.queryByRole('button');
    expect(productDetails).not.toBeInTheDocument();
  });
});
