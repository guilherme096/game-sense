import { TabGroup, TabList, Tab} from "@headlessui/react";
import { useState } from "react";
import PropTypes from "prop-types";

export default function HorizontalTab({ categories, color_back = "bg-gray-700" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <TabGroup onChange={(index) => setSelectedIndex(index)} className="h-fit">
        <TabList
          className={`mx-4 my-4 ${color_back} rounded-lg text-white font-semibold flex flex-row overflow-x-auto no-scrollbar`}
        >
          {categories.map(({ name }) => (
            <Tab
              key={name}
              className={({ selected }) =>
                selected
                  ? "rounded-lg bg-primary h-full flex-1 p-1 px-3 whitespace-nowrap"
                  : "rounded-lg h-full flex-1 p-1 px-3 whitespace-nowrap"
              }
            >
              {name}
            </Tab>
          ))}
        </TabList>
        <div className="">
          {categories.map(({ name, content }, index) => (
            <div
              key={name}
              className={`absolute w-full transition-opacity duration-300 ease-in-out ${selectedIndex === index
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
                }`}

            >
              {content}
            </div>
          ))}
        </div>
      </TabGroup>
    </div>
  );
}

HorizontalTab.propTypes = {
  categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.node.isRequired,
      })
  ).isRequired,
  color_back: PropTypes.string,
};