import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoBox, InfoWindow } from '@react-google-maps/api';
import { dataGeoHuyen } from './dataGeoHuyen';
import { dataGeoXa } from './dataGeoXa'
import { constrainedMemory } from 'process';

interface iViewMap {
  lat: number;
  lng: number;
  zoom: number;
}
const containerStyle = {
  height: '800px',
  // width: '600px'
};
const options = { closeBoxURL: '', enableEventPropagation: true };


const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

const mapoptions = {
  styles: mapStyles,
  fullscreenControl: false,
  zoomControl: false,
  mapTypeControl: false,
}





function MapThongKeThanhHoa() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg"
  })
  console.log('re-render')
  const [viewMap, setViewMap] = useState<iViewMap>({
    lat: 20,
    lng: 105.5,
    zoom: 9.3
  });

  const [map, setMap] = useState(null)
  useEffect(()=> {
    console.log('add')
  }, [map])

  const onLoad = function callback(map: any) {
    handleMapLoadAll(map)

    setMap(map)
  }

  const onUnmount = function callback(map: any) {
    setMap(null)
  }

  const handleMapLoadAll = (map: any) => {
    handleMapLoadChildHuyen("Thanh Hóa", map)
    // handleMapLoadChildXa("Thanh Hóa", "Cẩm Thủy", map)

  }


  let currentXaPolygons: google.maps.Polygon[] = [];
  const clearCurrentXaPolygons = async () => {
    currentXaPolygons.forEach(polygon => polygon.setMap(null));
    currentXaPolygons = [];
  }

  const handleMapLoadChildHuyen = async (name: any, map: any) => {
    await clearCurrentXaPolygons()


    const _data = dataGeoHuyen.filter(i => i.properties.NAME_1 === name);
    _data.forEach((feature) => {
      const polygonCoords: any = []
      feature.geometry.coordinates.map(i => polygonCoords.push(i[0].map(coord => ({ lat: coord[1], lng: coord[0] }))))
      const polygon = new window.google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: "#fff",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#ce7a58',
        fillOpacity: 0.8,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `${feature.properties.NAME_2}<br>0.0`,
      });
      polygon.addListener('mouseover', (event: any) => {
        infoWindow.setPosition(event.latLng);
        polygon.setOptions({ fillColor: '#ff0000', strokeWeight: 3 });
        infoWindow.open(map);
      });
      polygon.addListener('mouseout', () => {
        polygon.setOptions({ fillColor: '#ce7a58', strokeWeight: 1 });
        infoWindow.close();
      });
      polygon.addListener('click', async (event: any) => {
        polygon.setOptions({ fillColor: '#ce7a58' });
        setViewMap({
          lat: feature.properties.lat,
          lng: feature.properties.lng,
          zoom: feature.properties.zoom
        })
        handleMapLoadChildXa(name, feature.properties.NAME_2, map);
      });

      polygon.setMap(map);
    });
  }

  const handleMapLoadChildXa = async (name1: any, name2: any, map: any) => {
    await clearCurrentXaPolygons()

    const _data = dataGeoXa.filter(i => i.properties.NAME_1 === name1 && i.properties.NAME_2 === name2)
    console.log(_data)


    _data.forEach((feature) => {
      const polygonCoords: any = []
      feature.geometry.coordinates.map(i => polygonCoords.push(i[0].map(coord => ({ lat: coord[1], lng: coord[0] }))))


      const polygon = new window.google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: "#fff",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#ce7a58',
        fillOpacity: 0.8,
      });
      currentXaPolygons.push(polygon);

      polygon.setMap(map);


      const infoWindow = new window.google.maps.InfoWindow({
        content: `${feature.properties.NAME_3}<br>0.0`,
      });

      polygon.addListener('mouseover', (event: any) => {
        infoWindow.setPosition(event.latLng);
        polygon.setOptions({ fillColor: '#ff0000', strokeWeight: 3 });
        infoWindow.open(map);
      });

      polygon.addListener('mouseout', () => {
        polygon.setOptions({ fillColor: '#ce7a58', strokeWeight: 1 });
        infoWindow.close();
      });

    });
  }



  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: viewMap.lat, lng: viewMap.lng }}
      zoom={viewMap.zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapoptions}
    >

    </GoogleMap>
  ) : <></>
}

export default React.memo(MapThongKeThanhHoa)