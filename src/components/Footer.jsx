import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
      title: "Under Reconstruction",
      description: "🚧 This feature is currently under reconstruction.",
    });
  };

  const footerLinks = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'FAQ', 'Account']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer']
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Youtube, label: 'YouTube' }
  ];

  return (
    <footer className="bg-black border-t border-gray-900 mt-16">
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-emerald-500">WATCH</span>
              <span className="text-white">IT</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for streaming entertainment. Watch anywhere, anytime.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.label}
                  whileHover={{ scale: 1.1, color: '#10b981' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFeatureClick}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.button>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <span className="text-white font-semibold">{section.title}</span>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={handleFeatureClick}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 WATCHIT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <button onClick={handleFeatureClick} className="hover:text-emerald-400 transition-colors">
              Language: English
            </button>
            <button onClick={handleFeatureClick} className="hover:text-emerald-400 transition-colors">
              Region: Global
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;