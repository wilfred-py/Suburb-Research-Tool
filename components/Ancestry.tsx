import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

// Keys of mainData["Ancestry, top responses"]
const summaryData = summary_data_Abbotsford;
const mainData = main_data_Abbotsford;
const keys = Object.keys(mainData["People"]["Male"]);

// Name of Suburb
const suburbName = keys[0];

// Name of State
const stateName = keys[2];

// Ancestry Data
const ancestryKeys = Object.keys(mainData["Ancestry, top responses"]);
const suburbAncestry = [];

// for (let i = 0; i < ancestryKeys.length; i++) {
//     console.log(ancestryKeys[i]);
//     const ancestryKey = ancestryKeys[i] as keyof (typeof mainData)["Ancestry, top responses"];
//     suburbAncestry.push({
//         [ancestryKeys[i]]: mainData["Ancestry, top responses"][ancestryKey]["% of suburb"],
//     });
// }

// ['32.1', '22.7', '15.3', '11.3', '9.2']
// (5) [{…}, {…}, {…}, {…}, {…}]
// [{English: '32.1'}, {Australian: '22.7'}, {Irish: '15.3'}, {Scottish: '11.3'}, {Chinese: '9.2'}]

const Ancestry = () => {
    return (
        <div>
            {ancestryKeys.map((key, index) => {
                // suburb and state %'s
                const suburbAncestryValue =
                    mainData["Ancestry, top responses"][key as keyof (typeof mainData)["Ancestry, top responses"]]["% of suburb"];
                const stateAncestryValue =
                    mainData["Ancestry, top responses"][key as keyof (typeof mainData)["Ancestry, top responses"]]["% of state"];

                // suburb and state width values for Tailwind CSS
                const suburbAncestryWidth = Math.round(Math.floor(((parseInt(suburbAncestryValue) / 100) * 208) / 4) / 4) * 4;
                const stateAncestryWidth = Math.round(Math.floor(((parseInt(stateAncestryValue) / 100) * 208) / 4) / 4) * 4;

                return (
                    <AncestryElement
                        key={index}
                        ancestryKey={key}
                        suburbAncestryValue={suburbAncestryValue}
                        suburbAncestryWidth={suburbAncestryWidth}
                        stateAncestryValue={stateAncestryValue}
                        stateAncestryWidth={stateAncestryWidth}
                    />
                );
            })}
        </div>
    );
};

const AncestryElement = ({
    key,
    ancestryKey,
    suburbAncestryValue,
    suburbAncestryWidth,
    stateAncestryValue,
    stateAncestryWidth,
}: {
    ancestryKey: string;
    key: number;
    suburbAncestryValue: string;
    suburbAncestryWidth: number;
    stateAncestryValue: string;
    stateAncestryWidth: number;
}) => {
    return (
        <div>
            <span className="text-xs">{ancestryKey}</span>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div className={`bg-customYellow rounded w-${suburbAncestryWidth == 0 ? 1.5 : suburbAncestryWidth} absolute left-0 h-6`}>
                    <span className="">{suburbAncestryValue}%</span>
                </div>
                <div className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateAncestryWidth}`}>
                    {stateAncestryWidth}
                </div>
            </div>
        </div>
    );
};

export default Ancestry;
