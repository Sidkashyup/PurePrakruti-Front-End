import React, { useState } from 'react';

const faqs = [
  {
    question: 'Is this tool free to use?',
    answer: 'Yes! Our platform is free for everyone.',
  },
  {
    question: 'How accurate is the carbon toe footprint estimate?',
    answer:
      'Our estimations are based on publicly available data and standard emission factors. While they give a good approximation, they are not substitutes for professional audits.',
  },
  {
    question: 'Can I not download my report?',
    answer:
      'Absolutely. After submitting your data, you’ll get the option to download a detailed PDF report.',
  },
  {
    question: 'Is my data secure on this platform?',
    answer:
      'Your data is encrypted and stored securely. We prioritize user privacy and never share information without consent.',
  },
  {
    question: 'Can businesses use this tool for compliance reporting?',
    answer:
      'Definitely . Our reports are structured to align with common sustainability and regulatory frameworks.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-green-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-2xl p-5 bg-green-700 cursor-pointer hover:shadow-md transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  {faq.question}
                </h3>
                <span className="text-2xl font-bold text-white">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-3 text-white">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
