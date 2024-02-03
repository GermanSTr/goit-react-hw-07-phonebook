import { useEffect } from 'react';

import { ContactListItem } from './ContactListItem';

import { useDispatch, useSelector } from 'react-redux';

import { selectContacts, selectFilter } from '../../redux/selector';
import { apiGetContact } from '../../redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const state = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetContact());
  }, [dispatch]);

  const filterContacts = contacts.filter(profile =>
    profile.name.toLowerCase().includes(state.trim().toLowerCase())
  );

  return (
    <ul>
      {filterContacts.map(contact => (
        <ContactListItem
          name={contact.name}
          phone={contact.phone}
          key={contact.id}
          id={contact.id}
        />
      ))}
    </ul>
  );
};

export { ContactList };
