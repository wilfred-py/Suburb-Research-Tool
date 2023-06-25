"use client";

import PocketBase from "pocketbase";
import { useState, useEffect } from "react";
import Education from "./Education";
import Employment from "./Employment";
import Demographic from "./Demographic";
import Income from "./Income";
import Religion from "./Religion";

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
        </div>
    );
}
