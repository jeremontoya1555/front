// WhatsAppLink.js
import React from 'react';
import './WhatsAppLink.css'; // Ajusta la ruta según tu estructura

const WhatsAppLink = ({ phoneNumber }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Quiero%20hacer%20una%20reserva`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button className="whatsapp-button" onClick={handleClick}>
      Contactar por WhatsApp
    </button>
  );
};

export default WhatsAppLink;
