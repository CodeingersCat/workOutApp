import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {

    let d = new Date()
    console.log(d)

    const [date, setDate] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
        .then(res => {
            let dates = res.data.map(r => r.date);
            setDate(dates);
        })
    }, []);

    return <h1>{JSON.stringify(date[0])}</h1>
}

export default Test;