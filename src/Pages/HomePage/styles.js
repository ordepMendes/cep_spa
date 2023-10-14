import { styled } from "styled-components";

export const Header = styled.header`
  background-size: cover;
  width: 100%;
  height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #91D0F9;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

  #info-text{
    font-size: 21px;
    text-align: center;
  }

  form{
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;

  }

  #input-search{
    width: 350px;
    padding: 5px;
    font-size: 15px;
    border-radius: 10px;
    border: none;
  }

  @media screen and (max-width: 450px) {
    #input-search{
      width: 65%;
    }
  }

`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: #013D6F;
  transition: .4s;

  &:hover{
    opacity: .8;
  }


`;

export const Main = styled.main`
  padding: 35px 15px;

  section{
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    height: 400px;

    p{
      font-weight: 500;
      color: #CCCCCC;
    }
  };

  div{
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 30px;

    #address-ref{
      font-size: 25px;
      font-weight: 500;
      color: #013D6F;
    }

    p{
      font-size: 17px;
      color: #707070;
    }
  }

  #map-container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;

    p{
      align-self: flex-start;
      font-size: 20px;
      font-weight: 500;
      color: #013D6F;
      border-left: 4px solid #91D0F9;
      padding-left: 5px;
    }
  }
`;