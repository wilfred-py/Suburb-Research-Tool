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

// Keys of mainData["Number of bedrooms"]
const bedroomKeys = Object.keys(mainData["Number of bedrooms"]);

const Bedrooms = () => {
    return (
        <div>
            {bedroomKeys.map((key, index) => {
                // suburb and state %'s
                const suburbBedroomsValue =
                    mainData["Number of bedrooms"][key as keyof (typeof mainData)["Number of bedrooms"]]["% of suburb"];
                const stateBedroomsValue =
                    mainData["Number of bedrooms"][key as keyof (typeof mainData)["Number of bedrooms"]]["% of state"];

                // suburb and state width values for Tailwind CSS
                const suburbBedroomsWidth = Math.round(Math.floor(((parseInt(suburbBedroomsValue) / 100) * 208) / 4) / 4) * 4;
                const stateBedroomsWidth = Math.round(Math.floor(((parseInt(stateBedroomsValue) / 100) * 208) / 4) / 4) * 4;

                return (
                    <BedroomsElements
                        key={index}
                        bedroomsKey={key}
                        suburbBedroomsValue={suburbBedroomsValue}
                        suburbBedroomsWidth={suburbBedroomsWidth}
                        stateBedroomsValue={stateBedroomsValue}
                        stateBedroomsWidth={stateBedroomsWidth}
                    />
                );
            })}
        </div>
    );
};

const BedroomsElements = ({
    key,
    bedroomsKey,
    suburbBedroomsValue,
    suburbBedroomsWidth,
    stateBedroomsValue,
    stateBedroomsWidth,
}: {
    key: number;
    bedroomsKey: string;
    suburbBedroomsValue: string;
    suburbBedroomsWidth: number;
    stateBedroomsValue: string;
    stateBedroomsWidth: number;
}) => {
    return (
        <div>
            <span className="text-xs">{bedroomsKey}</span>

            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div className={`bg-customYellow rounded w-${suburbBedroomsWidth == 0 ? 1.5 : suburbBedroomsWidth} absolute left-0 h-6`}>
                    <span className="">{suburbBedroomsValue}%</span>
                </div>
                <div className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateBedroomsWidth}`}>
                    {stateBedroomsWidth}
                </div>
            </div>
        </div>
    );
};

export default Bedrooms;
