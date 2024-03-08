"use client";

import { GoogleMap, useLoadScript, MarkerF, OverlayView } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

interface MapProps {
    selectedSuburb: string | null;
}

type LatLng = { lat: number; lng: number };
type LatLngLiteral = { lat: number; lng: number };

function deconstructSuburb(suburb: string | null) {
    // State Regex
    const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT|QLD|Other Territories)/;

    // ! Suburb Name
    // Create substrings based on stateRegex
    const suburbMatch = suburb?.match(stateRegex);

    // If it exists, return first match in suburbName
    const suburbName = suburbMatch ? suburbMatch[1] : null;

    // ! State Name
    const stateName = suburbMatch ? suburbMatch[2] : null;

    // ! Post Code
    const postcode = suburb?.slice(-4);

    // console.log(`suburbName: ${suburbName}`);

    return {
        suburbName,
        stateName,
        postcode,
    };
}

// * Geocode suburb, postcode, state => lat and lng
const Map: NextPage<MapProps> = (props: MapProps) => {
    const libraries = useMemo(() => ["places"], []);

    // states
    const [geocodeData, setGeocodeData] = useState<LatLng | LatLngLiteral>();
    const [suburbName, setSuburbName] = useState("");
    const [stateName, setStateName] = useState("");
    const [postcode, setPostcode] = useState("");
    const [geocodeFetched, setGeoCodeFetched] = useState(false);

    // ! Get suburb information when props.selectedSuburb changes
    useEffect(() => {
        async function getSuburbDetails() {
            try {
                const { suburbName, stateName, postcode } = deconstructSuburb(props.selectedSuburb);
                // console.log(`suburbName: ${suburbName}`);
                setSuburbName(suburbName || "");
                setStateName(stateName || "");
                setPostcode(postcode || "");
            } catch (error) {
                console.error("Error getting suburb details", error);
            }
        }

        getSuburbDetails();
    }, [props.selectedSuburb]);

    // ! Asynchronously geocode suburbName, stateName, postcode to get lat & lng when suburbName state changes
    useEffect(() => {
        const geocode = async () => {
            try {
                // console.log("initiated geocode");
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${suburbName}+${stateName}+${postcode}&region=AU&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
                );
                const geocodeData = await response.json();
                const location = geocodeData.results[0]?.geometry.location;
                // console.log(location);
                if (location) {
                    // console.log("location geocoded");
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

    const mapCenter = useMemo(() => geocodeData || { lat: 0, lng: 0 }, [geocodeData]);

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
        <div className="w-full h-full">
            <div className="z-0 flex place-items-center w-full h-full">
                {isLoaded && geocodeData ? (
                    <GoogleMap
                        options={mapOptions}
                        zoom={13}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        onLoad={() => console.log("Map Component Loaded...")}
                    >
                        {geocodeData && <MarkerF position={mapCenter} onLoad={() => console.log("Marker Loaded")} />}
                    </GoogleMap>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Map;
