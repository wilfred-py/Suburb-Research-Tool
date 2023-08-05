"use client";

import { useLoadScript, GoogleMap, MarkerF, OverlayView } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

// Get Suburb Name from URL
function getSuburbDetails() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;

    // State Regex
    const stateRegex = /^(.*?)(VIC|NSW|ACT|WA|SA)/;

    // String in URL
    const stringInURL = pathname.replace("/suburb/", "");

    // ! Suburb Name
    // Create substrings based on stateRegex
    const suburbMatch = stringInURL.match(stateRegex);

    // If it exists, return first match in suburbName
    const suburbName = suburbMatch ? suburbMatch[1] : null;

    // Replace "+" and remove leading and trailing white spaces
    const formattedSuburbName = suburbName ? suburbName.replaceAll("+", " ").trim() : null;

    // ! State Name
    const stateName = suburbMatch ? suburbMatch[2] : null;

    // ! Post Code
    const postcode = stringInURL.slice(-4);

    return {
        suburbName: formattedSuburbName,
        stateName,
        postcode,
    };
}

const Map: NextPage = () => {
    const libraries = useMemo(() => ["places"], []);

    // ! Geocode suburb, postcode, state => lat and lng
    const [geocodeData, setGeocodeData] = useState<{ lat: number; lng: number } | null>(null);
    const [suburbName, setSuburbName] = useState("");
    const [geocodeFetched, setGeoCodeFetched] = useState(false);

    useEffect(() => {
        const { suburbName, stateName, postcode } = getSuburbDetails();
        setSuburbName(suburbName || "");
        const geocode = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${suburbName}+${stateName}+${postcode}&region=AU&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
                );
                const geocodeData = await response.json();
                const location = geocodeData.results[0]?.geometry.location;
                if (location) {
                    setGeocodeData({ lat: location.lat, lng: location.lng });
                }
            } catch (error) {
                console.error("Error with geocode request:", error);
            } finally {
                setGeoCodeFetched(true);
            }
        };
        geocode();
    }, [suburbName]);

    const mapCenter = useMemo(() => geocodeData, [geocodeData]);

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

    if (!geocodeData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="z-0 max-h-96 m-10 flex place-items-center">
            {isLoaded ? (
                geocodeFetched ? (
                    <GoogleMap
                        options={mapOptions}
                        zoom={13}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: "1000px", height: "350px" }}
                        onLoad={() => console.log("Map Component Loaded...")}
                    >
                        {geocodeData && <MarkerF position={mapCenter} onLoad={() => console.log("Marker Loaded")} />}
                    </GoogleMap>
                ) : (
                    <p>Loading...</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Map;