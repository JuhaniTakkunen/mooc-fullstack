import React from 'react';


const People = ({persons, filter_text}) => {
    function name_filter (name, filter_text='') {
        if (filter_text === '') {
            return true
        } else return name.toLowerCase().indexOf(filter_text.toLowerCase()) > -1;
    }

    const filtered_persons = persons.filter(person => name_filter(person.name, filter_text) > 0);
    return (
        <div>
            <table>
                <tbody>
                {filtered_persons.map(person => <tr key={person.name}><td>{person.name}: </td><td>{person.number}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
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
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }],
            newName: '',
            newNumber: '',
            filterNames: '',
        }
    }

    addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber,
        };
        if (this.state.persons.filter(person => person.name === newPerson.name).length > 0) {  // NOTE: only compares EXACTLY same
            alert("Person already in phonebook, name: ", newPerson.name)
        } else {
            const persons = this.state.persons.concat(newPerson);
            this.setState({
                persons: persons,
                newName: '',
                newNumber: '',
            })
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


    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter value={this.state.filterNames} onChange={this.handleChangeFilter}/>
                <PersonForm
                    onSubmit={this.addPerson}
                    state={this.state}
                    handleChangeName={this.handleChangeName}
                    handleChangeNumber={this.handleChangeNumber}
                />
                <People persons={this.state.persons} filter_text={this.state.filterNames}/>
            </div>
        )
    }
}

export default App
