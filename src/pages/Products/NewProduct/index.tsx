import React, { useEffect, useState } from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { TextField, Select, MenuItem } from '@material-ui/core';

import { error } from '@pnotify/core';
import { Editor } from '@tinymce/tinymce-react';
import { FaArrowLeft, FaArrowRight, FaBackward } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  GridImages,
  FormCustom,
  ContentForm,
  FormGroup,
} from './styles';
import api from '../../../service/api';

interface Collection {
  id: string;
  name: string;
}

const NewProduct: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [nextStep, setNextStep] = useState(false);

  const history = useHistory();

  // CONST

  useEffect(() => {
    async function getCollection(): Promise<void> {
      try {
        const response = await api.get<Collection[]>('collections');
        setCollections(response.data);
      } catch {
        error('Ocorreu um erro, atualize a página e tente novamente :(');
      }
    }

    getCollection();
  }, []);
  return (
    <>
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
          <button
            type="button"
            onClick={() => {
              setNextStep(!nextStep);
            }}
          >
            Avançar
          </button>
        </header>

        <Content>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              flexWrap: 'wrap',
            }}
          >
            <ContentForm>
              <form>
                <FormGroup>
                  {nextStep && (
                    <GridImages>
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />

                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                      <img
                        src="https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/1/9/1905309_1.jpg"
                        alt="café"
                      />
                    </GridImages>
                  )}
                  {!nextStep && (
                    <FormCustom>
                      <TextField
                        placeholder="Nome do Produto"
                        name="name"
                        variant="outlined"
                        id="name"
                      />
                      <TextField
                        placeholder="Preço do produto"
                        name="price"
                        variant="outlined"
                        id="price"
                      />
                      <TextField
                        placeholder="Estoque"
                        variant="outlined"
                        name="quantity"
                        id="quantity"
                      />
                      <Select
                        style={{ marginLeft: '30px', height: '56px' }}
                        variant="outlined"
                        id="collection"
                      >
                        {collections.map(collection => (
                          <MenuItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormCustom>
                  )}
                </FormGroup>

                {!nextStep && (
                  <div
                    style={{
                      marginLeft: '32px',
                      width: '100%',
                    }}
                  >
                    <Editor
                      init={{
                        height: 400,
                        statusbar: false,

                        plugins: 'fullscreen',
                        fullscreen_native: true,
                      }}
                    />
                  </div>
                )}
              </form>
            </ContentForm>
          </div>
        </Content>
      </Container>
    </>
  );
};
export default NewProduct;
