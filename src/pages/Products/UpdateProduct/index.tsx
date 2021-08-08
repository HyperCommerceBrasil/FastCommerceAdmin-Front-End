import React, { useCallback, useEffect, useState } from 'react';

import { error, success } from '@pnotify/core';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from './styles';
import api from '../../../services/api';

import Layout from '../../layout';
import FormProduct from '../FormProduct';

interface Collection {
  id: string;
  name: string;
}

interface Image {
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

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get<Product>(
          `/products/listone/${idProduct}`,
        );
        setProduct(response.data);
      } catch (err) {
        error(`Ocorreu um erro ao trazer os dados do produto`);

        history.push('/products');
      }
    }

    getProduct();
  }, [history, idProduct]);

  const handleUpdate = useCallback(
    async (data, images: string[]) => {
      try {
        const response = await api.put<Product>(`/products/${idProduct}`, data);
   

        const dataFile = new FormData();

        dataFile.append('productId', response.data.id || '');
        images.map(async image => {
          if (image) {
            dataFile.append('productImage', image || '');
            await api.post('products/upload/image', dataFile);
            dataFile.delete('productImage');
          }
        });

        success('Registro Atualizado com sucesso');
      } catch (err) {
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
