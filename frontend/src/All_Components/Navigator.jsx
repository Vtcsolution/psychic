"use client";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Users,
  MessageSquare,
  CreditCard,
  Home,
  History,
  Sparkles,
  X,
  Menu,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/All_Components/screen/AuthContext";
import { toast } from "sonner";

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [firstPsychicId, setFirstPsychicId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Color scheme
  const colors = {
    deepPurple: "#2B1B3F",
    antiqueGold: "#C9A24D",
    softIvory: "#F5F3EB",
    lightGold: "#E8D9B0",
    darkPurple: "#1A1129",
  };

  // Set dummy first psychic ID
  useEffect(() => {
    setFirstPsychicId("1");
  }, []);

  const essentialNavItems = [
    {
      name: "Tableau de Bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      matchPrefix: "/dashboard"
    },
    {
      name: "Compte",
      href: "/account",
      icon: <User className="h-5 w-5" />,
      matchPrefix: "/account"
    },
    {
      name: "Modifier le Profil",
      href: "/update-profile",
      icon: <Users className="h-5 w-5" />,
      matchPrefix: "/update-profile"
    },
    {
      name: "Sessions",
      href: "/chat-sessions",
      icon: <MessageSquare className="h-5 w-5" />,
      matchPrefix: "/message"
    },
    {
      name: "Portefeuille",
      href: "/wallet",
      icon: <CreditCard className="h-5 w-5" />,
      matchPrefix: "/wallet"
    },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie");
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Navigation - Desktop keeps original style */}
      <nav className="rounded-xl max-w-7xl mt-4 mx-auto p-4 sm:p-6 shadow-sm relative z-30" 
        style={{ 
          backgroundColor: "white",
          border: `1px solid ${colors.antiqueGold}20`,
        }}>
        
        {/* Mobile/Tablet Header - Shows on lg and below */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: colors.deepPurple }}
            >
              {user?.firstName?.[0] || user?.username?.[0] || user?.email?.[0] || "U"}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: colors.deepPurple }}>
                {user?.firstName || user?.username || "Utilisateur"}
              </p>
              <p className="text-xs" style={{ color: colors.deepPurple + "80" }}>
                {user?.email}
              </p>
            </div>
          </div>
          
          {/* SINGLE Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: colors.deepPurple + "10",
              color: colors.deepPurple
            }}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile, shows on lg and above */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap justify-center gap-3">
            {essentialNavItems.map((item) => {
              const isActive = item.matchPrefix
                ? pathname.startsWith(item.matchPrefix)
                : pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-3 relative min-w-[140px] justify-center",
                    isActive
                      ? "shadow-lg transform scale-105"
                      : "hover:shadow-md hover:scale-105"
                  )}
                  style={{
                    backgroundColor: isActive ? colors.antiqueGold : colors.deepPurple,
                    color: isActive ? colors.deepPurple : colors.softIvory,
                    border: `2px solid ${isActive ? colors.antiqueGold : colors.deepPurple}20`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Sliding Menu - Shows when menu button clicked */}
        <div 
          className={cn(
            "lg:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ backgroundColor: colors.softIvory }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: colors.antiqueGold + "30" }}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" style={{ color: colors.antiqueGold }} />
              <span className="font-bold" style={{ color: colors.deepPurple }}>Menu</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
              style={{ color: colors.deepPurple }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info in Menu */}
          <div className="p-4 border-b" style={{ borderColor: colors.antiqueGold + "30" }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: colors.deepPurple }}
              >
                {user?.firstName?.[0] || user?.username?.[0] || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate" style={{ color: colors.deepPurple }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm truncate" style={{ color: colors.deepPurple + "80" }}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {essentialNavItems.map((item) => {
              const isActive = item.matchPrefix
                ? pathname.startsWith(item.matchPrefix)
                : pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive ? "shadow-sm" : ""
                  )}
                  style={{
                    backgroundColor: isActive ? colors.antiqueGold : 'white',
                    color: isActive ? colors.deepPurple : colors.deepPurple,
                    border: isActive ? 'none' : `1px solid ${colors.deepPurple}15`,
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t" style={{ borderColor: colors.antiqueGold + "30" }}>
            <p className="text-xs font-medium mb-2 px-1" style={{ color: colors.deepPurple + "60" }}>
              ACCÈS RAPIDE
            </p>
            <div className="flex gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: colors.deepPurple + "10",
                  color: colors.deepPurple
                }}
              >
                <Home className="h-4 w-4" />
                Accueil
              </Link>
              <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: colors.deepPurple + "10",
                  color: colors.deepPurple
                }}
              >
                <History className="h-4 w-4" />
                Historique
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-3 border-t" style={{ borderColor: colors.antiqueGold + "30" }}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
              style={{ 
                backgroundColor: '#fef2f2',
                color: '#dc2626',
              }}
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
        
        {/* Bottom Quick Actions Bar - Shows on all devices */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between gap-3 px-2"
          style={{ borderColor: colors.antiqueGold + "20" }}>
          
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="p-2 rounded-lg transition-colors flex items-center gap-2"
              style={{ 
                backgroundColor: colors.deepPurple + "05",
                color: colors.deepPurple
              }}
              title="Accueil"
            >
              <Home className="h-4 w-4" />
              <span className="text-xs font-medium hidden sm:inline">Accueil</span>
            </Link>
            
            <Link
              to="/history"
              className="p-2 rounded-lg transition-colors flex items-center gap-2"
              style={{ 
                backgroundColor: colors.deepPurple + "05",
                color: colors.deepPurple
              }}
              title="Historique"
            >
              <History className="h-4 w-4" />
              <span className="text-xs font-medium hidden sm:inline">Historique</span>
            </Link>
          </div>

          {/* Logout button visible on tablet */}
          <button
            onClick={handleLogout}
            className="hidden sm:flex lg:hidden items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ 
              color: '#dc2626',
              backgroundColor: '#fef2f2',
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>
    </>
  );
}