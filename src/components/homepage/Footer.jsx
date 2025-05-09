import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="footer flex flex-col md:flex-row justify-between bg-base-200 text-base-content dark:bg-gray-900 dark:text-gray-200 p-10">
      {/* Services */}
      <nav className="mb-6 md:mb-0">
        <h6 className="footer-title">Services</h6>
        <ul>
        <li className="link link-hover">Branding</li>
        <li className="link link-hover">Design</li>
        <li className="link link-hover">Marketing</li>
        <li className="link link-hover">Advertisement</li>
        </ul>
      </nav>

      {/* Company */}
      <nav className="mb-6 md:mb-0">
        <h6 className="footer-title">Company</h6>
         <ul>
        <li className="link link-hover">About us</li>
        <li className="link link-hover">Contact</li>
        <li className="link link-hover">Jobs</li>
        <li className="link link-hover">Press kit</li>
        </ul>
      </nav>

      {/* Legal */}
      <nav className="mb-6 md:mb-0">
        <h6 className="footer-title">Legal</h6>
        <ul>
        <li className="link link-hover">Terms of use</li>
        <li className="link link-hover">Privacy policy</li>
        <li className="link link-hover">Cookie policy</li>
        </ul>
      </nav>

      {/* Newsletter */}
      <form className="w-full md:w-80">
        <h6 className="footer-title">Newsletter</h6>
        <fieldset>
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join w-full">
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered join-item w-full"
            />
            <button className="btn bg-[#0967C2] text-white join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
}

export default Footer;
