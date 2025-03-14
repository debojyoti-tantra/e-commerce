'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';
import ThemeToggle from '@/components/ThemeToggle';
import { useUser } from '@clerk/nextjs';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const {openSignIn} = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      {/* Logo */}
      <div className="text-2xl font-bold">
        Debo<span className="text-blue-500">Shope</span>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-lg">
        <Link href='/' className="hover:text-blue-500 cursor-pointer transition">Home</Link>
        <Link href='/shop' className="hover:text-blue-500 cursor-pointer transition">Shop</Link>
        <Link href='/about' className="hover:text-blue-500 cursor-pointer transition">About</Link>
        <Link href='/contact' className="hover:text-blue-500 cursor-pointer transition">Contact</Link>
      </div>
      
      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button className="text-white text-2xl">&#9776;</button>
      </div>
      
      {/* Sign In Button */}
      <div className="flex justify-center items-center gap-2">
        <ThemeToggle />
        <SignedOut>
          <Button onClick={openSignIn} className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-md">
            Sign In
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<ShoppingCart />} onClick={() => router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<ShoppingBag />} onClick={() => router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
}
