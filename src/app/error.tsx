"use client"

import React from 'react';
import SomethingWentWrongPage from './../components/pages/SomethingWentWrongPage';

type ErrorPageProps = {
  error: any;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ error }): JSX.Element => {
  return <SomethingWentWrongPage error={error} />;
};

export default ErrorPage;