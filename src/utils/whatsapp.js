export const openWhatsApp = (gemName = null) => {
  const phone = "919835426322";
  const message = gemName
    ? `Hello Sri Ganesh Gems, I am interested in ${gemName}. Please provide its availability and price.`
    : `Hello Sri Ganesh Gems, I would like to enquire about your collections.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
};

export const sendEnquiryToWhatsApp = (formData) => {
  const phone = "919835426322";
  const { name, phone: userPhone, email, gemInterest, budget, request } = formData;
  
  const message = `*New Enquiry - Sri Ganesh Gems*\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${userPhone}\n` +
    `*Email:* ${email || 'N/A'}\n` +
    `*Gem Interest:* ${gemInterest || 'General Enquiry'}\n` +
    `*Budget:* ${budget || 'N/A'}\n` +
    `*Message:* ${request || 'No specific request'}`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
};

