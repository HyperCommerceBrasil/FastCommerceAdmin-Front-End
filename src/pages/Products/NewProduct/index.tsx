import React, { useCallback, useEffect, useState } from 'react';


import { TextField, Button } from '@material-ui/core';
import {useDropzone} from 'react-dropzone'
import { Editor } from '@tinymce/tinymce-react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';



import { error, success } from '@pnotify/core';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  ContentForm,
  ContentDropZone
} from './styles';
import api from '../../../services/api';


import Layout from './../../layout';
import { Form, Formik, useFormik } from 'formik';

interface Collection {
  id: string;
  name: string;
}


interface Product {
    name: string;
    price: string;
    ean: string;
    price_promotional: string;
    description: string;
    details: string;
}
const NewProduct: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editorContent, setEditorContent] = useState("");


  const history = useHistory();



  

  const handleEditorChange = useCallback(async (content, editor) => {
    
     setEditorContent(content);
   
   }, [editorContent])

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

  const handleSaveProduct = useCallback(async (data: Product) =>{
    data.details = editorContent;

    try {
       const response = await api.post("/products", data);

       success("Registro Salve com sucesso")
       history.push("/products");
    } catch {
        error("Ocorreu um erro na válidação")
    }
  
  }, [editorContent])

   const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  const formik = useFormik({
    initialValues: {
       name: "",
       ean: "",
       price: "",
       price_promotional: "",
       description: "",
       details: "",
       quantity: "",
       collectionId: "",
    },
    onSubmit: (values) => {
      handleSaveProduct(values)
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
              {
                isDragActive ?
                  <p>Solte a Image</p> :
                  <p>Arraste ou clique aqui para selecionar a imagem</p>
              }
          </ContentDropZone>
         
             <form onSubmit={formik.handleSubmit}>
               <ContentForm>

                <TextField name="name" id="name" value={formik.values.name} onChange={formik.handleChange} variant="outlined" placeholder="Nome do Produto" label="Nome do Produto"></TextField>
  
                <TextField name="ean" value={formik.values.ean} onChange={formik.handleChange}  variant="outlined" placeholder="Codigo de Barras" label="Código de Barras"></TextField>
                <TextField name="price" value={formik.values.price} onChange={formik.handleChange}  variant="outlined" placeholder="Preço" label="Preço"></TextField>
                <TextField name="price_promotional" value={formik.values.price_promotional} onChange={formik.handleChange}  variant="outlined" placeholder="Preço promocional" label="Preço promocional"></TextField>
                <TextField name="description" variant="outlined" value={formik.values.description} onChange={formik.handleChange}  rows={4} placeholder="Descrição"  multiline label="Descrição"></TextField>
                <TextField name="quantity" variant="outlined" value={formik.values.quantity} onChange={formik.handleChange} placeholder="Quantidade"  label="Quantidade"></TextField>
           
              <InputLabel htmlFor="filled-age-native-simple">Coleção</InputLabel>
                <Select name="collectionId" label="Coleção" placeholder="Coleção" value={formik.values.collectionId} onChange={formik.handleChange}  variant="outlined" labelId="filled-age-native-simple">
                  {collections.map((collect) => {
                    return (
                      <MenuItem key={collect.id} value={collect.id}>{collect.name}</MenuItem>
                    )
                  })}
                  
                </Select>
               </ContentForm> 
                 <Editor
                value={editorContent}
                apiKey="vrzyvdpq0s7ufjhjrhrcysrwkvwwk2tbzrpq02d7k5m1knqg"
                onEditorChange={handleEditorChange}
                init={{
                  plugins: "fullscreen",
      
                  fullscreen_native: true
                }}
              /> 

               <Button
                  type="submit"
                  style={{
                    width: "200px",
                    height: "50px",
                    background: "#159BD8",
                    color: "white",
                    margin: "16px"
                  }}>
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
