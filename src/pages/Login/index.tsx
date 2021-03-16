import React from 'react';
import { BallOne, BallTwo, ColumnLeft, ColumnRight, ContentLeft, ContentRight, Wrapper } from './styles';
import FormYup from './FormYup';
import logo from '../../assets/logo.png';



const Login: React.FC = () => {
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
          <p>Login no Sistema</p>
          <FormYup />
        </ContentRight>
      </ColumnRight>
    </Wrapper>
  );
}

export default Login;
