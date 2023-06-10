import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

// Keys of Suburb Data
const summaryData = summary_data_Abbotsford;
const mainData = main_data_Abbotsford;
const keys = Object.keys(mainData["People"]["Male"]);

// Name of Suburb
const suburbName = keys[0];

// Name of State
const stateName = keys[2];

// Keys of mainData["Dwelling structure"]
const dwellingKeys = Object.keys(mainData["Dwelling structure"]);

const Dwellings = () => {
    return (
        <div>
            {dwellingKeys.map((key, index) => {
                // suburb and state %'s
                const suburbDwellingValue =
                    mainData["Dwelling structure"][key as keyof (typeof mainData)["Dwelling structure"]]["% of suburb"];
                const stateDwellingValue =
                    mainData["Dwelling structure"][key as keyof (typeof mainData)["Dwelling structure"]]["% of state"];

                // suburb and state width values for Tailwind CSS
                const suburbDwellingWidth = Math.round(Math.floor(((parseInt(suburbDwellingValue) / 100) * 208) / 4) / 4) * 4;
                const stateDwellingWidth = Math.round(Math.floor(((parseInt(stateDwellingValue) / 100) * 208) / 4) / 4) * 4;

                return (
                    <DwellingElements
                        key={index}
                        dwellingKey={key}
                        suburbDwellingValue={suburbDwellingValue}
                        suburbDwellingWidth={suburbDwellingWidth}
                        stateDwellingValue={stateDwellingValue}
                        stateDwellingWidth={stateDwellingWidth}
                    />
                );
            })}
        </div>
    );
};

const DwellingElements = ({
    key,
    dwellingKey,
    suburbDwellingValue,
    suburbDwellingWidth,
    stateDwellingValue,
    stateDwellingWidth,
}: {
    key: number;
    dwellingKey: string;
    suburbDwellingValue: string;
    suburbDwellingWidth: number;
    stateDwellingValue: string;
    stateDwellingWidth: number;
}) => {
    return (
        <div>
            <span className="text-xs">{dwellingKey}</span>

            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div className={`bg-customYellow rounded w-${suburbDwellingWidth == 0 ? 1.5 : suburbDwellingWidth} absolute left-0 h-6`}>
                    <span className="">{suburbDwellingValue}%</span>
                </div>
                <div className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateDwellingWidth}`}>
                    {stateDwellingWidth}
                </div>
            </div>
        </div>
    );
};

export default Dwellings;
