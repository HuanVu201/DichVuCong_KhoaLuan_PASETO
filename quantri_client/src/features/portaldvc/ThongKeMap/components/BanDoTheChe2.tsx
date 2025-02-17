import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoBox, InfoWindow } from '@react-google-maps/api';
import { dataGeoHuyen } from './dataGeoHuyen';
import { dataGeoXa } from './dataGeoXa'

import customMarkerIcon from './download.png';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const containerStyle = {
    height: '700px'
};
const options = { closeBoxURL: '', enableEventPropagation: true };

const center = {
    lat: 19.95,
    lng: 105.23
};

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
    fullscreenControl: true,
    zoomControl: true,
    mapTypeControl: false,
}

function BanDoTheChe2() {
    const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map:any) {
        handleMapLoadAll(map)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])



    const handleMapLoadChild = (name: any, map: any) => {
        var _data = dataGeoHuyen.filter(i => i.properties.NAME_1 === name)
        var _data1: any = []
        var _data2: any = []
        var _data3: any = []
        _data.map((i, index) => {
            _data1[index] = loadPolygonMap1(i.geometry.coordinates[0][0])
            _data3[index] = i.properties.NAME_2
        })

        _data1.map((i: any, index: any) => {
            _data2[index] = new window.google.maps.Polygon({
                paths: i,
                strokeColor: "#f44336",
                strokeOpacity: 1,
                strokeWeight: 1,
                fillColor: '#E57373',
                fillOpacity: 0.6,
            });
            _data2[index].setMap(map);
        })
    }

    const handleMapLoadAll = (map: any) => {
        handleMapLoadChild("ThanhHóa", map)
    }

    const loadPolygonMap1 = (data: any) => {
        var quangBinhCoord = []

        for (let index = 0; index < data.length; index++) {
            let coord: any = {}
            coord.lat = data[index][1]
            coord.lng = data[index][0]
            quangBinhCoord.push(coord)
        }
        return quangBinhCoord;
    }
    return isLoaded ? (
        <Spin spinning={loadingAnimation}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9.2}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapoptions}
            >

            </GoogleMap>
        </Spin>
    ) : <></>
}

export default React.memo(BanDoTheChe2)
// export default MapThongKeThanhHoa