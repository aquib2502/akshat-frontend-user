import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold">About Us</h3>
            <p className="mt-3 text-gray-300">
              We provide expert consultancy services to help businesses grow. 
              Our team of professionals ensures top-quality guidance and solutions.
            </p>
            <a 
              href="/aboutus" 
              className="inline-block mt-3 text-blue-300 hover:text-white transition"
            >
              Learn More &rarr;
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/contactus" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <p className="mt-3 text-gray-300">
              📍 Nexcore Alliance, BKC <br />
              📧 support@consultancy.com <br />
              📞 +91 9167838311
            </p>
            <a 
              href="/contactus"
              className="inline-block mt-3 text-blue-300 hover:text-white transition"
            >
              Contact Us &rarr;
            </a>
          </div>

          {/* Reach Out Section with Social Media */}
          <div>
            <h3 className="text-2xl font-bold">Reach Out</h3>
            <p className="mt-3 text-gray-300">Follow us on social media for updates and insights.</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <Image src="/whatsapp.png" alt="WhatsApp" width={40} height={40} className="rounded-full hover:opacity-80 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Image src="/insta.png" alt="Instagram" width={40} height={40} className="rounded-full hover:opacity-80 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Image src="/twitter.png" alt="Twitter" width={40} height={40} className="rounded-full hover:opacity-80 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-500 mt-10 pt-6 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Consultancy Firm. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
