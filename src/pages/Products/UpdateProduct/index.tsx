import React, { useCallback, useEffect, useState } from 'react';

import { error, success } from '@pnotify/core';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from './styles';
import api from '../../../services/api';

import Layout from '../../layout';
import FormProduct from '../FormProduct';

import Loader from './../../../components/Loader/SpinnerLoader';

interface Collection {
  id: string;
  name: string;
}

interface Image {
  id: string;
  key: string;
  image: string;
}

interface Product {
  id?: string;
  name: string;
  price: string;
  is_active: boolean;
  ean: string;
  price_promotional: string;
  description: string;
  quantity: string;
  trending: boolean;
  collection: Collection;
  images: Image[];
  details: string;
  collectionId: string;
}
const NewProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({} as Product);
  const history = useHistory();
  const { idProduct } = useParams<{ idProduct: string }>();
  const [statusLoad, setStatusLoad] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get<Product>(
          `/products/listone/${idProduct}`,
        );
        setProduct({
          ...response.data,
          price: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(response.data.price)),
          price_promotional: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(response.data.price_promotional)),
        });
      } catch (err) {
        error(`Ocorreu um erro ao trazer os dados do produto`);

        history.push('/products');
      }
    }

    getProduct();
  }, [history, idProduct]);

  const handleUpdate = useCallback(
    async (data, images: string[]) => {
      setStatusLoad(true);
      const dataFile = new FormData();
      try {
        const response = await api.put<Product>(`/products/${idProduct}`, data);
        console.log('teste 4 img');
        console.log(data);

        dataFile.append('productId', response.data.id || '');

        const dataFile1 = new FormData();
        const dataFile2 = new FormData();

        const dataFile3 = new FormData();

        const dataFile4 = new FormData();

        dataFile1.append('productImage', images[0] || '');
        dataFile1.append('productId', response.data.id || '');

        if (images[0]) {
          await api.post('products/upload/image', dataFile1);
        }

        dataFile2.append('productImage', images[1] || '');
        dataFile2.append('productId', response.data.id || '');

        if (images[1]) {
          await api.post('products/upload/image', dataFile2);
        }

        dataFile3.append('productImage', images[2] || '');
        dataFile3.append('productId', response.data.id || '');

        if (images[2]) {
          await api.post('products/upload/image', dataFile3);
        }

        dataFile4.append('productImage', images[3] || '');
        dataFile4.append('productId', response.data.id || '');

        if (images[3]) {
          await api.post('products/upload/image', dataFile4);
        }

        success('Registro Atualizado com sucesso');
        setStatusLoad(false);
        const responseProduct = await api.get<Product>(
          `/products/listone/${idProduct}`,
        );
        setProduct(responseProduct.data);
        setProduct({
          ...responseProduct.data,
          price: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(responseProduct.data.price)),
          price_promotional: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(responseProduct.data.price_promotional)),
        });
      } catch (err) {
        setStatusLoad(false);
        dataFile.delete('productImage');
        error('Ocorreu um erro ao salvar o produto verifique o console');

        console.log(err);
      }
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <>
      <Layout>
        <Loader show={statusLoad}></Loader>
        <Container>
          <FormProduct
            functionAction={handleUpdate}
            product={product}
          ></FormProduct>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;
