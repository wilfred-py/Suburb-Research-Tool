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

// Keys of mainData["Family composition"]

const familyKeys = Object.keys(mainData["Family composition"]);

const Family = () => {
    return (
        <div>
            {familyKeys.map((key, index) => {
                // suburb and state %'s
                const suburbFamilyValue =
                    mainData["Family composition"][key as keyof (typeof mainData)["Family composition"]]["% of suburb"];
                const stateFamilyValue = mainData["Family composition"][key as keyof (typeof mainData)["Family composition"]]["% of state"];

                // suburb and state width values for Tailwind CSS
                const suburbFamilyWidth = Math.round(Math.floor(((parseInt(suburbFamilyValue) / 100) * 208) / 4) / 4) * 4;
                const stateFamilyWidth = Math.round(Math.floor(((parseInt(stateFamilyValue) / 100) * 208) / 4) / 4) * 4;

                return (
                    <FamilyElement
                        key={index}
                        familyKey={key}
                        suburbFamilyValue={suburbFamilyValue}
                        suburbFamilyWidth={suburbFamilyWidth}
                        stateFamilyValue={stateFamilyValue}
                        stateFamilyWidth={stateFamilyWidth}
                    />
                );
            })}
        </div>
    );
};

const FamilyElement = ({
    key,
    familyKey,
    suburbFamilyValue,
    suburbFamilyWidth,
    stateFamilyValue,
    stateFamilyWidth,
}: {
    key: number;
    familyKey: string;
    suburbFamilyValue: string;
    suburbFamilyWidth: number;
    stateFamilyValue: string;
    stateFamilyWidth: number;
}) => {
    return (
        <div>
            <span className="text-xs">{familyKey}</span>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div className={`bg-customYellow rounded w-${suburbFamilyWidth == 0 ? 1.5 : suburbFamilyWidth} absolute left-0 h-6`}>
                    <span className="">{suburbFamilyValue}%</span>
                </div>
                <div className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateFamilyWidth}`}>
                    {stateFamilyWidth}
                </div>
            </div>
            {familyKey == "Other family" ? (
                <p className="text-xs">
                    Other family is defined as a group of related individuals residing in the same household, who cannot be categorised as
                    belonging to a couple or one parent family.
                </p>
            ) : (
                ""
            )}
        </div>
    );
};

export default Family;
