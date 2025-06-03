import React, { useState } from 'react';
import type { Contact } from '../hooks/useContacts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Building, Camera } from 'lucide-react';

interface ContactFormProps {
    onSubmit: (contact: Omit<Contact, 'id'>) => void;
    initialData?: Contact;
}

const ContactForm = ({ onSubmit, initialData }: ContactFormProps) => {
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        company: initialData?.company || '',
        avatar: initialData?.avatar || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        if (!initialData) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                company: '',
                avatar: '',
            });
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isValid =
        formData.firstName.trim() !== '' && formData.lastName.trim() !== '';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar URL */}
            <div className="space-y-2">
                <Label htmlFor="avatar" className="flex items-center text-sm font-medium text-gray-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Photo de profil (URL)
                </Label>
                <Input
                    id="avatar"
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => handleChange('avatar', e.target.value)}
                    placeholder="https://exemple.com/photo.jpg"
                    className="transition-colors focus:border-blue-500"
                />
                {formData.avatar && (
                    <div className="flex justify-center mt-2">
                        <img
                            src={formData.avatar}
                            alt="Aperçu"
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 mr-2" />
                        Prénom *
                    </Label>
                    <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="Jean"
                        required
                        className="transition-colors focus:border-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Nom *
                    </Label>
                    <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        placeholder="Dupont"
                        required
                        className="transition-colors focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="jean.dupont@exemple.com"
                    className="transition-colors focus:border-blue-500"
                />
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Téléphone
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="01 23 45 67 89"
                    className="transition-colors focus:border-blue-500"
                />
            </div>

            {/* Société */}
            <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center text-sm font-medium text-gray-700">
                    <Building className="w-4 h-4 mr-2" />
                    Société
                </Label>
                <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Entreprise ABC"
                    className="transition-colors focus:border-blue-500"
                />
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {initialData ? 'Mettre à jour' : 'Ajouter'}
                </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
                * Champs obligatoires
            </p>
        </form>
    );
};

export default ContactForm;
