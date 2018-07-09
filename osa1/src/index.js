import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
  return (
      <h1>{props.kurssi}</h1>
  )
};

const Osa = (props) => {
  return (
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
};

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osa1} />
      <Osa osa={props.osa2} />
      <Osa osa={props.osa3} />
    </div>
  )
};

const Yhteensa = (props) => {
  return (
      <p>yhteensä {props.osa1.tehtavia + props.osa2.tehtavia + props.osa3.tehtavia} tehtävää</p>
  )
};

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys';
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  };
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  };
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  };


  return (
    <div>
      <Otsikko kurssi={kurssi} />

      <Sisalto
          osa1={osa1}
          osa2={osa2}
          osa3={osa3}
      />

      <Yhteensa
          osa1={osa1}
          osa2={osa2}
          osa3={osa3}
      />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
