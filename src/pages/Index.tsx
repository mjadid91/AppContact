import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import SearchBar from '../components/SearchBar';
import { useContacts, type Contact } from '../hooks/useContacts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "@/hooks/use-toast"


const Index = () => {
    const { contacts, addContact, updateContact, deleteContact } = useContacts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const filteredContacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddContact = (contactData: Omit<Contact, 'id'>) => {
        addContact(contactData);
        setIsAddDialogOpen(false);
        toast({
            title: "Contact ajouté !",
            description: `${contactData.firstName} ${contactData.lastName} a bien été ajouté.`,
        });
    };

    const handleUpdateContact = (contactData: Omit<Contact, 'id'>) => {
        if (editingContact) {
            updateContact(editingContact.id, contactData);
            setEditingContact(null);
        }
    };

    const handleEditContact = (contact: Contact) => {
        setEditingContact(contact);
    };

    const handleDeleteContact = (id: string) => {
        deleteContact(id);
        toast({ title: "Contact supprimé", description: `Le contact a été supprimé.` });

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <img src="/logo.svg" alt="Logo" className="w-24 h-24 mx-auto mb-4" />
                    <h1 className="text-center text-5xl font-bold text-gray-900 mb-2">Mes Contacts</h1>
                    <p className="text-center text-gray-600">Gérez facilement vos contacts professionnels et personnels</p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
                                <Plus className="w-5 h-5 mr-2" />
                                Ajouter un contact
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Nouveau Contact</DialogTitle>
                            </DialogHeader>
                            <ContactForm onSubmit={handleAddContact} />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Contacts Grid */}
                {filteredContacts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {searchTerm ? 'Aucun contact trouvé' : 'Aucun contact'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm
                                    ? 'Essayez de modifier votre recherche'
                                    : 'Commencez par ajouter votre premier contact'}
                            </p>
                            {!searchTerm && (
                                <Button
                                    onClick={() => setIsAddDialogOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter un contact
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredContacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onEdit={handleEditContact}
                                onDelete={handleDeleteContact}
                            />
                        ))}
                    </div>
                )}

                {/* Edit Dialog */}
                <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Modifier le Contact</DialogTitle>
                        </DialogHeader>
                        {editingContact && (
                            <ContactForm
                                initialData={editingContact}
                                onSubmit={handleUpdateContact}
                            />
                        )}
                    </DialogContent>
                </Dialog>

                {/* Stats */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500">
                        {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
                        {searchTerm && ` trouvé${filteredContacts.length !== 1 ? 's' : ''} pour "${searchTerm}"`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Index;
