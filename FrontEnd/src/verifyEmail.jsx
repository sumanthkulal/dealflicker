import React from 'react';

// --- Simple Inline Styles ---
const styles = {
  container: {
    maxWidth: '450px',
    margin: '60px auto',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  icon: {
    fontSize: '48px',
    color: '#007bff', // Primary blue color
    marginBottom: '20px',
  },
  title: {
    color: '#333',
    marginBottom: '10px',
    fontWeight: '500',
  },
  message: {
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '25px',
    fontSize: '16px',
  },
  emailHighlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  note: {
    color: '#888',
    fontSize: '14px',
    marginTop: '20px',
  }
};
// ----------------------------

function EmailConfirmationDisplay({ userEmail }) {
  return (
    <div style={styles.container}>
      
      {/* 📧 Icon */}
      <div style={styles.icon}>
        📧
      </div>
      
      {/* 🚀 Title */}
      <h2 style={styles.title}>
        Please Check Your Inbox
      </h2>
      
      {/* 📝 Core Message */}
      <p style={styles.message}>
        A verification link has been successfully sent to:
        <br />
        <span style={styles.emailHighlight}>{userEmail}</span>
      </p>

      <p style={styles.message}>
        Click the link in the email to activate your account and complete your registration.
      </p>

      {/* ℹ️ Note */}
      <p style={styles.note}>
        If you don't receive the email within a few minutes, please check your spam or junk folder.
      </p>
    </div>
  );
}

// Example Usage:
// <EmailConfirmationDisplay userEmail="jane.doe@example.com" />

export default EmailConfirmationDisplay;