import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, OfferType, OfferPage} from '../../types/offer-type';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../map/const';
import {CITY_LOCATIONS} from '../../common';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferType[];
  selectedOffer: OfferType| OfferPage | undefined;
  mapWidth: React.CSSProperties['width'];
  mapHeight: React.CSSProperties['height'];
  mapMargin: string;
  actualCity?: string;
  isOfferPageMap: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer, mapWidth, mapHeight, mapMargin, actualCity, isOfferPageMap} = props;

  const getCityCoords = (isOfferPage:boolean):City| undefined=> {
    let city;
    if(isOfferPage && selectedOffer) {
      city = CITY_LOCATIONS.find((cityItem)=> cityItem.name === selectedOffer.city.name);
    } else {
      city = CITY_LOCATIONS.find((item)=> item.name === actualCity);
    }
    return city;
  };

  const activeCity = getCityCoords(isOfferPageMap);


  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      if(isOfferPageMap) {
        const selectedMarker = new Marker(
          selectedOffer !== undefined ? {
            lat: selectedOffer.city.location.latitude,
            lng: selectedOffer.city.location.longitude
          } : {
            lat: 0,
            lng: 0
          });
        selectedMarker
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }
      offers.map((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        },{ alt: 'pin-image'});


        marker
          .setIcon(
            selectedOffer !== undefined && item.id === selectedOffer.id && !isOfferPageMap
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, isOfferPageMap]);

  return <div data-testid= "map-id" style={{height: mapHeight, width:mapWidth, margin: mapMargin}} ref={mapRef}></div>;
}

export default Map;
