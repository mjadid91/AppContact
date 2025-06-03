import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
                type="text"
                placeholder="Rechercher un contact..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-10 py-3 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm transition-colors"
            />
            {value && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange('')}
                        className="h-5 w-5 p-0 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-4 w-4 text-gray-400" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
