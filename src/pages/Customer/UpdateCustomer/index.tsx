import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { error, success } from '@pnotify/core';
import { useHistory, useParams } from 'react-router-dom';

import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import api from '../../../services/api';
import Layout from '../../layout';

import FormCustomer from '../FormCustomer';
import FormAddress from '../FormAddress';

import { Content, Container, SectionAddress, ListAddresses } from './style';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import ModalCustom from '../../../components/Modal';

interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

const ListCustomer: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [showModal, setShowModal] = useState(false);

  const { idCustomer } = useParams<{ idCustomer: string }>();

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await api.get<Customer>(
          `/admin/customers/${idCustomer}`,
        );

        setCustomer(response.data);
      } catch (err) {
        // alert(err.response.data.message);
      }
    }

    getCustomer();
  }, [idCustomer]);
  const handleUpdate = useCallback(
    async data => {
      try {
        const response = await api.put(`/admin/customers/${idCustomer}`, data);

        if (response.data) {
          success('Registro Atualizado com sucesso');
        }
      } catch (err) {
        // if (err) error(err.response.data.message);
      }
    },
    [idCustomer],
  );

  const history = useHistory();

  return (
    <>
      <Layout>
        <ModalCustom
          show={showModal}
          title="Editar Endereço"
          closeModal={setShowModal}
        >
          <FormAddress functionAction={handleUpdate} />
        </ModalCustom>
        <Container>
          <header>
            <FaArrowLeft
              size={32}
              cursor="pointer"
              style={{ marginRight: '32px' }}
              onClick={() => {
                history.goBack();
              }}
            />
            <h1>Editar Cliente</h1>
          </header>
          <Content>
            <FormCustomer
              functionAction={handleUpdate}
              disabledPassword="disabled"
              customer={customer}
            />

            <SectionAddress>
              <h1>Endereços </h1>
              <span style={{ color: 'red' }}>
                Em desenvolvimento, os dados abaixo são fictícios
              </span>

              <ListAddresses>
                <Card
                  color="white"
                  title="Endereço Casa"
                  style={{
                    maxWidth: '400px',
                  }}
                >
                  <span>Rua Ernesto Alves 1431</span>
                  <span> Monsenhor Wolski São Luiz Gonzaga, RS</span>
                  <span>97800000 Brasil Telefone: ‪55996628613‬</span>

                  <div>
                    <Button
                      colorTheme="secondary"
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                    >
                      Editar
                    </Button>
                    <Button colorTheme="primary">Tornar Padrão</Button>
                    <Button colorTheme="danger">Excluir</Button>
                  </div>
                </Card>
                <Card
                  color="white"
                  title="Endereço Casa"
                  style={{
                    maxWidth: '400px',
                    borderColor: '2px green solid',
                  }}
                  Icon={FaCheckCircle}
                  iconColor="green"
                >
                  <span>Rua Ernesto Alves 1431</span>
                  <span> Monsenhor Wolski São Luiz Gonzaga, RS</span>
                  <span>97800000 Brasil Telefone: ‪55996628613‬</span>

                  <div>
                    <Button colorTheme="secondary">Editar</Button>
                    <Button colorTheme="danger">Excluir</Button>
                  </div>
                </Card>
              </ListAddresses>
            </SectionAddress>
          </Content>
        </Container>
      </Layout>
    </>
  );
};

export default ListCustomer;
