import summary_data from "../../data/summary_data.json";

export default function suburbNames() {
    const suburbNames = Object.keys(summary_data);

    return (
        <div>
            <h1>Suburbs</h1>
            <ul>
                {suburbNames.map((suburb) => (
                    <li>{suburb}</li>
                ))}
            </ul>
        </div>
    );
}
