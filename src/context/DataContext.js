import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export function DataProvider(props) {
    const initialOffset = JSON.parse(window.localStorage.getItem('offset') || '0');

    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offsetNum, setOffsetNum] = useState(initialOffset);
    const [filter, setFilter] = useState('');
    const [pagination, showPagination] = useState(true);

    const pullData = (data) => {
        const goodData = data.map(function (launch) {
            return {
                missionName: launch.mission_name,
                smallPatch: launch.links.mission_patch_small,
                flightNum: launch.flight_number,
                year: launch.launch_year
            }
        });
        return goodData;
    }

    useEffect(() => {
        async function fetchLaunches() {
            try {
                setLoading(true);
                let api = '';
                if (filter === '') {
                    api = `https://api.spacexdata.com/v3/launches/?limit=24${offsetNum > 0 ? `&offset=${offsetNum}` : ''}`
                    window.localStorage.setItem('offset', JSON.stringify(offsetNum));
                    showPagination(true);
                } else {
                    showPagination(false);
                    api = `https://api.spacexdata.com/v3/launches/`
                }
                const res = await fetch(api);
                const data = await res.json();
                const newData = pullData(data);
                setLaunches(newData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchLaunches();
    }, [offsetNum, filter])


    return (
        <DataContext.Provider value={[launches, loading, offsetNum, setOffsetNum, pagination, filter, setFilter]}>
            {props.children}
        </DataContext.Provider>
    )
}
