import Navbar from "./Components/Navbar";
import { MdOutlineSearch } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { db } from "./Config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import ContactCard from "./Components/ContactCard";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./Components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()),
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0  w-full p-4 bg-gray">
        <div className="mx-auto  max-w-[370px] ">
          <Navbar />
          <div className="flex flex-grow gap-1">
            <div className="relative flex flex-grow items-center text-white">
              <MdOutlineSearch className="absolute ml-1 text-3xl" />
              <input
                onChange={filterContacts}
                type="text"
                placeholder="Search Contact"
                className="h-10 w-full rounded-[10px] border border-white bg-transparent p-2 pl-10"
              />
            </div>
            <div className="mt-0.5">
              <AiFillPlusCircle
                onClick={onOpen}
                className="cursor-pointer text-[44px] text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-40 max-w-[370px] flex flex-col justify-center ">
        {contacts.length <= 0 ? (
          <NotFoundContact />
        ) : (
          <ContactCard contacts={contacts} />
        )}
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
