import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Music, Menu, X, User, LogOut, Calendar, BookOpen, Home, Info, Mail, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

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
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Servicios', path: '/servicios', icon: Music },
    { name: 'Acerca de', path: '/acerca-de', icon: Info },
    { name: 'Reservar', path: '/reservar', icon: Calendar },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Galería', path: '/galeria', icon: ImageIcon },
    { name: 'Contacto', path: '/contacto', icon: Mail },
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%" },
  };

  return (
    <header className="bg-slate-800/90 text-white shadow-lg sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-amber-400" />
            <span className="text-xl font-bold">MaestraLauraKarol</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => cn('px-4 py-2 rounded-md text-sm font-medium transition-colors', isActive ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-700 hover:text-white')}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
             {user ? (
                <div className="relative group">
                    <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white">
                        <User className="w-5 h-5 mr-2" />
                        Admin
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Link to="/admin" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Dashboard</Link>
                        <button onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Cerrar Sesión</button>
                    </div>
                </div>
            ) : (
                <Link to="/login">
                    <Button variant="outline">Iniciar Sesión</Button>
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
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg h-screen w-screen md:hidden p-8 pt-24 flex flex-col"
          >
            <nav className="flex flex-col items-center justify-center flex-1 space-y-6">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-slate-200 hover:text-amber-400 transition-colors flex items-center space-x-3">
                  <link.icon className="w-6 h-6" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="w-full border-t border-slate-700 my-6"></div>
              {user ? (
                <div className="flex flex-col items-center space-y-4">
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-slate-200 hover:text-amber-400 transition-colors flex items-center space-x-3"><User className="w-6 h-6" /><span>Admin</span></Link>
                    <Button onClick={() => { signOut(); setIsOpen(false); }} variant="secondary"><LogOut className="w-5 h-5 mr-2" />Cerrar Sesión</Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}><Button variant="primary" size="lg">Iniciar Sesión</Button></Link>
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
