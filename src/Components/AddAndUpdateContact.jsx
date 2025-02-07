import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is Required."),
    email:Yup.string().email("Invalid Email").required("Email is Required.")
})

const AddAndUpdateContact = ({ isOpen, onClose,isUpdate,contact }) => {

    const addContact = async(contact)=>{
        try {
            const contactRef = collection(db,"contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("Contact Added Successfully");
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const updateContact = async(contact,id)=>{
        try {
            const contactRef = doc(db,"contacts",id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("Contact Updated Successfully");
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
      enableReinitialize={true}
      validationSchema={contactSchemaValidation}
      initialValues={isUpdate ?{
        name:contact?.name || "",
        email:contact?.email || "",
      }:{
        name:"",
        email:"",
      }}
      onSubmit={(values)=>{
        console.log(values);
        isUpdate ?
        updateContact(values,contact.id) :
        addContact(values);
        
      }}
      >
        <Form>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border" />
            <div className="text-red text-xs">
                <ErrorMessage name="name"/>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Field name="email" className="h-10 border" />
            <div className="text-red text-xs">
                <ErrorMessage name="email"/>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-dark-yellow mt-4 cursor-pointer rounded-lg border p-3">
              {isUpdate ? "Update":"Add"} Contact
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
