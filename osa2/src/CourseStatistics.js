import React from 'react'


const Sisalto2 = ({kurssi}) => {
    const rivit = () => kurssi.osat.map(osa => <li key={osa.id}>{osa.nimi}: {osa.tehtavia}</li>);
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
            <Sisalto2 kurssi={kurssi}/>

        </div>
    )
};

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    };

    return (
        <div>
            <Kurssi kurssi={kurssi}/>
        </div>
    )
};

export default App;
