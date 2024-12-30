import {WvWMatch} from "../fetch/model/WvWMatch.ts";
import * as ApiClient from "../fetch/service/Gw2ApiClient.ts";
import {useEffect, useState} from "react";

function Tester() {
    const [data, setData] = useState<WvWMatch | null>(null);  // Initialize with null

    useEffect(() => {
        // fetch data and update the state
        ApiClient.fetchWvWMatchData("2-1")
            .then((response) => setData(response))  // set the fetched data to state
            .catch((error) => console.error("Error fetching data:", error));
    }, []);  // empty dependency array, meaning this runs once when the component mounts

    // display a loading state until data is available
    if (!data) {
        return <div>Loading...</div>;
    }

    // display data when it becomes available
    return (
        <div>
            <h2>Match ID: {data.id}</h2>
            <p><strong>Red World ID:</strong> {data.worlds.red}</p>
            <p><strong>Blue World ID:</strong> {data.worlds.blue}</p>
            <p><strong>Green World ID:</strong> {data.worlds.green}</p>
            <p><strong>Start Time:</strong> {data.start_time}</p>
            <p><strong>End Time:</strong> {data.end_time}</p>
        </div>
    );
}

export default Tester;