/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

// import { FaBoxes, FaDollarSign } from 'react-icons/fa';


import { success, error } from '@pnotify/core';
import {
  Backdrop,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { OutlinedInput, LinearProgress } from '@material-ui/core';
import {
  Container,
  CardCustom,
  Options,
  InputControl,
  ContentModal,
  FooterModal,
} from './style';
import ModalCustom from '../../components/Modal';
import api from '../../service/api';

// import Card from '../../components/Card';

interface ICollection {
  name: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

const Collection: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [load, setLoad] = useState(true);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionName, setCollectionName] = useState<string>('');
  const [loader, setLoader] = useState(false);

  const HandleCreateCollection = useCallback(async () => {
    try {
      setLoader(true);
      setOpenModal(!openModal);
      const response = await api.post<ICollection>('/collections', {
        name: collectionName,
      });
      setLoader(false);

      setCollections([...collections, response.data]);
      success({ text: 'Coleção criado com sucesso !!!' });
    } catch (err) {
      setLoader(false);
      error({ type: 'error', text: 'Ocorreu um erro ao criar a collection' });
    }
  }, [collectionName, collections, openModal]);

  useEffect(() => {
    async function getCollections(): Promise<void> {
      try {
        const response = await api.get<ICollection[]>('/collections');
        setCollections(response.data);

        setLoad(false);
      } catch {
        setLoad(false);
        
      }
    }

    getCollections();
  }, []);

  const handleDeleteCollection = useCallback(
    async collectionId => {
      try {
        await api.delete(`collections/${collectionId}`);
        const newCollectionsAfterDelete = collections.filter(
          collect => collect.id !== collectionId,
        );
        setCollections(newCollectionsAfterDelete);
      } catch {
        error('Não foi possivel excluir o registro');
      }
    },
    [collections],
  );



  return (
    <>
      <Backdrop
        open={loader}
        style={{
          position: 'absolute',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
        }}
      >
        <CircularProgress color="inherit" />
        <span color="white">Processando aguarde </span>
      </Backdrop>
      <Container>
        <ModalCustom
          show={openModal}
          title="Adicionar nova coleção"
          widthPercent="500px"
        >
          <ContentModal>
            <InputControl>
              <label htmlFor="collectioName">Nome da Coleção</label>
              <OutlinedInput
                id="collectionName1"
                value={collectionName}
                onChange={evt => {
                  setCollectionName(evt.target.value);
                }}
              />
            </InputControl>
          </ContentModal>
          <FooterModal>
            <Button
              type="button"
              variant="contained"
              onClick={HandleCreateCollection}
              style={{ background: '#34A3D7', color: 'white' }}
            >
              SALVAR
            </Button>
            <Button
              type="button"
              variant="contained"
              style={{ background: '#7D1321', color: 'white' }}
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              CANCELAR
            </Button>
          </FooterModal>
        </ModalCustom>

        <header>
          <h1>Coleções</h1>
          <Options>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              Nova Coleção
            </Button>
          </Options>
        </header>

        <CardCustom>
          {load ? <LinearProgress color="primary" /> : ''}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Data de Crição</TableCell>
                  <TableCell align="left">Data de Modificação</TableCell>
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {collections.map(collect => (
                  <TableRow>
                    <TableCell
                      style={{ maxWidth: '200px', overflow: 'hidden' }}
                    >
                      {collect.name}
                    </TableCell>
                    <TableCell>
                      {format(new Date(collect.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell align="left">
                      {' '}
                      {format(new Date(collect.updated_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={async () => {
                          if (
                            window.confirm(
                              'Você tem certeza que quer excluir este registro',
                            )
                          ) {
                            setLoader(true);
                            await handleDeleteCollection(collect.id);
                            setLoader(false);
                            success({
                              text: 'Registro deletado com sucesso !',
                              closerHover: true,
                            });
                          }
                        }}
                        style={{ background: 'red', width: '150px' }}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardCustom>
      </Container>
    </>
  );
};

export default Collection;
