import React from 'react';
import { BallOne, BallTwo, ColumnLeft, ColumnRight, ContentLeft, ContentRight, Wrapper } from './styles';
import FormYup from './FormYup';
import logo from '../../assets/logo.png';



const Register: React.FC = () => {
  return(
    <Wrapper>
      <ColumnLeft>
        <ContentLeft>
          <img src={logo} alt="Logo"/>
          <p>Crie sua conta e desfrute das nossas funcionalidades</p>
        </ContentLeft>
        <BallTwo />
        <BallOne />
      </ColumnLeft>
      <ColumnRight>
        <ContentRight>
          <p>Criação de Conta</p>
          <FormYup />
        </ContentRight>
      </ColumnRight>
    </Wrapper>
  );
}

export default Register;
