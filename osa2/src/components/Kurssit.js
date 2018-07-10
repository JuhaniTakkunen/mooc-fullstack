import React from 'react'

const Sisalto = ({kurssi}) => {
    const rivit = () => kurssi.osat.map(
        osa =>
            <li key={osa.id}>
                {osa.nimi}: {osa.tehtavia}
            </li>
    );
    let total = kurssi.osat.reduce((counter, b) => counter + b.tehtavia, 0);

    return (
        <div>
            <ul>
                {rivit()}
            </ul>
            yhteensä: {total} riviä.
        </div>
    )
};

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
            <Sisalto kurssi={kurssi}/>
        </div>
    )
};

const Kurssit = ({kurssit}) => {
    return (
        <div>
            <ul>
                {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi}/>)}
            </ul>
        </div>
    )
};

export default Kurssit
