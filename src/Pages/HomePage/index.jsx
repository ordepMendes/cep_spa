import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { Button, Header, Main } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { TbMapSearch } from "react-icons/tb";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function HomePage() {
  const [cep, setCep] = useState();
  const [coordinate, setCoordinate] = useState(0);
  const [infoCep, setInfoCep] = useState({
    logradouro: "",
    uf: "",
    localidade: "",
    bairro: "",
    cep: "",
  });
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleTest = async (e) => {
    e.preventDefault();
    await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        const { localidade, uf, logradouro, bairro } = res.data;
        getLatAndLng(localidade, uf, logradouro, bairro);
      })
      .catch((err) => console.log("erro: " + err));
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const getLatAndLng = async (localidade, uf, logradouro, bairro) => {
    setInfoCep({
      localidade: localidade,
      uf: uf,
      logradouro: logradouro,
      bairro: bairro,
      cep: cep,
    });
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${localidade},${uf},${logradouro}&key=${apiKey}`
      )
      .then((res) => {
        const location = res.data.results[0].geometry.location;
        setCoordinate(location);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header>
        <p id="info-text">Informe o CEP para buscarmos o endereço</p>
        <form onSubmit={handleTest}>
          <InputMask
            placeholder="Ex. xxxxx-xxx"
            mask={"99999-999"}
            onChange={(e) => setCep(e.target.value)}
            id="input-search"
          />
          <Button type="submit">
            {<AiOutlineSearch size={"30px"} color="#fff" />}
          </Button>
        </form>
      </Header>
      <Main>
        {!infoCep.cep ? (
          <section>
            <p>Nada foi digitado ainda</p>
            <TbMapSearch size={250} color="#E4E3E3" />
          </section>
        ) : (
          <>
            <div>
              <p id="address-ref">Endereço encontrado</p>
              <p>CEP: {infoCep.cep}</p>
              <p>{infoCep.logradouro}</p>
              <p>
                {infoCep.bairro}, {infoCep.localidade} - {infoCep.uf}
              </p>
            </div>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "80%", height: "500px" }}
                center={coordinate}
                zoom={15}
              >
                <Marker position={coordinate} />
              </GoogleMap>
            ) : (
              <></>
            )}
          </>
        )}
      </Main>
    </>
  );
}

export default HomePage;
