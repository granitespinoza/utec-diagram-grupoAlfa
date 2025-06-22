
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-full mb-8 float-animation">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2m-2 6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-utec-grafito mb-6 leading-tight">
            UTEC
            <span className="block bg-gradient-to-r from-utec-cyan to-utec-deep bg-clip-text text-transparent">
              Diagram
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Crea diagramas profesionales con código. Diseña, genera y descarga 
            diagramas técnicos de forma intuitiva usando nuestro editor especializado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/editor">
              <Button className="utec-button-primary text-white px-8 py-4 text-lg font-semibold">
                Crear Diagrama Ahora
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-utec-cyan text-utec-deep hover:bg-utec-cyan hover:text-white px-8 py-4 text-lg transition-colors"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-500">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="text-utec-cyan hover:text-utec-deep underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-utec-grafito mb-4">
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas profesionales para crear diagramas de alta calidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="utec-card text-white hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Diagram as Code</h3>
              <p className="text-gray-300">
                Escribe código y genera diagramas automáticamente. Sintaxis simple y poderosa.
              </p>
            </CardContent>
          </Card>

          <Card className="utec-card text-white hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Vista Previa en Tiempo Real</h3>
              <p className="text-gray-300">
                Ve tus diagramas generarse mientras escribes código en tiempo real.
              </p>
            </CardContent>
          </Card>

          <Card className="utec-card text-white hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Descarga Profesional</h3>
              <p className="text-gray-300">
                Exporta tus diagramas en formatos PNG y SVG de alta calidad.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center">
        <Card className="utec-card text-white">
          <CardContent className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a UTEC Diagram y crea diagramas profesionales en minutos.
            </p>
            <Link to="/editor">
              <Button className="utec-button-primary text-white px-12 py-4 text-lg font-semibold">
                Comenzar Ahora
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
