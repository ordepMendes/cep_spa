import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, Header } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";

function HomePage() {
  const [cep, setCep] = useState();
  const [coordinate, setCoordinate] = useState(0);
  const [infoCep, setInfoCep] = useState({
    logradouro: "",
    uf: "",
    localidade: "",
    bairro: "",
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

  const getLatAndLng = async (localidade, uf, logradouro, bairro) => {
    setInfoCep({
      localidade: localidade,
      uf: uf,
      logradouro: logradouro,
      bairro: bairro,
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      <Header>
        <p>Informe o CEP para buscarmos o endereço</p>
        <form onSubmit={handleTest}>
          <InputMask
            mask={"99999-999"}
            onChange={(e) => setCep(e.target.value)}
            id="input-search"
          />
          <Button type="submit">{<AiOutlineSearch />}</Button>
        </form>
      </Header>
      <main>
        <p>Endereço encontrado: </p>
        <p>CEP: {cep}</p>
        <p>{infoCep.logradouro}</p>
        <p>
          {infoCep.bairro}, {infoCep.localidade} - {infoCep.uf}
        </p>
        {isLoaded ? (
          <section>
            <GoogleMap
              mapContainerStyle={{ width: "70%", height: "400px" }}
              center={coordinate}
              zoom={15}
            >
              <Marker position={coordinate} />
            </GoogleMap>
          </section>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}

export default HomePage;
