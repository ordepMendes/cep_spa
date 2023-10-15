import { styled } from "styled-components";

export const Header = styled.header`
  width: 100%;
  background-color: #313131;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

  #title {
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }

  #input-search {
    width: 350px;
    font-size: 17px;
    height: 45px;
    padding: 5px;
    border: none;
    border-radius: 10px;
  }

 

  form {
    width: 100%;
    justify-content: center;
    display: flex;
    gap: 1rem;

    #button-search {
      width: 45px;
      height: 45px;
      border-radius: 100%;
      border: none;
      background-color: #19c37d;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.5s;
    }

    #button-search:hover {
      opacity: 0.7;
    }
  }
  sub {
    color: red;
    text-align: center;
  }

  @media screen and (max-width: 440px) {
    #input-search {
      width: 70%;
    }

    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      #button-search {
        width: 70%;
        border-radius: 10px;
      }
    }
  }
`;

export const Main = styled.main`
  padding: 35px 15px;

  #container-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 400px;

    p {
      font-size: 18px;
      color: #bababa;
      font-weight: 500;
    }
  }

  #info-cep-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-self: flex-start;

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    #address-ref {
      border-left: 6px solid #19c37d;
      padding-left: 15px;
      font-size: 25px;
    }

    #sub-info {
      font-size: 18px;
      display: flex;
      flex-direction: column;

      .item {
        list-style: none;
      }
    }
  }

  #map-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  footer {
    text-align: center;
    margin-top: 10px;
  }
`;
