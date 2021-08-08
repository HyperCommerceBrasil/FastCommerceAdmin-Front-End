import React, { useCallback, useEffect, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';
import Select from './../../../components/Select';
import InputLabel from '@material-ui/core/InputLabel';
import * as Yup from 'yup';
import Checkbox from './../../../components/Checkbox';

import { error } from '@pnotify/core';
import { Form, Formik } from 'formik';
import {
  Container,
  Content,
  ContentForm,
  ContentDropZone,
  ContentMenu,
} from './styles';
import api from '../../../services/api';

import MenuTab from '../../../components/MenuTab';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface Collection {
  id: string;
  name: string;
}

interface Image {
  image: string;
  key: string;
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
  images: Image[];
  quantity: string;
  collectionId: string;
  collection: Collection;
}

interface FormProps {
  functionAction: any;
  product?: Product;
}

const FormProduct: React.FC<FormProps> = ({ product, functionAction }) => {
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
  
    if (product && product.name) {
    
        setImageProduct1(product.images[0].image);
        setImageProduct2(product.images[1].image);
        setImageProduct3(product.images[2].image);
        setImageProduct4(product.images[3].image);
        setEditorContent(product.details);

    }
  }, [product]);

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

  const schemaValidData = Yup.object({
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
    collectionId: Yup.string().required('Informe a Coleção'),
  });

  return (
    <>
      <Container>
        <MenuTab
          setIndice={setIndiceMenu}
          indice={indiceMenu}
          tabs={[
            { name: 'CADASTRO', value: 1 },
            { name: 'IMAGENS', value: 2 },
          ]}
        />

        <ContentMenu>
          <Content show={indiceMenu === 1}>
            <Formik
              initialValues={{
                name: product?.name || '',
                trending: product?.trending || false,
                is_active: product?.is_active || true,
                ean: product?.ean || '',
                price: product?.price || '',
                price_promotional: product?.price_promotional || '',
                description: product?.description || '',
                details: product?.details || '',
                quantity: product?.quantity || '',
                collectionId: product?.collection?.id || '',
                
              }}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={schemaValidData}
              enableReinitialize={true}
              onSubmit={data => {
                if (
                  !imageProduct1 ||
                  !imageProduct2 ||
                  !imageProduct3 ||
                  !imageProduct4  
              
                ) {
                  error({
                    title: 'Erro ao gravar',
                    text: 'Por favor informe as 4 imagens para conseguir salvar o produto',
                  });
                  setIndiceMenu(2);
                } else {
                  functionAction(data, [
                    fileImageProduct1,
                    fileImageProduct2,
                    fileImageProduct3,
                    fileImageProduct4,
                  ]);
                }
              }}
            >
              <Form>
                <Button
                  type="submit"
                  colorTheme="primary"
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

                <ContentForm>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Input
                      name="name"
                      id="name"
                      placeholder="Nome do Produto"
                      label="Nome do Produto"
                    />

                    {/* <span style={{ margin: 'auto' }}>
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
                    </span> */}
                  </div>

                  <Input
                    name="ean"
                    placeholder="Codigo de Barras"
                    label="Código de Barras"
                  />
                  <Input name="price" placeholder="Preço" label="Preço" />
                  <Input
                    name="price_promotional"
                    placeholder="Preço promocional"
                    label="Preço promocional"
                  />
                  <Input
                    name="description"
                    placeholder="Descrição"
                    label="Descrição"
                  />
                  <Input
                    name="quantity"
                    placeholder="Quantidade"
                    label="Quantidade"
                  />

                  <InputLabel htmlFor="filled-age-native-simple">
                    Coleção
                  </InputLabel>
                  <Select
                    name="collectionId"
                    id="collectionId"
                    label="Coleção"
                    placeholder="Coleção"
                  >

                    {collections.map(collect => {
                      return (
                        <option key={collect.id} value={collect.id}>
                          {collect.name}
                        </option>
                      );
                    })}
                  </Select>

                  <fieldset style={{ padding: '10px', borderRadius: '10px' }}>
                    <legend>Opções Gerais</legend>

                    <Checkbox
                      name="trending"
                      id="trending  "
                      label="Aparece na Home"
                    ></Checkbox>
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
              </Form>
            </Formik>
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
    </>
  );
};
export default FormProduct;
