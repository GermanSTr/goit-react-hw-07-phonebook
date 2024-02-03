import { useDispatch } from 'react-redux';
import { apiRemoveContact } from '../../redux/contactsSlice';

import css from './ContactListItem.module.css';

const ContactListItem = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const handleDeleteContacts = profileId => {
    dispatch(apiRemoveContact(profileId));
  };

  return (
    <li className={css.itemLi}>
      {name}: {number}
      <button
        onClick={() => handleDeleteContacts(id)}
        type="button"
        className={css.contactsDelete}
      >
        Delete
      </button>
    </li>
  );
};

export { ContactListItem };
