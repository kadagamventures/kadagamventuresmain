import React from "react";
import { helpCenterData } from "../data/helpCenterData";
import SocialLinks from "../components/SocialLinks";

const HelpCenter = () => {
  const data = helpCenterData["help-center"];

  return (
    <div className="min-h-screen lg:mt-16 bg-white px-6 py-10 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>

        <p className="text-gray-600 mb-8">{data.description}</p>
        <SocialLinks />

        {data.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>

            {/* <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {section.items.map((item, i) => (
                <li key={i}>
                  {typeof item === "string" ? (
                    item
                  ) : (
                    <>
                      {item.label} <strong>{item.value}</strong>
                    </>
                  )}
                </li>
              ))}
            </ul> */}
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {section.items.map((item, i) => (
                <li key={i}>
                  {typeof item === "string" ? (
                    item
                  ) : item.type === "email" ? (
                    <>
                      {item.label}{" "}
                      <a
                        href={`mailto:${item.value}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {item.value}
                      </a>
                    </>
                  ) : (
                    <>
                      {item.label} <strong>{item.value}</strong>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
