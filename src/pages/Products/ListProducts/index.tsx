import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { error } from '@pnotify/core';
import api from '../../../services/api';

import { Container, Content, CardCustom, CardFooter } from './styles';

interface Product {
  id: string;
  name: string;
  price: number;
  images: [
    {
      id: string;
      image: string;
    },
  ];
}

const ListProducts: React.FC = () => {
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);

  const handleDeleteProduct = useCallback(
    async idProduct => {
      try {
        await api.delete(`/products/${idProduct}`);

        const newProducts = products.filter(prod => prod.id !== idProduct);
        setProducts(newProducts);
      } catch {
        error('Ocorreu um erro ao deletar');
      }
    },
    [products],
  );

  useEffect(() => {
    async function getProducts(): Promise<void> {
      try {
        const response = await api.get<Product[]>('/products');
        setProducts(response.data);
      } catch (err) {
        error('Ocorreu um erro ao obter os dados');
      }
    }

    getProducts();
  }, []);

  return (
    <>
      <Container>
        <header>
          <h1>Produtos</h1>
          <button
            type="button"
            onClick={() => {
              history.push('/products/new');
            }}
          >
            NOVO PRODUTO
          </button>
        </header>

        <Content>
          {products.map(product => (
            <CardCustom>
              <img
                src={
                  product.images.length > 0
                    ? product.images[0].image
                    : 'https://lh3.googleusercontent.com/proxy/_rt_r6x_pktBfElOkUiKfrMj0QWsUClj7rarcNdcGaY0b_0h77mSBVWAP37GLpoa3FI7wNS7GFFS3Od-e6wc-V4IHPbAbjnndTC4ZJZMdkgDSXs4mtjSil08BMzVBIIbZwGgDJH2lA3n2A'
                }
                alt="image_product  "
              />
              <span>{product.name}</span>
              <strong>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </strong>

              <CardFooter>
                <button type="button">
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm('Realmente deseja excluir este item ?')
                    ) {
                      handleDeleteProduct(product.id);
                    }
                  }}
                >
                  <FaTrash />
                </button>
              </CardFooter>
            </CardCustom>
          ))}
        </Content>
      </Container>
    </>
  );
};
export default ListProducts;
