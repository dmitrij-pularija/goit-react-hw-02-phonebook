import { Component } from 'react';
import book from '../img/book.svg';
import Filter from './Filter/Filter';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';
import { Box, List, Icon, Title, Blue } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    contactRow: {},
  };

  setFilter = newFilter => {
    this.setState({ filter: newFilter });
  };

  addContact = ({ id, name, number }) => {
    const newContact = { id, name, number };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  delContact = id => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState(prevState => {
      return { ...prevState, contacts: [...newContacts] };
    });
  };

  editContact = ({ id, name, number }) => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    const newContact = { id, name, number };
    this.setState(() => ({
      contacts: [newContact, ...newContacts],
    }));
    this.setState({ contactRow: { id: '', name: '', number: '' } });
  };

  selectContact = id => {
    const editDetals = this.state.contacts.find(contact => contact.id === id);
    this.setState({ contactRow: editDetals });
  };

  filterContacts = () => {
    let contactFiltred = [];
    if (this.state.filter) {
      contactFiltred = this.state.contacts.filter(
        contact =>
          contact.name
            .toUpperCase()
            .includes(this.state.filter.toUpperCase()) ||
          contact.number.includes(this.state.filter)
      );
      return contactFiltred;
    } else {
      return this.state.contacts.sort((firstСontacts, secondСontacts) =>
        firstСontacts.name.localeCompare(secondСontacts.name)
      );
    }
  };

  render() {
    const contactFiltred = this.filterContacts();

    return (
      <Container>
        <Title>
          <Icon src={book} width="20px" />
          Phone<Blue>book</Blue>
        </Title>
        <Box>
          <List>
            <Filter onFilterChange={this.setFilter} />
            {contactFiltred.length > 0 ? (
              <ContactList
                contacts={contactFiltred}
                onDelete={this.delContact}
                onEdit={this.selectContact}
              />
            ) : (
              <Notification message="contacts not found" />
            )}
          </List>

          {!this.state.contactRow.id ? (
            <ContactForm
              formSubmit={this.addContact}
              contacts={this.state.contacts}
              buttonText={'Add contact'}
              setEdit={this.state.contactRow}
            />
          ) : (
            <ContactForm
              formSubmit={this.editContact}
              contacts={this.state.contacts}
              buttonText={'Edit contact'}
              setEdit={this.state.contactRow}
            />
          )}
        </Box>
      </Container>
    );
  }
}

export default App;