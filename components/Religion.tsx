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

// Keys of mainData["Religion, top responses"]
const religionKeys = Object.keys(mainData["Religious affiliation, top responses"]);

const Religion = () => {
    return (
        <div>
            {religionKeys.map((key, index) => {
                // suburb and state %'s
                const suburbReligionValue =
                    mainData["Religious affiliation, top responses"][
                        key as keyof (typeof mainData)["Religious affiliation, top responses"]
                    ]["% of suburb"];
                const stateReligionValue =
                    mainData["Religious affiliation, top responses"][
                        key as keyof (typeof mainData)["Religious affiliation, top responses"]
                    ]["% of state"];

                // suburb and state width values for Tailwind CSS
                const suburbReligionWidth = Math.round(Math.floor(((parseInt(suburbReligionValue) / 100) * 208) / 4) / 4) * 4;
                const stateReligionWidth = Math.round(Math.floor(((parseInt(stateReligionValue) / 100) * 208) / 4) / 4) * 4;

                return (
                    <ReligionElements
                        key={index}
                        religionKey={key}
                        suburbReligionValue={suburbReligionValue}
                        suburbReligionWidth={suburbReligionWidth}
                        stateReligionValue={stateReligionValue}
                        stateReligionWidth={stateReligionWidth}
                    />
                );
            })}
        </div>
    );
};

const ReligionElements = ({
    key,
    religionKey,
    suburbReligionValue,
    suburbReligionWidth,
    stateReligionValue,
    stateReligionWidth,
}: {
    key: number;
    religionKey: string;
    suburbReligionValue: string;
    suburbReligionWidth: number;
    stateReligionValue: string;
    stateReligionWidth: number;
}) => {
    return (
        <div>
            {stateReligionWidth}
            <span className="text-xs">{religionKey}</span>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div className={`bg-customYellow rounded w-${suburbReligionWidth == 0 ? 1.5 : suburbReligionWidth} absolute left-0 h-6`}>
                    <span className="">{suburbReligionValue}%</span>
                </div>
                <div className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateReligionWidth}`}></div>
            </div>
        </div>
    );
};

export default Religion;
