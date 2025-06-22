
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link, useNavigate } from 'react-router-dom';
import CodeEditor from '@/components/CodeEditor';
import DiagramTypeSelector from '@/components/DiagramTypeSelector';

const API_BASE_URL = 'https://27v1rkjcc6.execute-api.us-east-1.amazonaws.com/dev';

const Editor = () => {
  const [code, setCode] = useState(`# Mi Primer Diagrama
graph TD
    A[Usuario] --> B{Autenticado?}
    B -->|Sí| C[Dashboard]
    B -->|No| D[Login]
    D --> E[Verificar Credenciales]
    E -->|Válidas| C
    E -->|Inválidas| F[Error]
    C --> G[Crear Diagrama]
    G --> H[Generar Imagen]
    H --> I[Descargar]`);
  
  const [diagramType, setDiagramType] = useState('aws');
  const [diagramImage, setDiagramImage] = useState<string | null>(null);
  const [archivoId, setArchivoId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateDiagram = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!code.trim()) {
      toast({
        title: "Código vacío",
        description: "Por favor escribe código para generar el diagrama.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    console.log('Generando diagrama con código:', code, 'tipo:', diagramType);

    try {
      const response = await fetch(`${API_BASE_URL}/diagrams/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          source: code,
          diagram_type: diagramType
        }),
      });

      const data = await response.json();
      console.log('Respuesta de generación:', data);

      if (response.status === 401) {
        toast({
          title: "Sesión expirada",
          description: "Tu sesión ha expirado. Por favor inicia sesión nuevamente.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error al generar el diagrama');
      }

      setDiagramImage(data.imageUrl);
      setArchivoId(data.archivo_id);
      toast({
        title: "¡Diagrama generado!",
        description: "Tu diagrama se ha creado exitosamente.",
      });
    } catch (error: any) {
      console.error('Error generando diagrama:', error);
      toast({
        title: "Error al generar diagrama",
        description: error.message || "Hubo un problema al generar el diagrama.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadDiagram = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!archivoId) {
      toast({
        title: "Sin diagrama",
        description: "Primero genera un diagrama para poder descargarlo.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    console.log('Descargando diagrama con archivo_id:', archivoId);

    try {
      const response = await fetch(`${API_BASE_URL}/diagrams/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          archivo_id: archivoId,
          tipo: diagramType
        }),
      });

      if (response.status === 401) {
        toast({
          title: "Sesión expirada",
          description: "Tu sesión ha expirado. Por favor inicia sesión nuevamente.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al descargar el diagrama');
      }

      const data = await response.json();
      
      // Convertir base64 a blob y forzar descarga
      const base64Data = data.imagen_base64;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagrama-${diagramType}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "¡Descarga exitosa!",
        description: "Tu diagrama se ha descargado correctamente.",
      });
    } catch (error: any) {
      console.error('Error descargando diagrama:', error);
      toast({
        title: "Error al descargar",
        description: error.message || "Hubo un problema al descargar el diagrama.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-utec-grafito mb-2">
            Editor de Diagramas
          </h1>
          <p className="text-gray-600">
            Escribe código y genera diagramas profesionales en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Panel Izquierdo - Editor de Código */}
          <Card className="utec-card text-white flex flex-col">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Editor de Código</span>
                <Button
                  onClick={generateDiagram}
                  disabled={isGenerating}
                  className="utec-button-primary text-white"
                >
                  {isGenerating ? 'Generando...' : 'Generar Diagrama'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <DiagramTypeSelector
                value={diagramType}
                onChange={setDiagramType}
              />
              <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="# Escribe tu código de diagrama aquí
graph TD
    A[Inicio] --> B[Proceso]
    B --> C[Fin]"
                className="min-h-[300px] flex-1"
              />
              <div className="text-sm text-gray-300">
                <p>💡 <strong>Tip:</strong> Selecciona el tipo de diagrama y escribe tu código</p>
                {diagramType !== 'aws' && (
                  <p className="text-yellow-400">⚠️ Solo el tipo "AWS" está completamente implementado</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Panel Derecho - Visor de Diagrama */}
          <Card className="utec-card text-white flex flex-col">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Vista Previa del Diagrama</span>
                {diagramImage && archivoId && (
                  <Button
                    onClick={downloadDiagram}
                    disabled={isDownloading}
                    className="utec-button-primary text-white"
                  >
                    {isDownloading ? 'Descargando...' : 'Descargar PNG'}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              {diagramImage ? (
                <div className="w-full h-full flex items-center justify-center bg-white rounded-lg">
                  <img
                    src={diagramImage}
                    alt="Diagrama generado"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2m-2 6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">Sin diagrama</p>
                  <p>Haz clic en "Generar Diagrama" para crear tu visualización</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ejemplos de código */}
        <Card className="mt-6 utec-card text-white">
          <CardHeader>
            <CardTitle className="text-white">Ejemplos de Código por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-utec-light mb-2">Arquitectura AWS:</h4>
                <pre className="bg-gray-800 p-3 rounded text-xs">
{`aws-vpc: VPC Principal
  subnet-pub: Subnet Pública
    ec2-web: EC2 Web Server
  subnet-priv: Subnet Privada
    rds: Base de Datos RDS`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-utec-light mb-2">Diagrama ER:</h4>
                <pre className="bg-gray-800 p-3 rounded text-xs">
{`Usuario [id, nombre, email]
Pedido [id, fecha, total]
Usuario ||--o{ Pedido`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-utec-light mb-2">Estructura JSON:</h4>
                <pre className="bg-gray-800 p-3 rounded text-xs">
{`{
  "usuario": {
    "id": "number",
    "perfil": {
      "nombre": "string",
      "edad": "number"
    }
  }
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Login Requerido */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="utec-card text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Iniciar Sesión Requerido</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300 mb-4">
              Para descargar diagramas necesitas iniciar sesión o crear una cuenta.
            </p>
            <div className="flex gap-4">
              <Link to="/login" className="flex-1">
                <Button className="w-full utec-button-primary text-white">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button variant="outline" className="w-full border-utec-cyan text-utec-cyan hover:bg-utec-cyan hover:text-white">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;
