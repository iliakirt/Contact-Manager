import React, { useRef } from 'react';
import ContactCard from './ContactCard';
import { useNavigate } from "react-router-dom";

const ContactList = (props) => {

    const navigate = useNavigate();
    const inputEl = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                clickHander={deleteContactHandler}
                key={contact.id} />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };

    return (
        <div className="main">
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                marginBottom: "20px"
            }}>
                <h2>Contact List</h2>
                <button className="ui button blue" onClick={() => navigate("/add")}>
                    Add Contact
                </button>
            </div>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input
                        ref={inputEl}
                        type='text'
                        placeholder='Search Contacts'
                        className='prompt'
                        value={props.term}
                        onChange={getSearchTerm} />
                    <i className='search icon'></i>
                </div>
            </div>

            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No Contacts available"}
            </div>
        </div>
    );
}

export default ContactList;;