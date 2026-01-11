"use client";

import { useState } from "react";

interface Question {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  questions: Question[];
}

export default function FAQAccordion({ questions }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-brown/10 overflow-hidden"
        >
          <button
            onClick={() => toggleQuestion(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-cream/50 transition-colors"
          >
            <span className="text-16 font-medium text-brown pr-4">
              {item.question}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`flex-shrink-0 text-brown/50 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-4 text-16 text-brown/70 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
