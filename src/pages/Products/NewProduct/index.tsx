import React, { useCallback, useState } from 'react';
import { error, success } from '@pnotify/core';
import { useHistory } from 'react-router-dom';
import { Container, ContentMenu } from './styles';
import api from '../../../services/api';

import Layout from '../../layout';
import { resolveResponse } from '../../../utils/resolverResponse';
import FormProduct from '../FormProduct';
import Loader from './../../../components/Loader/SpinnerLoader';

interface Product {
  id?: string;
  name: string;
  price: string;
  is_active: boolean;
  ean: string;
  price_promotional: string;
  description: string;
  details: string;
  trending: boolean;
  typeStorage: string;
}
const NewProduct: React.FC = () => {
  const [statusLoad, setStatusLoad] = useState(false);

  const history = useHistory();

  const handleSaveProduct = useCallback(
    async (data: Product, productImages: string[]) => {
      try {
        setStatusLoad(true);
        const response = await api.post<Product>('/products', data);

        const dataFile1 = new FormData();
        const dataFile2 = new FormData();

        const dataFile3 = new FormData();

        const dataFile4 = new FormData();

        try {
          dataFile1.append('productImage', productImages[0] || '');
          dataFile1.append('productId', response.data.id || '');

          if (productImages[0]) {
            await api.post('products/upload/image', dataFile1);
          }

          dataFile2.append('productImage', productImages[1] || '');
          dataFile2.append('productId', response.data.id || '');

          if (productImages[1]) {
            await api.post('products/upload/image', dataFile2);
          }

          dataFile3.append('productImage', productImages[2] || '');
          dataFile3.append('productId', response.data.id || '');

          if (productImages[2]) {
            await api.post('products/upload/image', dataFile3);
          }

          dataFile4.append('productImage', productImages[3] || '');
          dataFile4.append('productId', response.data.id || '');

          if (productImages[3]) {
            await api.post('products/upload/image', dataFile4);
          }

          success('Registro Salvo com sucesso');
          setStatusLoad(false);
          // history.push('/products');
        } catch (err) {
          setStatusLoad(false);
          const msg = resolveResponse(err);

          error({
            title: 'Ocoreu um erro ao salvar algumas IMAGENS !',
            text: msg,
          });
          history.push('/products');
        }

        history.push('/products');
        setStatusLoad(false);
      } catch (err) {
        error(err.response.data.message);
        setStatusLoad(false);
      }
    },
    // eslint-disable-next-line
    [history],
  );
  return (
    <>
      <Layout>
        <Loader show={statusLoad}></Loader>
        <Container>
          <ContentMenu>
            <FormProduct functionAction={handleSaveProduct}></FormProduct>
          </ContentMenu>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;
