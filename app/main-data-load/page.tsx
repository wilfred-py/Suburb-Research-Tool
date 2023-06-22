// "use client";

// import React from "react";
// import PocketBase from "pocketbase";
// // import main_data from "../../data/main_data_0-100.json";
// // import main_data from "../../data/main_data_0-200.json";
// // import main_data from "../../data/main_data_201-400.json";
// // import main_data from "../../data/main_data_401-800.json";
// // import main_data from "../../data/main_data_801-1200.json";
// // import main_data from "../../data/main_data_1201-1600.json";
// // import main_data from "../../data/main_data_1601-2000.json";
// // import main_data from "../../data/main_data_2001_2400.json";
// // import main_data from "../../data/main_data_2401_2800.json";

// interface SuburbData {
//     suburb_name: string;
//     // main_data: { [key: string]: string };
//     main_data: { [key: string]: { [key: string]: { [key: string]: string } } };
// }

// async function uploadData() {
//     const pb = new PocketBase("http://127.0.0.1:8090");

//     const suburbData: SuburbData[] = Object.entries(main_data).map(([suburbName, mainData]) => ({
//         suburb_name: suburbName,
//         main_data: mainData,
//     }));

//     for (const data of suburbData) {
//         const record = await pb.collection("main_data").create(data);
//     }
// }

// export default function Load() {
//     const handleUpload = async () => {
//         try {
//             console.log("button clicked");
//             await uploadData();
//             console.log("Data loaded successfully.");
//             // Redirect or perform any other action after successful data upload
//         } catch (error) {
//             console.error("Error loading data:", error);
//             // Handle error state or display an error message
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleUpload} type="submit">
//                 Upload Data
//             </button>
//         </div>
//     );
// }
