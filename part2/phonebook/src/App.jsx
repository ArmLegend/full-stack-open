import { useEffect, useState } from "react";
import axios from "axios";
import PersonForm from "../components/PersonForm";
import Filter from "../components/Filter";
import Persons from "../components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const isNameAlreadyTaken =
      persons.filter((person) => person.name === newName).length !== 0;
    if (isNameAlreadyTaken) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, personObj]);
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleQueryChange = (e) => setQuery(e.target.value);

  const personsToShow = query
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onQueryChange={handleQueryChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmitForm={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
