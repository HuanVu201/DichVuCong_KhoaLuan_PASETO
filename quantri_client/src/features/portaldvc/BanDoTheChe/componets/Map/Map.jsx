import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { dataGeoHuyen } from './dataGeoHuyen';
import { dataGeoXa } from './dataGeoXa';
import '../index.scss';


const Legend = () => {
    return (
        <div className="info legend leaflet-control">
            <p className="legend-title">Chất lượng quản trị dịch vụ công trong thực hiện TTHC, cung cấp DVC</p>
            <div className="legend-item">
                <div className="legend-color" style={{ background: '#219653' }}></div>
                90-100 điểm (Xuất sắc)
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: '#5CC488' }}></div>
                80-90 điểm (Tốt)
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: '#EAC344' }}></div>
                70-80 điểm (Khá)
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: '#F7942F' }}></div>
                50-70 điểm (Trung bình)
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: '#ED5050' }}></div>
                Dưới 50 điểm (Yếu)
            </div>
        </div>
    );
};

const MapFeatures = ({ targetLocation }) => {
    const map = useMap();
    const [activeDistrict, setActiveDistrict] = useState(null);

    const activeCommuneRef = useRef(null);
    const activeDistrictRef = useRef(null);
    const curDistrictRef = useRef(null);

    const colors = [
        { value: "90-100", color: "#6AB487" },
        { value: "80-90", color: "#90D4AB" },
        { value: "70-80", color: "#EDD484" },
        { value: "50-70", color: "#F5B475" },
        { value: "0-50", color: "#ED8484" }
    ]

    const districts = [
        { id: 'VNM.57.1_1', value: "90-100" },
        { id: 'VNM.57.2_1', value: "80-90" },
        { id: 'VNM.57.3_1', value: "70-80" },
        { id: 'VNM.57.4_1', value: "50-70" },
        { id: 'VNM.57.5_1', value: "0-50" },
        { id: 'VNM.57.6_1', value: "90-100" },
        { id: 'VNM.57.7_1', value: "80-90" },
        { id: 'VNM.57.8_1', value: "70-80" },
        { id: 'VNM.57.9_1', value: "50-70" },
        { id: 'VNM.57.10_1', value: "0-50" },
        { id: 'VNM.57.11_1', value: "90-100" },
        { id: 'VNM.57.12_1', value: "80-90" },
        { id: 'VNM.57.13_1', value: "70-80" },
        { id: 'VNM.57.14_1', value: "50-70" },
        { id: 'VNM.57.15_1', value: "0-50" },
        { id: 'VNM.57.16_1', value: "90-100" },
        { id: 'VNM.57.17_1', value: "80-90" },
        { id: 'VNM.57.18_1', value: "70-80" },
        { id: 'VNM.57.19_1', value: "50-70" },
        { id: 'VNM.57.20_1', value: "0-50" },
        { id: 'VNM.57.21_1', value: "90-100" },
        { id: 'VNM.57.22_1', value: "80-90" },
        { id: 'VNM.57.23_1', value: "70-80" },
        { id: 'VNM.57.24_1', value: "50-70" },
        { id: 'VNM.57.25_1', value: "0-50" },
        { id: 'VNM.57.26_1', value: "90-100" },
        { id: 'VNM.57.27_1', value: "80-90" }
    ];

    const communes = [
        { id: 'VNM.57.2.1_1', value: '80-90' },
        { id: 'VNM.57.2.2_1', value: '90-100' },
        { id: 'VNM.57.2.3_1', value: '50-70' },
        { id: 'VNM.57.2.4_1', value: '70-80' },
        { id: 'VNM.57.2.5_1', value: '0-50' },
        { id: 'VNM.57.2.6_1', value: '90-100' },
        { id: 'VNM.57.2.7_1', value: '80-90' },
        { id: 'VNM.57.2.8_1', value: '70-80' },
        { id: 'VNM.57.2.9_1', value: '50-70' },
        { id: 'VNM.57.2.10_1', value: '0-50' },
        { id: 'VNM.57.2.11_1', value: '90-100' },
        { id: 'VNM.57.2.12_1', value: '80-90' },
        { id: 'VNM.57.2.13_1', value: '70-80' },
        { id: 'VNM.57.2.14_1', value: '50-70' },
        { id: 'VNM.57.2.15_1', value: '0-50' },
        { id: 'VNM.57.2.16_1', value: '90-100' },
        { id: 'VNM.57.2.17_1', value: '80-90' },
        { id: 'VNM.57.2.18_1', value: '70-80' },
        { id: 'VNM.57.2.19_1', value: '50-70' },
        { id: 'VNM.57.2.20_1', value: '0-50' },
        { id: 'VNM.57.2.21_1', value: '90-100' },
        { id: 'VNM.57.2.22_1', value: '80-90' },
        { id: 'VNM.57.2.23_1', value: '70-80' },
        { id: 'VNM.57.2.24_1', value: '50-70' },
        { id: 'VNM.57.2.25_1', value: '0-50' },
        { id: 'VNM.57.2.26_1', value: '90-100' },
        { id: 'VNM.57.2.27_1', value: '80-90' }
    ];

    const getColor = (id, arr) => {
        const item = arr.find(d => d.id === id);
        if (!item) {
            return null;
        }

        const colorEntry = colors.find(c => c.value === item.value);
        return colorEntry ? colorEntry.color : null;
    }

    const getDistrictStyle = useCallback((feature) => {
        const isActive = feature.properties.GID_2 === curDistrictRef.current;
        return {
            color: 'white',
            weight: 1,
            fillOpacity: curDistrictRef.current == null || isActive ? 0.9 : 0.2,
            fillColor: getColor(feature.properties.GID_2, districts),
        };
    }, [activeDistrict]);


    const onDistrictFeature = useCallback((feature, layer) => {
        layer.bindPopup(feature.properties.NAME_2);
        layer.on({
            click: () => {
                setActiveDistrict(feature.properties.GID_2);
                curDistrictRef.current = feature.properties.GID_2
                const coords = layer.getBounds().getCenter();
                map.flyTo(coords, 11, { animate: true, duration: 0.8 });
            },
            mouseover: () => {
                layer.setStyle({
                    color: '#fdfbf7',
                    weight: 5,
                    fillOpacity: 0.9 // Highlight on hover
                });
                layer.bringToFront();
                layer.openPopup();
            },
            mouseout: () => {
                const isActive = feature.properties.GID_2 == curDistrictRef.current;
                layer.setStyle({
                    color: 'white',
                    weight: 1,
                    fillOpacity: (curDistrictRef.current == null && !isActive) || activeDistrict != null ? 0.9 : 0.2// Highlight on hover
                });
                layer.closePopup();
            },
        });
    }, [map, getDistrictStyle]);



    const getCommuneStyle = useCallback(feature => ({
        color: 'white',
        weight: feature.properties.GID_3 === activeCommuneRef.current ? 5 : 1,
        fillOpacity: 0.9,
        fillColor: getColor(feature.properties.GID_3, communes),
    }), []);

    const communeFuture = useMemo(() => ({
        type: "FeatureCollection",
        features: dataGeoXa.filter(xa => xa.properties.GID_2 === activeDistrict),
    }), [activeDistrict]);


    const onCommuneFeature = useCallback((feature, layer) => {
        layer.bindPopup(feature.properties.NAME_3);
        layer.on({
            click: () => {
                activeCommuneRef.current = feature.properties.GID_3;
                const coords = layer.getBounds().getCenter();
                map.flyTo(coords, 12, { animate: true, duration: 0.5 });
            },
            mouseover: () => {
                layer.setStyle({ color: 'white', weight: 5 });
                layer.bringToFront();
                layer.openPopup();
            },
            mouseout: () => {
                layer.setStyle(getCommuneStyle(feature));
                layer.closePopup();
            },
        });
    }, [map]);

    useEffect(() => {
        if (targetLocation) {
            let target = targetLocation.targetLocation;
            let foundLayer = null;

            if (target.type === "commune") {
                let commune = dataGeoXa.find(item => item.properties.GID_3 == target.id);

                if (commune) {
                    setActiveDistrict(commune.properties.GID_2)

                    map.eachLayer(layer => {
                        if (layer.feature) {
                            const featureId = layer.feature.properties.GID_3;
                            if (featureId == target.id) {
                                foundLayer = layer;
                                return false;
                            }
                        }
                        return true;
                    });

                    if (foundLayer) {
                        foundLayer.bindPopup(foundLayer.feature.properties.NAME_3);
                        activeCommuneRef.current = foundLayer.feature.properties.GID_3
                        foundLayer.setStyle(getCommuneStyle(foundLayer.feature));
                        foundLayer.openPopup()

                        const coords = foundLayer.getBounds().getCenter();
                        map.flyTo(coords, 13, { animate: true, duration: 0.5 });
                    } else {
                        console.error(`Commune with ID ${targetLocation} not found in map layers.`);
                    }
                }
            }

            if (target.type === "district") {
                let district = dataGeoHuyen.find(item => item.properties.GID_2 == target.id);
                if (district) {
                    map.eachLayer(layer => {
                        if (layer.feature) {
                            const featureId = layer.feature.properties.GID_2;

                            if (featureId == target.id) {
                                foundLayer = layer;
                                return false;
                            }
                        }
                        return true;
                    });

                    if (foundLayer) {
                        foundLayer.bindPopup(foundLayer.feature.properties.NAME_2);
                        activeDistrictRef.current = foundLayer.feature.properties.GID_2
                        foundLayer.setStyle(getDistrictStyle(foundLayer.feature));
                        foundLayer.openPopup()

                        const coords = foundLayer.getBounds().getCenter();
                        map.flyTo(coords, 11, { animate: true, duration: 0.5 });
                    } else {
                        console.warn(`District with ID ${targetLocation} not found in map layers.`);
                    }
                }
            }

            if (target.type === "Province") {
                // Clear active district
                setActiveDistrict(null);
                activeCommuneRef.current = null;
                curDistrictRef.current = null;

                // Fit all districts in the map's view
                const bounds = L.geoJSON(dataGeoHuyen).getBounds();
                map.fitBounds(bounds, { animate: true, duration: 0.5 });
            }
        }
    }, [targetLocation, map]);


    return (
        <>
            <GeoJSON data={dataGeoHuyen} onEachFeature={onDistrictFeature} style={getDistrictStyle} />
            <GeoJSON
                data={communeFuture}
                style={getCommuneStyle}
                key={activeDistrict}
                onEachFeature={onCommuneFeature}
            />
            <Legend />
        </>
    );
};

const BanDoTheCheMap = (targetLocation) => {


    const position = [19.758047, 99.249612];

    return (
        <MapContainer
            center={position}
            zoom={8.5}
            minZoom={8.5}
            style={{ height: "75vh", }} // Giảm chiều rộng 70px
        >
            <MapFeatures targetLocation={targetLocation} />
        </MapContainer>
    );
};

export default BanDoTheCheMap;