import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10 mt-5">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href={`/`} className="link link-hover">
            Branding
          </Link>
          <Link href={`/`} className="link link-hover">
            Design
          </Link>
          <Link href={`/`} className="link link-hover">
            Marketing
          </Link>
          <Link href={`/`} className="link link-hover">
            Advertisement
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href={`/`} className="link link-hover">
            About us
          </Link>
          <Link href={`/`} className="link link-hover">
            Contact
          </Link>
          <Link href={`/`} className="link link-hover">
            Jobs
          </Link>
          <Link href={`/`} className="link link-hover">
            Press kit
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href={`/`} className="link link-hover">
            Terms of use
          </Link>
          <Link href={`/`} className="link link-hover">
            Privacy policy
          </Link>
          <Link href={`/`} className="link link-hover">
            Cookie policy
          </Link>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
}

export default Footer;
