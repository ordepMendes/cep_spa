import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { Header, Main } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { TbMapSearch } from "react-icons/tb";
import { GOOGLE_MAPS_URL, VIACEP_URL } from "../../constant";
import Map from "../../components/Map";

function HomePage() {
  const [cep, setCep] = useState("");
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const [infoCep, setInfoCep] = useState({});
  const [validation, setValidation] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchCEPData = async (cep) => {
    const response = await axios.get(`${VIACEP_URL}/${cep}/json/`);
    return response.data;
  };

  const fetchCoordinates = async (addressComponents) => {
    const address = addressComponents.join(",");
    const response = await axios.get(
      `${GOOGLE_MAPS_URL}?address=${address}&key=${apiKey}`
    );
    return response.data.results[0].geometry.location;
  };

  const handleCEPSearch = async (e) => {
    e.preventDefault();
    setValidation("");

    try {
      const { localidade, uf, logradouro, bairro } = await fetchCEPData(cep);

      const location = await fetchCoordinates([
        localidade,
        uf,
        logradouro,
        bairro,
      ]);
      setCoordinate(location);

      setInfoCep({ localidade, uf, logradouro, bairro, cep });
    } catch (error) {
      setValidation("Algo deu errado. Verifique o CEP e tente novamente.")
    }
  };

  return (
    <>
      <Header>
        <h1 id="title">Insira seu CEP para buscarmos o endereço</h1>
        <form onSubmit={handleCEPSearch}>
          <InputMask
            placeholder="Ex. xxxxx-xxx"
            mask={"99999-999"}
            onChange={(e) => setCep(e.target.value)}
            id="input-search"
          />
          <button id="button-search" type="submit">
            <AiOutlineSearch size={"30px"} color="#fff" />
          </button>
        </form>
        <sub>{validation}</sub>
      </Header>
      <Main>
        {!infoCep.cep ? (
          <section id="container-info">
            <p>Nada foi digitado ainda</p>
            <TbMapSearch size={250} color="#E4E3E3" />
          </section>
        ) : (
          <section id="map-container">
            <div id="info-cep-container">
              <p id="address-ref">Endereço encontrado</p>
              <div id="sub-info">
                <ul>
                  <li className="item">CEP: {infoCep.cep}</li>
                  <li className="item">{infoCep.logradouro}</li>
                  <li className="item">{infoCep.bairro}, {infoCep.localidade} - {infoCep.uf}</li>
                </ul>
              </div>
            </div>
            <Map coordinate={coordinate} />
          </section>
        )}
        <footer>© Pedro Mendes</footer>
      </Main>
      
    </>
  );
}

export default HomePage;
