import React, { FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import "../styles/pages/create-place.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

export default function CreatePlace() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState("");

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;
    const data = new FormData();

    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));

    await api.post("/places", data);

    alert("Cadastro realizado com sucesso!!");
    history.push("/app");
  }

  return (
    <div id="page-create-place">
      <Sidebar />

      <main>
        <form className="create-place-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Localização e Nome</legend>

            <Map
              center={[-21.1342282, -47.9846415]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
