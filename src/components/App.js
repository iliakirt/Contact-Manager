import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import api from '../api/contacts';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';

function App() {

  //const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }


    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (updatedContact) => {
    const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact);
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? response.data : contact
      )
    );
  };


  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
      return Object.values(contact)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if (retriveContacts) setContacts(retriveContacts);


  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <ContactList
                contacts={searchTerm.length <1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />

          <Route
            path='/add'
            element={<AddContact
              addContactHandler={addContactHandler} />
            } />

          <Route
            path='/edit/:id'
            element={<EditContact
              updateContactHandler={updateContactHandler} />
            } />

          <Route
            path='/contact/:id'
            element={<ContactDetails />}
          />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
