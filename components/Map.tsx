"use client";

import { useLoadScript, GoogleMap, MarkerF, OverlayView } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map: NextPage = () => {
    const libraries = useMemo(() => ["places"], []);
    const mapCenter = useMemo(() => ({ lat: -33.85095, lng: 151.12895 }), []);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
            mapId: "f7ba9db7ff8dcdb6",
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
        region: "AU",
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-h-96 m-10 flex place-items-center">
            <GoogleMap
                options={mapOptions}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: "1000px", height: "350px" }}
                onLoad={() => console.log("Map Component Loaded...")}
            >
                <MarkerF position={mapCenter} onLoad={() => console.log("Marker Loaded")} />
            </GoogleMap>
        </div>
    );
};

export default Map;
