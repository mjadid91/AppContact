import axios from "axios";
import type { Contact } from "@/hooks/useContacts";

// URL de base du webservice REST Windev
const api = axios.create({
  baseURL: "http://localhost/Contact", // ✅ ça marche chez toi
  headers: {
    "Content-Type": "application/json",
  },
});


export async function fetchContacts(): Promise<Contact[]> {
  const res = await api.get("");
  return res.data.map((item: any) => ({
    id: item.IDContact.toString(),
    firstName: item.prenomContact,
    lastName: item.nomContact,
    email: item.mailContact,
    phone: item.telContact,
    company: item.societeContact,
    avatar: item.photoContact || "",
  }));
}
export async function addContactAPI(contact: Omit<Contact, "id">): Promise<void> {
  const payload = {
    nomContact: contact.lastName,
    prenomContact: contact.firstName,
    mailContact: contact.email,
    telContact: contact.phone,
    societeContact: contact.company,
    photoContact: contact.avatar,
  };
  await api.post("", payload);
}

export async function deleteContactAPI(id: string): Promise<void> {
  await api.delete(`${id}`);
}

export async function updateContactAPI(id: string, contact: Omit<Contact, "id">): Promise<void> {
  const payload = {
    nomContact: contact.lastName,
    prenomContact: contact.firstName,
    mailContact: contact.email,
    telContact: contact.phone,
    societeContact: contact.company,
    photoContact: contact.avatar,
  };
  await api.put(`${id}`, payload);
}
