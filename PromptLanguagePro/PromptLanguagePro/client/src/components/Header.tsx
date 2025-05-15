import React from "react";
import { Link } from "wouter";
import { AuthButton } from "@/components/AuthButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              BhashaBoost
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link 
              to="/" 
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Home
            </Link>
            <Link 
              to="/examples" 
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Examples
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}