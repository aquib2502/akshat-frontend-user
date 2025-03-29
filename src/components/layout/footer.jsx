"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight, Home, Briefcase, Phone as PhoneIcon, FileText, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
      <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              About Us
            </h3>
            <p className="mt-4 text-white/70 leading-relaxed">
              We provide expert consultancy services to help businesses grow. 
              Our team of professionals ensures top-quality guidance and solutions.
            </p>
            <motion.a 
              href="/aboutus" 
              className="inline-flex items-center gap-2 mt-4 text-white/90 hover:text-white group transition-all"
              whileHover={{ x: 5 }}
            >
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { icon: Home, text: "Home", href: "/" },
                { icon: Briefcase, text: "Services", href: "/services" },
                { icon: PhoneIcon, text: "Contact Us", href: "/contactus" },
                { icon: FileText, text: "Terms & Conditions", href: "/terms" },
                { icon: FileText, text: "Privacy Policy", href: "/privacy" }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={link.href} 
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Nexcore Alliance, BKC</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5" />
                <span>support@consultancy.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5" />
                <span>+91 9167838311</span>
              </li>
            </ul>
            <motion.a 
              href="/contactus"
              className="inline-flex items-center gap-2 mt-4 text-white/90 hover:text-white group transition-all"
              whileHover={{ x: 5 }}
            >
              Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Reach Out Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Reach Out
            </h3>
            <p className="mt-4 text-white/70">
              Follow us on social media for updates and insights.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { src: "/whatsapp.png", alt: "WhatsApp", href: "https://wa.me/1234567890" },
                { src: "/insta.png", alt: "Instagram", href: "https://instagram.com" },
                { src: "/twitter.png", alt: "Twitter", href: "https://twitter.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={40}
                    height={40}
                    className="relative rounded-full transition-transform"
                  />
                  <ExternalLink className="absolute bottom-0 right-0 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="relative mt-16 pt-8 border-t border-white/10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-white/60"
          >
            &copy; {new Date().getFullYear()} Consultancy Firm. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}