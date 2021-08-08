import React, { useCallback, useState } from 'react';
import { error, success } from '@pnotify/core';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
  Container,
  ContentMenu,
} from './styles';
import api from '../../../services/api';

import Layout from '../../layout';
import { resolveResponse } from '../../../utils/resolverResponse';
import FormProduct from '../FormProduct';

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
}
const NewProduct: React.FC = () => {
  const [editorContent] = useState('');

  const history = useHistory();


  const handleSaveProduct = useCallback(
    async (data: Product, productImages: string[]) => {
      data.details = editorContent;

      try {
        const response = await api.post<Product>('/products', data);

        const dataFile1 = new FormData();
        const dataFile2 = new FormData();

        const dataFile3 = new FormData();

        const dataFile4 = new FormData();

        try {
          dataFile1.append('productImage', productImages[0] || '');
          dataFile1.append('productId', response.data.id || '');

          if (dataFile1) {
            await api.post('products/upload/image', dataFile1);
          }

          dataFile2.append('productImage',  productImages[1] || '');
          dataFile2.append('productId', response.data.id || '');

          if (dataFile2) {
            await api.post('products/upload/image', dataFile2);
          }

          dataFile3.append('productImage',  productImages[2] || '');
          dataFile3.append('productId', response.data.id || '');

          if (dataFile3) {
            await api.post('products/upload/image', dataFile3);
          }

          dataFile4.append('productImage',  productImages[3] || '');
          dataFile4.append('productId', response.data.id || '');

          if (dataFile4) {
            await api.post('products/upload/image', dataFile4);
          }

          success('Registro Salvo com sucesso');
          // history.push('/products');
        } catch (err) {
          const msg = resolveResponse(err);

          error({
            title: 'Ocoreu um erro ao salvar algumas IMAGENS !',
            text: msg,
          });
          history.push('/products');
        }

        history.push('/products');
      } catch (err) {
        error(err.response.data.message);
      }
    },
    // eslint-disable-next-line
    [history],
  );
  return (
    <>
      <Layout>
        <Container>
          <header>
            <FaArrowLeft
              cursor="pointer"
              onClick={() => {
                history.goBack();
              }}
              size={32}
              style={{
                marginLeft: '16px',
                marginTop: '5px',
                marginRight: '16px',
              }}
            />
            <h1>Cadastro de Produto</h1>
          </header>


          <ContentMenu>
            <FormProduct functionAction={handleSaveProduct}></FormProduct>
        
          </ContentMenu> 
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;
