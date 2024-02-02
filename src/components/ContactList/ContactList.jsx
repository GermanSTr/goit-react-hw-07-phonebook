import { ContactListItem } from './ContactListItem';
import { selectContacts, selectFilter } from '../../redux/selector';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const state = useSelector(selectFilter);

  const filterContacts = contacts.filter(profile =>
    profile.name.toLowerCase().includes(state.trim().toLowerCase())
  );

  return (
    <ul>
      {filterContacts.map(contact => (
        <ContactListItem
          name={contact.name}
          number={contact.number}
          key={contact.id}
          id={contact.id}
        />
      ))}
    </ul>
  );
};

export { ContactList };
