import { useState, useEffect } from "react";
import {
    fetchContacts,
    addContactAPI,
    deleteContactAPI,
    updateContactAPI,
} from "@/lib/api";

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    avatar: string;
}

export const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts()
            .then(setContacts)
            .finally(() => setLoading(false));
    }, []);

    const addContact = async (contactData: Omit<Contact, "id">) => {
        await addContactAPI(contactData);
        const updated = await fetchContacts();
        setContacts(updated);
    };

    const deleteContact = async (id: string) => {
        await deleteContactAPI(id);
        const updated = await fetchContacts();
        setContacts(updated);
    };

    const updateContact = async (id: string, contactData: Omit<Contact, "id">) => {
        await updateContactAPI(id, contactData);
        const updated = await fetchContacts();
        setContacts(updated);
    };

    return { contacts, addContact, deleteContact, updateContact, loading };
};
