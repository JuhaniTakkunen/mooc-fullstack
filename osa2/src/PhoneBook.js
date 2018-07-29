import React from 'react';
import numberService from './services/phoneNumbers'


const People = ({persons, filter_text, onDelete}) => {
    function name_filter(name, filter_text = '') {
        if (filter_text === '') {
            return true
        } else return name.toLowerCase().indexOf(filter_text.toLowerCase()) > -1;
    }

    const filtered_persons = persons.filter(person => name_filter(person.name, filter_text) > 0);
    return (
        <div>
            <table>
                <tbody>
                {filtered_persons.map(person => <tr key={person.name}>
                    <td>{person.name}:</td>
                    <td>{person.number}</td>
                    <td><button onClick={onDelete(person.id)}>poista</button></td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
};

const Filter = (props) => {

    return (
        <div> Rajaa hakua:
            <input
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
};

const PersonForm = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <div> nimi:
                <input
                    value={props.state.newName}
                    onChange={props.handleChangeName}
                />
            </div>
            <div> numero:
                <input
                    value={props.state.newNumber}
                    onChange={props.handleChangeNumber}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filterNames: '',
        }
    }

    componentDidMount() {
        numberService
            .getAll()
            .then(response => {
                this.setState({persons: response})
            })
    }


    addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber,
        };
        if (this.state.persons.filter(person => person.name === newPerson.name).length > 0) {  // NOTE: only compares EXACTLY same
            alert("Person already in phonebook, name: " + newPerson.name)
        } else {
            numberService
                .create(newPerson)
                .then(() => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: '',
                    })
                });
        }
    };

    handleChangeName = (event) => {
        this.setState({newName: event.target.value})
    };
    handleChangeNumber = (event) => {
        this.setState({newNumber: event.target.value})
    };
    handleChangeFilter = (event) => {
        this.setState({filterNames: event.target.value})
    };
    handleDeletePerson = (id_number) => {
        return () => {
            const person = this.state.persons.filter(person => person.id === id_number)[0];
            const res = window.confirm(`Poistetaanko käyttäjä: ${person.name}`);
            if (res) {
                alert("do removing")
            } else {
                alert("do nothing")
            }
        }
    };


    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter value={this.state.filterNames}
                        onChange={this.handleChangeFilter}/>
                <PersonForm
                    onSubmit={this.addPerson}
                    state={this.state}
                    handleChangeName={this.handleChangeName}
                    handleChangeNumber={this.handleChangeNumber}
                />
                <People persons={this.state.persons}
                        filter_text={this.state.filterNames}
                        onDelete={this.handleDeletePerson}/>
            </div>
        )
    }
}

export default App
