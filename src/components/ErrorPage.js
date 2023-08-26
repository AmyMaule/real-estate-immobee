import React from 'react';

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="error-bee-route-container">
      <div className="error-bee-border" />
      <div className="error-bee" />
        <h1 className="error-page-title">Oops!</h1>
        <h1 className="error-page-subtitle">
          Sorry, this page{"\n"}does not exist.
        </h1>
      </div>
    </div>
  )
}

export default ErrorPage;
