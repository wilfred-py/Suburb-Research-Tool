"use client";

import Education from "./Education";
import Employment from "./Employment";
import Demographic from "./Demographic";
import Income from "./Income";
import Religion from "./Religion";
import Ancestry from "./Ancestry";
import Family from "./Family";
import Dwellings from "./Dwellings";

export default function FreemiumData() {
    return (
        <div>
            <div>
                <Education />
            </div>
            <div>
                <Employment />
            </div>
            <div>
                <Demographic />
            </div>
            <div>
                <Income />
            </div>
            <div>
                <Religion />
            </div>
            <div>
                <Ancestry />
            </div>
            <div>
                <Family />
            </div>
            <div>
                <Dwellings />
            </div>
        </div>
    );
}
