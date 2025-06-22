
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DiagramTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const DiagramTypeSelector: React.FC<DiagramTypeSelectorProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => {
  const diagramTypes = [
    { label: "Arquitectura AWS", value: "aws" },
    { label: "Diagrama ER", value: "er" },
    { label: "Estructura JSON", value: "json" }
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-white">Tipo de Diagrama</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="utec-input">
          <SelectValue placeholder="Selecciona el tipo de diagrama" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600">
          {diagramTypes.map((type) => (
            <SelectItem 
              key={type.value} 
              value={type.value}
              className="text-white hover:bg-gray-700 focus:bg-gray-700"
            >
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DiagramTypeSelector;
