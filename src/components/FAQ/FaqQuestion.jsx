import { memo } from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

// FAQ Data
const FAQS = [
  {
    question: "Do I need a credit card for the free trial?",
    answer: "No, you can sign up and start using our free plan without a credit card.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription anytime. There are no long-term contracts.",
  },
  {
    question: "Does it work with my existing tools?",
    answer: "Yes, it integrates with over 100+ popular apps like Slack, Notion, and Zapier.",
  },
  {
    question: "Is customer support available?",
    answer: "Yes, we offer 24/7 customer support via chat and email.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied.",
  },
];

const FaqQuestion = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 w-full max-w-2xl mx-auto space-y-4"
    >
      {FAQS.map((faq, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-5 rounded-lg shadow-md"
            >
              <Disclosure.Button
                className="flex justify-between w-full text-left text-lg font-medium text-gray-900 focus:outline-none focus-visible:outline-none"
                aria-expanded={open}
              >
                {faq.question}
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                as={motion.div}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-700"
              >
                {faq.answer}
              </Disclosure.Panel>
            </motion.div>
          )}
        </Disclosure>
      ))}
    </motion.div>
  );
};

export default memo(FaqQuestion);
