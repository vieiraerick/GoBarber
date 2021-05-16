import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerImg from "../images/pin.svg";

import "../styles/pages/places-map.css";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function PlacesMap() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    api.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Donate Device" />

          <h2>Veja que já está recebendo doações.</h2>
          <span>Clica no "+" e inclua a sua instituição na lista.</span>
        </header>

        <footer>
          <span>Mostre para os doadores onde voce está.</span>
        </footer>
      </aside>

      <Map
        center={[-21.1342282, -47.9846415]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {places.map((place) => {
          return (
            <Marker
              position={[place.latitude, place.longitude]}
              icon={mapIcon}
              key={place.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {place.name}
                <Link to={`/place/${place.id}`}>
                  <FiArrowRight size={32} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/place/create" className="create-place">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default PlacesMap;
