import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Map, Marker, TileLayer } from "react-leaflet";
import api from "../services/api";

import "../styles/pages/place.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface PlaceParams {
  id: string;
}

export default function Place() {
  const params = useParams<PlaceParams>();
  const [place, setPlaces] = useState<Place>();

  useEffect(() => {
    api.get(`/places/${params.id}`).then((response) => {
      setPlaces(response.data);
    });
  }, [params.id]);

  if (!place) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-place">
      <Sidebar />

      <main>
        <div className="place-details">
          <div className="place-details-content">
            <h1>{place.name}</h1>

            <div className="map-container">
              <Map
                center={[place.latitude, place.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[place.latitude, place.longitude]}
                />
              </Map>

              <footer>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude}, ${place.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />
          </div>
        </div>
      </main>
    </div>
  );
}
