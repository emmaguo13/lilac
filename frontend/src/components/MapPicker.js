import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Polygon, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Button } from 'antd';
import L from 'leaflet';

import Icon from './Icon';

function MapPicker(props) {
    const { points, setCoords } = props;
    const [extra, setExtra] = useState([]);

    const setPoints = (val) => {
        setCoords(val);
        setExtra([...extra, { lat: 0, lng: 0 }]);
    };

    const map = useMapEvents({
        click(data) {
            setPoints([...points, data.latlng]);
        },
    });
    console.log('rerender');

    return (
        <>
            {points.length >= 3 ? <Polygon positions={points} /> : null}
            {points.map((point, index) => {
                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: ReactDOMServer.renderToString(<Icon perc={`#${index + 1}`} />),
                });

                return (
                    <Marker
                        key={index}
                        position={point}
                        icon={icon}
                        draggable
                        style={{ zIndex: 33 }}
                        eventHandlers={{
                            dragend: (data) => {
                                let pointsCopy = points;
                                pointsCopy[index] = data.target._latlng;
                                setPoints(pointsCopy);
                            },
                        }}
                    >
                        <Popup>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                Latitude: {point.lat} <br />
                                Longitude: {point.lng} <br />
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => {
                                        let pointsCopy = points;
                                        pointsCopy[index] = { lat: 0, lng: 0 };

                                        pointsCopy.splice(index, 1);
                                        console.log(pointsCopy);
                                        setPoints(pointsCopy);
                                    }}
                                    disabled={points.length == 1}
                                >
                                    Remove
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
            {extra.map((point, index) => {
                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: ReactDOMServer.renderToString(<Icon perc={`#${index + 1}`} />),
                });

                return (
                    <Marker
                        style={{ zIndex: -3 }}
                        key={index}
                        position={point}
                        icon={icon}
                    ></Marker>
                );
            })}
        </>
    );
}

export default MapPicker;
