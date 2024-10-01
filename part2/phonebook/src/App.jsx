import { useEffect, useState } from "react";
import personService from "../services/persons";
import PersonForm from "../components/PersonForm";
import Filter from "../components/Filter";
import Persons from "../components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const isNameAlreadyTaken =
      persons.filter((p) => p.name === newName).length !== 0;

    const personObj = {
      name: newName,
      number: newNumber,
    };

    if (isNameAlreadyTaken) {
      const isConfirm = confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (isConfirm) {
        const idToUpdate = persons.find((p) => p.name === newName).id;
        return personService
          .update(idToUpdate, personObj)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      } else {
        return;
      }
    }
    personService.create(personObj).then((newPerson) => {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    if (confirm(`Delete ${personToDelete.name} ?`)) {
      personService.remove(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    }
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
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
