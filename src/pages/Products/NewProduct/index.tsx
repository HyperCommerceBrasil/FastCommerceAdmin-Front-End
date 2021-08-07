import React, { useCallback, useEffect, useState } from 'react';

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import * as Yup from 'yup';

import { error, success } from '@pnotify/core';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import Loader from '../../../components/Loader/LinearLoader';
import {
  Container,
  Content,
  ContentForm,
  ContentDropZone,
  ContentMenu,
} from './styles';
import api from '../../../services/api';

import Layout from '../../layout';
import MenuTab from '../../../components/MenuTab';
import { resolveResponse } from '../../../utils/resolverResponse';

interface Collection {
  id: string;
  name: string;
}

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
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const [imageProduct1, setImageProduct1] = useState('');
  const [imageProduct2, setImageProduct2] = useState('');

  const [imageProduct3, setImageProduct3] = useState('');

  const [imageProduct4, setImageProduct4] = useState('');

  const [fileImageProduct1, setFileImageProduct1] = useState();
  const [fileImageProduct2, setFileImageProduct2] = useState();
  const [fileImageProduct3, setFileImageProduct3] = useState();
  const [fileImageProduct4, setFileImageProduct4] = useState();

  const [indiceMenu, setIndiceMenu] = useState(1);
  const [load, setLoad] = useState(false);

  const history = useHistory();

  const handleEditorChange = useCallback(
    async (content, editor) => {
      setEditorContent(content);
    },
    // eslint-disable-next-line
    [editorContent],
  );

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

  const handleSaveProduct = useCallback(
    async (data: Product) => {
      data.details = editorContent;

      try {
        const response = await api.post<Product>('/products', data);

        const dataFile1 = new FormData();
        const dataFile2 = new FormData();

        const dataFile3 = new FormData();

        const dataFile4 = new FormData();

        try {
          dataFile1.append('productImage', fileImageProduct1 || '');
          dataFile1.append('productId', response.data.id || '');

          if (dataFile1) {
            await api.post('products/upload/image', dataFile1);
          }

          dataFile2.append('productImage', fileImageProduct2 || '');
          dataFile2.append('productId', response.data.id || '');

          if (dataFile2) {
            await api.post('products/upload/image', dataFile2);
          }

          dataFile3.append('productImage', fileImageProduct3 || '');
          dataFile3.append('productId', response.data.id || '');

          if (dataFile3) {
            await api.post('products/upload/image', dataFile3);
          }

          dataFile4.append('productImage', fileImageProduct4 || '');
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
    [
      editorContent,
      imageProduct1,
      fileImageProduct1,
      imageProduct2,
      fileImageProduct2,
      imageProduct3,
      fileImageProduct3,
      imageProduct4,
      fileImageProduct4,
    ],
  );

  const onDrop1 = useCallback(
    acceptedFiles => {
      const reader = new FileReader();
      setFileImageProduct1(acceptedFiles[0]);

      reader.onload = restImage => {
        const imagePreview = restImage.target?.result || '';
        setImageProduct1(String(imagePreview));
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    // eslint-disable-next-line
    [setFileImageProduct1, fileImageProduct1, imageProduct1],
  );

  const onDrop2 = useCallback(
    acceptedFiles => {
      const reader = new FileReader();
      setFileImageProduct2(acceptedFiles[0]);

      reader.onload = restImage => {
        const imagePreview = restImage.target?.result || '';
        setImageProduct2(String(imagePreview));
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    // eslint-disable-next-line
    [setFileImageProduct2, fileImageProduct2, imageProduct2],
  );

  const onDrop3 = useCallback(
    acceptedFiles => {
      const reader = new FileReader();
      setFileImageProduct3(acceptedFiles[0]);

      reader.onload = restImage => {
        const imagePreview = restImage.target?.result || '';
        setImageProduct3(String(imagePreview));
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    // eslint-disable-next-line
    [setFileImageProduct3, fileImageProduct3, imageProduct3],
  );

  const onDrop4 = useCallback(
    acceptedFiles => {
      const reader = new FileReader();
      setFileImageProduct4(acceptedFiles[0]);

      reader.onload = restImage => {
        const imagePreview = restImage.target?.result || '';
        setImageProduct4(String(imagePreview));
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    // eslint-disable-next-line
    [setFileImageProduct4, fileImageProduct4, imageProduct4],
  );

  const dropzone1 = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop: onDrop1,
  });
  const dropzone2 = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop: onDrop2,
  });

  const dropzone3 = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop: onDrop3,
  });

  const dropzone4 = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop: onDrop4,
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      trending: false,
      is_active: true,
      ean: '',
      price: '',
      price_promotional: '',
      description: '',
      details: '',
      quantity: '',
      collectionId: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Campo obrigatório')
        .max(50, 'O nome pode ter no máximo 50 characteres')
        .min(5, 'O nome do produto precisa ter no minimo 5 caracteres'),
      ean: Yup.string().required('Campo obrigatório').max(20),
      price: Yup.string()
        .required('Campo obrigatório')
        .matches(/[0-9]/, 'O preço precisa ser um numero'),
      price_promotional: Yup.string()
        .required('Campo obrigatório')
        .matches(/[0-9]/, 'O preço precisa ser um numero'),
      quantity: Yup.string()
        .required('Campo obrigatório')
        .matches(/[0-9]/, 'A quantidade precisa ser um numero'),
    }),
    onSubmit: values => {
      try {
        if (
          !fileImageProduct1 &&
          !fileImageProduct2 &&
          !fileImageProduct3 &&
          !fileImageProduct4
        ) {
          error('Informe a imagem do produto');
          setIndiceMenu(2);
        } else {
          handleSaveProduct(values);
        }
      } catch {
        error('Verifique se todos os campos foram preenchidos corretamente');
      }
    },
  });
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

          <MenuTab
            setIndice={setIndiceMenu}
            indice={indiceMenu}
            tabs={[
              { name: 'CADASTRO', value: 1 },
              { name: 'IMAGENS', value: 2 },
            ]}
          />

          <ContentMenu>
            <Loader show={load} />
            <Content show={indiceMenu === 1}>
              <form onSubmit={formik.handleSubmit}>
                <Button
                  type="submit"
                  style={{
                    width: '200px',
                    height: '50px',
                    background: '#159BD8',
                    color: 'white',
                    margin: '16px',
                  }}
                >
                  Salvar
                </Button>
                ;
                <ContentForm>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <TextField
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      variant="outlined"
                      placeholder="Nome do Produto"
                      label="Nome do Produto"
                    />

                    <span style={{ margin: 'auto' }}>
                      <Switch
                        name="is_active"
                        color="primary"
                        checked={formik.values.is_active}
                        onChange={formik.handleChange}
                        style={{
                          color: 'green',
                          margin: 'auto',
                        }}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    </span>
                  </div>

                  <TextField
                    name="ean"
                    error={formik.touched.name && Boolean(formik.errors.ean)}
                    helperText={formik.touched.ean && formik.errors.ean}
                    value={formik.values.ean}
                    onChange={formik.handleChange}
                    variant="outlined"
                    placeholder="Codigo de Barras"
                    label="Código de Barras"
                  />
                  <TextField
                    name="price"
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    variant="outlined"
                    placeholder="Preço"
                    label="Preço"
                  />
                  <TextField
                    name="price_promotional"
                    error={
                      formik.touched.price_promotional &&
                      Boolean(formik.errors.price_promotional)
                    }
                    helperText={
                      formik.touched.price_promotional && formik.errors.name
                    }
                    value={formik.values.price_promotional}
                    onChange={formik.handleChange}
                    variant="outlined"
                    placeholder="Preço promocional"
                    label="Preço promocional"
                  />
                  <TextField
                    name="description"
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    rows={4}
                    placeholder="Descrição"
                    multiline
                    label="Descrição"
                  />
                  <TextField
                    name="quantity"
                    error={
                      formik.touched.quantity && Boolean(formik.errors.quantity)
                    }
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                    }
                    variant="outlined"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    placeholder="Quantidade"
                    label="Quantidade"
                  />

                  <InputLabel htmlFor="filled-age-native-simple">
                    Coleção
                  </InputLabel>
                  <Select
                    name="collectionId"
                    label="Coleção"
                    placeholder="Coleção"
                    value={formik.values.collectionId}
                    onChange={formik.handleChange}
                    variant="outlined"
                    labelId="filled-age-native-simple"
                  >
                    {collections.map(collect => {
                      return (
                        <MenuItem key={collect.id} value={collect.id}>
                          {collect.name}
                        </MenuItem>
                      );
                    })}
                  </Select>

                  <fieldset style={{ padding: '10px', borderRadius: '10px' }}>
                    <legend>Opções Gerais</legend>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="trending"
                          checked={formik.values.trending}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label="Aparece na Home"
                    />
                  </fieldset>
                </ContentForm>
                <Editor
                  value={editorContent}
                  apiKey="vrzyvdpq0s7ufjhjrhrcysrwkvwwk2tbzrpq02d7k5m1knqg"
                  onEditorChange={handleEditorChange}
                  init={{
                    plugins:
                      'advcode print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    toolbar:
                      'code undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    autosave_ask_before_unload: true,
                    fullscreen_native: true,
                    image_advtab: true,
                    importcss_append: true,
                  }}
                />
              </form>
            </Content>
            <Content show={indiceMenu === 2}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  margin: 'auto',
                  padding: '15px',
                }}
              >
                <ContentDropZone {...dropzone1.getRootProps()}>
                  <input {...dropzone1.getInputProps()} />
                  {dropzone1.isDragActive ? (
                    <div>Solte a Imagem</div>
                  ) : (
                    <div>
                      {imageProduct1 === '' ? (
                        <div>
                          <p>Arraste ou clique aqui para selecionar a imagem</p>
                        </div>
                      ) : (
                        <img src={imageProduct1} alt="Imagem Preview" />
                      )}
                    </div>
                  )}
                </ContentDropZone>
                <ContentDropZone {...dropzone2.getRootProps()}>
                  <input {...dropzone2.getInputProps()} />
                  {dropzone2.isDragActive ? (
                    <div>Solte a Imagem</div>
                  ) : (
                    <div>
                      {imageProduct2 === '' ? (
                        <div>
                          <p>Arraste ou clique aqui para selecionar a imagem</p>
                        </div>
                      ) : (
                        <img src={imageProduct2} alt="Imagem Preview" />
                      )}
                    </div>
                  )}
                </ContentDropZone>

                <ContentDropZone {...dropzone3.getRootProps()}>
                  <input {...dropzone3.getInputProps()} />
                  {dropzone3.isDragActive ? (
                    <div>Solte a Imagem</div>
                  ) : (
                    <div>
                      {imageProduct3 === '' ? (
                        <div>
                          <p>Arraste ou clique aqui para selecionar a imagem</p>
                        </div>
                      ) : (
                        <img src={imageProduct3} alt="Imagem Preview" />
                      )}
                    </div>
                  )}
                </ContentDropZone>

                <ContentDropZone {...dropzone4.getRootProps()}>
                  <input {...dropzone4.getInputProps()} />
                  {dropzone4.isDragActive ? (
                    <div>Solte a Imagem</div>
                  ) : (
                    <div>
                      {imageProduct4 === '' ? (
                        <div>
                          <p>Arraste ou clique aqui para selecionar a imagem</p>
                        </div>
                      ) : (
                        <img src={imageProduct4} alt="Imagem Preview" />
                      )}
                    </div>
                  )}
                </ContentDropZone>
              </div>
            </Content>
          </ContentMenu>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;
