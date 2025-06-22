
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-utec-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UD</span>
            </div>
            <span className="font-semibold text-utec-grafito text-lg">
              UTEC Diagram
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-utec-grafito text-sm">
                  Hola, {user?.username || user?.email}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-utec-cyan text-utec-deep hover:bg-utec-cyan hover:text-white transition-colors"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-utec-cyan text-utec-deep hover:bg-utec-cyan hover:text-white transition-colors"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="utec-button-primary text-white hover:shadow-lg">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
