import Place from "../models/Place";
import imageView from "./imagesView";

export default {
  render(place: Place) {
    return {
      id: place.id,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      images: imageView.renderMany(place.images),
    };
  },

  renderMany(places: Place[]) {
    return places.map((place) => this.render(place));
  },
};
