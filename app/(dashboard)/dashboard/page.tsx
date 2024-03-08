"use client";

import NavBar from "@/app/NavBar";
import DemographicView from "@/components/(dashboardViews)/DemographicView";
import HousingDetailsView from "@/components/(dashboardViews)/HousingDetailsView";
import OverviewView from "@/components/(dashboardViews)/OverviewView";
import DashboardSelector from "@/components/DashboardSelector";
import SearchBar from "@/components/SearchBar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    // Suburb being queried
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

    // Dashboard view
    const [selectedView, setSelectedView] = useState<string | null>("Overview");

    // Auth Email Verification
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

    const router = useRouter();

    const handleViewChange = (newView: string | null) => {
        setSelectedView(newView);
    };

    // Scroll to the top of the page when the component mounts or updates
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const supabase = createClientComponentClient();

        const checkAuthState = async (event: string, session: any) => {
            // Set isEmailVerified state to false if user is not signed in or has not verified their email
            if (event === "SIGNED_OUT" || !session?.user?.user_metadata?.email_verified) {
                redirectToSignIn();
                setIsEmailVerified(false);
            } else {
                setIsEmailVerified(true);
            }
        };

        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            checkAuthState("SIGNED_IN", session);
        };

        supabase.auth.onAuthStateChange(checkAuthState);
        fetchSession();
    }, []);

    const redirectToSignIn = () => {
        router.push("/dashboard/sign-in");
    };

    // console.log(`Is Email Verified? ${isEmailVerified}`);

    return (
        <>
            <div className="overflow-x-hidden">
                <NavBar />
                <div className="min-h-screen overflow-x-hidden px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                    {selectedSuburb ? (
                        <>
                            <h1 className="mt-20 text-4xl font-semibold">Dashboard</h1>
                            <div className="h-full flex flex-col">
                                <div className="max-w-[528px] my-6 z-40">
                                    <SearchBar setSelectedSuburb={setSelectedSuburb} />
                                </div>
                                <div>
                                    <h1 className="font-bold pl-1">{selectedSuburb}</h1>
                                </div>
                                <div className="w-full max-w-[2108px] mt-8">
                                    <div className="w-full flex flex-col md:flex-row">
                                        <DashboardSelector selectedView={selectedView} onChangeView={handleViewChange} />
                                        <div className="w-full flex-1 md:pl-10 py-2">
                                            {selectedView === "Overview" && <OverviewView selectedSuburb={selectedSuburb} />}
                                            {selectedView === "Demographic" && <DemographicView selectedSuburb={selectedSuburb} />}
                                            {selectedView === "Housing Details" && <HousingDetailsView selectedSuburb={selectedSuburb} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-screen mt-20 overflow-hidden px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                            <div className="h-2/5 flex flex-col justify-end items-center pb-20">
                                <h1 className="mb-4 text-xl font-semibold text-center">Search a suburb or postcode below</h1>
                                <div className="w-10/12 md:max-w-2xl">
                                    <SearchBar setSelectedSuburb={setSelectedSuburb} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
