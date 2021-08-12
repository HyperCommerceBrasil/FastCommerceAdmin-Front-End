import React, { useCallback, useEffect, useState } from 'react';

import { Button, FormControlLabel } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Switch, Checkbox, Select } from 'formik-material-ui';

import * as Yup from 'yup';

import { error, success } from '@pnotify/core';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { Container, Content, ContentForm, ContentDropZone } from './styles';
import api from '../../../services/api';

import Layout from '../../layout';

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
}
const NewProduct: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const [imageProduct, setImageProduct] = useState('');
  const [fileImageProduct, setFileImageProduct] = useState();
  const [product, setProduct] = useState<Product>({} as Product);

  const history = useHistory();
  const { idProduct } = useParams<{ idProduct: string }>();

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

    async function getProduct() {
      try {
        const response = await api.get<Product>(
          `/products/listone/${idProduct}`,
        );
        setProduct(response.data);
        setImageProduct(response.data.images[0].image);
        setEditorContent(response.data.details);
      } catch (err) {
        error(`Ocorreu um erro ao trazer os dados do produto`);

        history.push('/products');
      }
    }

    getProduct();
    getCollection();
  }, [history, idProduct]);

  const onDrop = useCallback(
    async acceptedFiles => {
      const reader = new FileReader();
      setFileImageProduct(acceptedFiles[0]);
      setFileImageProduct(acceptedFiles[0]);

      console.log(acceptedFiles[0]);

      reader.onload = restImage => {
        const imagePreview = restImage.target?.result || '';
        setImageProduct(String(imagePreview));
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    // eslint-disable-next-line
    [fileImageProduct, imageProduct],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop,
  });

  const handleUpdate = useCallback(
    async data => {
      try {
        const response = await api.put<Product>(`/products/${idProduct}`, data);

        const dataFile = new FormData();

        console.log(fileImageProduct);
        dataFile.append('productImage', fileImageProduct || '');
        dataFile.append('productId', response.data.id || '');

        if (fileImageProduct) {
          await api.post('products/upload/image', dataFile);
        }

        success('Registro Atualizado com sucesso');
        window.location.href = '/products';
      } catch (err) {
        error('Ocorreu um erro ao salvar o produto verifique o console');
        console.log(err);
      }
    },
    // eslint-disable-next-line
    [fileImageProduct],
  );

  const YupSchema = Yup.object({
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

            <Formik
              enableReinitialize
              validationSchema={YupSchema}
              initialValues={{
                name: product.name,
                trending: product.trending,
                is_active: product.is_active,
                ean: product.ean,
                price: product.price,
                price_promotional: product.price_promotional,
                description: product.description,
                details: product.details,
                quantity: product.quantity,
                collectionId: product.collection ? product.collection.id : '',
              }}
              onSubmit={values => {
                const dataToSend = { ...values, details: editorContent };
                console.log(dataToSend);
                handleUpdate(dataToSend);
              }}
            >
              <>
                <Form>
                  <ContentForm>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Field
                        name="name"
                        component={TextField}
                        id="name"
                        variant="filled"
                        placeholder="Nome do Produto"
                        label="Nome do Produto"
                        // onChange={(evt: any) => {
                        //   setProduct({
                        //     ...product,
                        //     name: evt.target.value,
                        //   });
                        // }}
                      />

                      <span style={{ margin: 'auto' }}>
                        <Field
                          name="is_active"
                          component={Switch}
                          style={{
                            color: 'green',
                            margin: 'auto',
                          }}
                          checked={!!product.is_active}
                          onChange={(evt: any) => {
                            setProduct({
                              ...product,
                              is_active: evt.target.checked,
                            });
                          }}
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      </span>
                    </div>

                    <Field
                      name="ean"
                      component={TextField}
                      variant="filled"
                      placeholder="Codigo de Barras"
                      label="Código de Barras"
                    />
                    <Field
                      name="price"
                      variant="filled"
                      component={TextField}
                      placeholder="Preço"
                      label="Preço"
                    />
                    <Field
                      name="price_promotional"
                      component={TextField}
                      variant="filled"
                      placeholder="Preço promocional"
                      label="Preço promocional"
                    />
                    <Field
                      name="description"
                      variant="filled"
                      component={TextField}
                      rows={4}
                      placeholder="Descrição"
                      multiline
                      label="Descrição"
                    />
                    <Field
                      name="quantity"
                      component={TextField}
                      variant="filled"
                      placeholder="Quantidade"
                      label="Quantidade"
                    />

                    <InputLabel htmlFor="filled-age-native-simple">
                      Coleção
                    </InputLabel>
                    <Field
                      name="collectionId"
                      label="Coleção"
                      placeholder="Coleção"
                      component={Select}
                      variant="filled"
                      labelId="filled-age-native-simple"
                    >
                      {collections.map(collect => {
                        return (
                          <MenuItem key={collect.id} value={collect.id}>
                            {collect.name}
                          </MenuItem>
                        );
                      })}
                    </Field>

                    <fieldset style={{ padding: '10px', borderRadius: '10px' }}>
                      <legend>Opções Gerais</legend>
                      <FormControlLabel
                        control={
                          <Field
                            name="trending"
                            color="primary"
                            component={Checkbox}
                            checked={!!product.trending}
                            onChange={(evt: any) => {
                              setProduct({
                                ...product,
                                trending: evt.target.checked,
                              });
                            }}
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
                  ;
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
                </Form>
              </>
            </Formik>
          </Content>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;
