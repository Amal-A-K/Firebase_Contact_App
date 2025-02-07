import { deleteDoc, doc } from "firebase/firestore";
import { MdDelete, MdEdit } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { db } from "../Config/firebaseConfig";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { toast } from "react-toastify";
import { useState } from "react";

const ContactCard = ({ contacts }) => {
  const { onOpen, isOpen, onClose } = useDisclouse();
  const [ selectedContact,setSelectedContact ] = useState(null)

  const editContact = (contact)=>{
    setSelectedContact(contact);
    onOpen();

  }
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  
  };
  const sortedContacts = contacts.slice().sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  return (
    <>
      <div className="mt-4 flex flex-col gap-3">
        {sortedContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-yellow flex items-center justify-between gap-4 rounded-lg p-4"
          >
            <PiUserCircle className="text-orange text-5xl" />
            <div className="text-black">
              <h2 className="font-medium">{contact.name}</h2>
              <p className="text-sm">{contact.email}</p>
            </div>
            <div className="flex text-3xl">
              <MdEdit onClick={() => editContact(contact)} className="cursor-pointer" />
              <MdDelete
                onClick={() => deleteContact(contact.id)}
                className="text-purple cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      <AddAndUpdateContact
        isOpen={isOpen}
        onClose={onClose}
        isUpdate
        contact={selectedContact}
      />
    </>
  );
};

export default ContactCard;
