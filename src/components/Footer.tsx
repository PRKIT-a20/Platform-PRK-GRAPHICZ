import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fcfcfc] border-t border-black/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="mb-6 block">
            <Logo />
          </Link>
          <p className="text-black/50 text-sm leading-relaxed max-w-xs">
            Helping startups rise in their graphic design journey. Stop designing, start growing.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <a 
              href="https://www.facebook.com/p/Prk-Graphicz-100075493674529/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-brand-primary/5 text-brand-primary rounded-full hover:bg-brand-primary/10 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://sr.linkedin.com/in/prk-graphicz-graphic-designer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-brand-primary/5 text-brand-primary rounded-full hover:bg-brand-primary/10 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-black/40">Company</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/about" className="text-sm font-medium hover:text-black/60 transition-colors">About Us</Link></li>
            <li><Link to="/services" className="text-sm font-medium hover:text-black/60 transition-colors">Services</Link></li>
            <li><Link to="/pricing" className="text-sm font-medium hover:text-black/60 transition-colors">Pricing</Link></li>
            <li><Link to="/contact" className="text-sm font-medium hover:text-black/60 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-black/40">Legal</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-sm font-medium hover:text-black/60 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-black/60 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-black/60 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-black/40">Contact</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 text-sm font-medium">
              <Mail size={16} className="text-black/40" />
              prkgraphicz@gmail.com
            </li>
            <li className="flex items-center gap-3 text-sm font-medium">
              <Phone size={16} className="text-black/40" />
              (597) 7174880
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-black/40 font-medium">
          © {currentYear} PRK GRAPHICZ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
