import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { success, error } from '@pnotify/core';
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
import { resolveResponse } from '../../../utils/resolverResponse';

interface Address {
  id: string;
  name: string;
  cep: string;
  uf: string;
  city: string;
  street: string;
  district: string;
  number: string;
  addressDefault: boolean;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  adresses: Address[];
}

const ListCustomer: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState<Address>({} as Address);

  const { idCustomer } = useParams<{ idCustomer: string }>();

  const sortAdresses = useCallback((adresses: Address[]) => {
    let sortedAdress: Address[] = [];

    if (adresses) {
      sortedAdress = adresses.sort(function (addresSortA, addresSortB) {
        if (addresSortA.id > addresSortB.id) {
          return 1;
        }

        if (addresSortA.id < addresSortB.id) {
          return -1;
        }

        return 0;
      });
    }

    return sortedAdress;
  }, []);

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await api.get<Customer>(
          `/admin/customers/${idCustomer}`,
        );

        setCustomer(response.data);
        setCustomer({
          ...customer,
          adresses: sortAdresses(response.data.adresses),
        });
      } catch (err) {}
    }

    getCustomer();
    // eslint-disable-next-line
  }, [idCustomer, sortAdresses]);

  const setAdressDefault = useCallback(
    async address => {
      try {
        await api.put(`/admin/customers/address/${address}`, {
          defaultAddress: true,
        });

        const response = await api.get<Customer>(
          `/admin/customers/${idCustomer}`,
        );
        setCustomer(response.data);
        setCustomer({
          ...customer,
          adresses: sortAdresses(response.data.adresses),
        });

        success('Endereço padrão alterado com sucesso');
      } catch (err) {
        if (err) {
          console.log(JSON.stringify(err));
        }
      }
    },
    [idCustomer, customer, sortAdresses],
  );

  const getDataAddress = useCallback(async addressID => {
    try {
      const response = await api.get<Address>(
        `admin/customers/address/${addressID}`,
      );
      setAddress(response.data);
    } catch {
      error('Ocorreu um erro ao buscar os dados do endereço');
    }
  }, []);

  const handleUpdate = useCallback(
    async data => {
      try {
        const response = await api.put(`/admin/customers/${idCustomer}`, data);

        if (response.data) {
          success('Registro Atualizado com sucesso');
        }
      } catch (err) {
        if (err) error(err.response.data.message);
      }
    },
    [idCustomer],
  );

  const handleUpdateAddress = useCallback(
    async (data: Address) => {
      try {
        const response = await api.put(
          `admin/customers/address/${address.id}`,
          data,
        );

        success('Registro Atualizado com sucesso');
        setShowModal(!showModal);
        const adressesCustomer = customer.adresses.map(addr => {
          if (addr.id === response.data.id) {
            return response.data;
          }
          return addr;
        });

        setCustomer({ ...customer, adresses: adressesCustomer });
      } catch {}
    },
    [address, customer, showModal],
  );

  const history = useHistory();

  const handleDeleteAddress = useCallback(
    async idAddr => {
      try {
        await api.delete(`/admin/customers/address/${idAddr}`);
        const response = await api.get<Customer>(
          `/admin/customers/${idCustomer}`,
        );

        setCustomer(response.data);
        setCustomer({
          ...customer,
          adresses: sortAdresses(response.data.adresses),
        });

        success('Registro Deletado com sucesso');
      } catch (err) {
        if (err) {
          const message = resolveResponse(err);
          error({
            title: 'Erro ao deletar registro',
            text: message,
          });
        }
      }
    },
    [idCustomer, sortAdresses, customer],
  );

  return (
    <>
      <Layout>
        <ModalCustom
          show={showModal}
          title="Editar Endereço"
          closeModal={setShowModal}
        >
          <FormAddress functionAction={handleUpdateAddress} address={address} />
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

              <ListAddresses>
                {customer.adresses?.map(address => (
                  <Card
                    Icon={address.addressDefault ? FaCheckCircle : undefined}
                    iconColor="green"
                    color="white"
                    title={address.name}
                    key={address.id}
                    style={{
                      maxWidth: '400px',
                      borderColor: address.addressDefault ? 'green' : 'silver',
                      border: address.addressDefault
                        ? 'solid 3px green'
                        : 'solid 1px',
                    }}
                  >
                    <span>
                      {address.street} - {address.number}
                    </span>
                    <span>
                      {address.district} {address.city}, {address.uf}
                    </span>
                    <span>{address.cep} Brasil</span>

                    <div>
                      <Button
                        colorTheme="secondary"
                        onClick={() => {
                          getDataAddress(address.id);
                          setShowModal(!showModal);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        colorTheme="primary"
                        style={{
                          display: address.addressDefault ? 'none' : 'inline',
                        }}
                        onClick={() => {
                          setAdressDefault(address.id);
                        }}
                      >
                        Tornar Padrão
                      </Button>
                      <Button
                        colorTheme="danger"
                        onClick={() => {
                          handleDeleteAddress(address.id);
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </Card>
                ))}
              </ListAddresses>
            </SectionAddress>
          </Content>
        </Container>
      </Layout>
    </>
  );
};

export default ListCustomer;
