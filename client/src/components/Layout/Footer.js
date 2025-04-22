import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark text-light p-4 mt-auto">
      <h6 className="text-center text-white mb-0">
        All rights reserved &copy; {new Date().getFullYear()} Expense Management
      </h6>
    </div>
  );
};

export default Footer;
