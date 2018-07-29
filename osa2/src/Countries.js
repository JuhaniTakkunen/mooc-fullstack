import React from 'react';
import axios from 'axios'


const Countries = ({data, filter_text, load_completed, event_click}) => {
    function name_filter (name, filter_text='') {
        if (filter_text === '') {
            return true
        } else return name.toLowerCase().indexOf(filter_text.toLowerCase()) > -1;
    }

    const filtered_countries = data.filter(country => name_filter(country.name, filter_text) > 0);
    let countries_found = filtered_countries.length;

    if (11 >= countries_found && countries_found > 1) {
        return (
            <div>
                <table>
                    <tbody>
                        {filtered_countries.map(country => <tr key={country.name}><td onClick={event_click(country.name)}>{country.name} </td></tr>)}
                    </tbody>
                </table>
            </div>
        )
    } else if (countries_found === 0 && !load_completed) {
        return (<div><p>Countries still loading</p></div>)
    } else if (countries_found === 0 && load_completed) {
        return (<div><p>No countries found</p></div>)
    } else if (countries_found === 1) {
        let country = filtered_countries[0];
        return (
            <div>
                <h1>{country["name"]}</h1>
                <div><h2>Basic info</h2>
                    <img src={country["flag"]} width='20%' border="1" alt="Flag of the country" />
                <table>
                    <tbody>
                        {<tr key='capital'><td>capital</td><td>{country["capital"]}</td></tr>}
                        {<tr key='population'><td>population</td><td>{country["population"]}</td></tr>}
                    </tbody>
                </table>
                </div><div>
                <h2>All Data</h2>
                <table>
                    <tbody>
                        {Object.entries(country).map( ([key, defails]) => <tr key={key}><td>{key}</td><td>{JSON.stringify(defails)}</td></tr>)}
                    </tbody>
                </table>
            </div>
            </div>
        )
    } else
        return (<div><p>Too many countries found: n={countries_found}</p></div>)
};

const Filter = (props) => {

    return(
        <div> Rajaa hakua:
            <input
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterNames: '',
            rawData: [],
            downloadCompleted: false
        }
    }

    componentDidMount() {
        console.log('did mount');
        axios
            .get('https://restcountries.eu/rest/v2')
            .then(response => {
                console.log('promise fulfilled');
                this.setState({ rawData: response.data, downloadCompleted: true })
            })
    }

    handleChangeFilter = (event) => {
        this.setState({filterNames: event.target.value})
    };

    handleSelectCountry = (name) => {
        return () => {
            this.setState({filterNames: name})
        }
    };


    render() {
        return (
            <div>
                <h2>Etsi maita</h2>
                <Filter value={this.state.filterNames} onChange={this.handleChangeFilter}/>

                <Countries
                    data={this.state.rawData}
                    filter_text={this.state.filterNames}
                    load_completed={this.state.downloadCompleted}
                    event_click={this.handleSelectCountry}
                />
            </div>
        )
    }
}

export default App
