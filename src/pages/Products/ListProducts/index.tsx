import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { error } from '@pnotify/core';

import { Form, Formik } from 'formik';
import api from '../../../services/api';

import {
  Container,
  Content,
  CardCustom,
  CardFooter,
  FormContainer,
  SearchingSection,
} from './styles';
import Layout from '../../layout';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { resolveResponse } from '../../../utils/resolverResponse';
import LoaderData from '../../../components/Loader/SpinnerLoader';

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
  const [loader, setLoader] = useState(false);

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

  const handleSearchProduct = useCallback(async data => {
    try {
      setLoader(true);

      const response = await api.get(`products/search/?search=${data.search}`);

      setProducts(response.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);

      const msg = resolveResponse(err.response);
      error({
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  }, []);

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
      <Layout>
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
          <SearchingSection name="Ações">
            <legend>Pesquisa</legend>
            <Formik
              initialValues={{
                search: '',
              }}
              onSubmit={handleSearchProduct}
            >
              <FormContainer>
                <Form>
                  <Input
                    label=""
                    name="search"
                    placeholder="Pesquisa por nome, preço etc ..."
                  />
                  <Button type="button" colorTheme="primary">
                    Pesquisar
                  </Button>
                </Form>
              </FormContainer>
            </Formik>
          </SearchingSection>
          <LoaderData show={loader} />
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
                  <button
                    type="button"
                    onClick={() => {
                      history.push(`/products/update/${product.id}`);
                    }}
                  >
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
      </Layout>
    </>
  );
};
export default ListProducts;
