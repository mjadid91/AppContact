import { Mail, Phone, Building, Edit, Trash2 } from 'lucide-react';
import type { Contact } from '../hooks/useContacts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContactCardProps {
    contact: Contact;
    onEdit: (contact: Contact) => void;
    onDelete: (id: string) => void;
}

const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
    const initials = `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md animate-fade-in">
            <CardContent className="p-6">
                {/* Avatar et nom */}
                <div className="text-center mb-4">
                    <div className="relative inline-block">
                        {contact.avatar ? (
                            <img
                                src={contact.avatar}
                                alt={`${contact.firstName} ${contact.lastName}`}
                                className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-blue-100"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg border-4 border-blue-100">
                                {initials}
                            </div>
                        )}
                    </div>
                    <h3 className="mt-3 font-semibold text-lg text-gray-900">
                        {contact.firstName} {contact.lastName}
                    </h3>
                </div>

                {/* Informations de contact */}
                <div className="space-y-3 mb-6">
                    {contact.email && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" />
                            <span className="truncate">{contact.email}</span>
                        </div>
                    )}
                    {contact.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                            <span>{contact.phone}</span>
                        </div>
                    )}
                    {contact.company && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Building className="w-4 h-4 mr-3 text-purple-500 flex-shrink-0" />
                            <span className="truncate">{contact.company}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(contact)}
                        className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                    >
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(contact.id)}
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContactCard;

