import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Search } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationIcons } from './IconMapping';
import { WrenchIcon } from './AutomotiveIcons';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Inicio', path: '/', icon: NavigationIcons.home },
    { name: 'Servicios', path: '/servicios', icon: NavigationIcons.services },
    { name: 'Acerca de', path: '/acerca-de', icon: NavigationIcons.about },
    { name: 'Reservar', path: '/reservar', icon: NavigationIcons.appointments },
    { name: 'Blog', path: '/blog', icon: NavigationIcons.blog },
    { name: 'Galería', path: '/galeria', icon: NavigationIcons.gallery },
    { name: 'Contacto', path: '/contacto', icon: NavigationIcons.contact },
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%" },
  };

  return (
    <header className="bg-dark-primary text-white shadow-lg sticky top-0 z-40 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="p-2 bg-accent-red rounded-lg shadow-md"
            >
              <WrenchIcon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-accent-red transition-colors">
                AutoTaller Pro
              </span>
              <span className="text-xs text-light-gray font-franklin">
                Servicio Automotriz Profesional
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-md text-sm font-franklin transition-all duration-200 flex items-center gap-2',
                  isActive 
                    ? 'bg-accent-red text-white shadow-md' 
                    : 'text-light-gray hover:bg-dark-secondary hover:text-white'
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
             {user ? (
                <div className="relative group">
                    <button className="flex items-center px-4 py-2 rounded-md text-sm font-franklin text-light-gray hover:bg-dark-secondary hover:text-white">
                        <User className="w-5 h-5 mr-2" />
                        Admin
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-dark-secondary rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10">
                        <Link to="/admin" className="block px-4 py-2 text-sm text-white hover:bg-white/10">Dashboard</Link>
                        <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10">Cerrar Sesión</button>
                    </div>
                </div>
            ) : (
                <Link to="/login">
                    <button className="px-4 py-2 rounded-md text-sm font-franklin text-white bg-accent-red hover:bg-red-700 transition-colors shadow-md">
                      Iniciar Sesión
                    </button>
                </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none z-50">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-dark-primary backdrop-blur-lg h-screen w-screen md:hidden p-8 pt-24 flex flex-col"
          >
            <nav className="flex flex-col items-center justify-center flex-1 space-y-6">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-2xl font-fugaz text-white hover:text-accent-red transition-colors flex items-center space-x-3">
                  <link.icon className="w-6 h-6" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="w-full border-t border-white/10 my-6"></div>
              {user ? (
                <div className="flex flex-col items-center space-y-4">
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-2xl font-fugaz text-white hover:text-accent-red transition-colors flex items-center space-x-3"><User className="w-6 h-6" /><span>Administrador</span></Link>
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="px-6 py-3 rounded-md text-lg font-bold text-white bg-accent-red hover:bg-red-700 transition-colors shadow-md">
                      <LogOut className="w-5 h-5 mr-2" />Cerrar Sesión
                    </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="px-6 py-3 rounded-md text-lg font-bold text-white bg-accent-red hover:bg-red-700 transition-colors shadow-md">
                    Iniciar Sesión
                  </button>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Helper function to combine class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
