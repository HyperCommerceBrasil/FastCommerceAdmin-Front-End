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
import { Container, Content, ContentForm, ContentDropZone } from './styles';
import api from '../../../services/api';

import Layout from '../../layout';

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
  const [imageProduct, setImageProduct] = useState('');
  const [fileImageProduct, setFileImageProduct] = useState();

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

        const dataFile = new FormData();

        dataFile.append('productImage', fileImageProduct || '');
        dataFile.append('productId', response.data.id || '');

        await api.post('products/upload/image', dataFile);

        success('Registro Salvo com sucesso');
        history.push('/products');
      } catch (err) {
        error(err.response.data.message);
      }
    },
    // eslint-disable-next-line
    [editorContent, imageProduct, fileImageProduct],
  );

  const onDrop = useCallback(
    acceptedFiles => {
      const reader = new FileReader();
      setFileImageProduct(acceptedFiles[0]);

      reader.onload = restImage => {
        const imagePreview = restImage.target?.result || '';
        setImageProduct(String(imagePreview));
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    // eslint-disable-next-line
    [setFileImageProduct, fileImageProduct, imageProduct],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop,
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
        if (!fileImageProduct) {
          error('Informe a imagem do produto');
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

          <Content>
            <ContentDropZone {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div>Solte a Imagem</div>
              ) : (
                <div>
                  {imageProduct === '' ? (
                    <p>Arraste ou clique aqui para selecionar a imagem</p>
                  ) : (
                    <img src={imageProduct} alt="Imagem Preview" />
                  )}
                </div>
              )}
            </ContentDropZone>

            <form onSubmit={formik.handleSubmit}>
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
                  helperText={formik.touched.quantity && formik.errors.quantity}
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
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  autosave_ask_before_unload: true,
                  fullscreen_native: true,
                  image_advtab: true,
                  importcss_append: true,
                }}
              />

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
            </form>
          </Content>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;
