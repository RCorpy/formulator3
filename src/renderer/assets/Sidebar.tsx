import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

//@ts-ignore

export default function Sidebar({ menuOption, ...props }) {
  const navigate = useNavigate();

  const handleRedirect = (newAddress: string) => {
    console.log('redirecting to:', '/'+ menuOption + '/' + newAddress);
    navigate('/'+ menuOption);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => handleRedirect(menuOption)}
        className="me-2"
      >
        {menuOption}
      </Button>
    </>
  );
}
