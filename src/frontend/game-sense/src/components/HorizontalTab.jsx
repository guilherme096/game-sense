import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

export default function HorizontalTab({ categories, color_back="bg-gray-700" }) {
  return (
    <TabGroup>
      <TabList
        className={`mx-4 my-4 ${color_back} rounded-lg text-white font-semibold flex flex-row overflow-x-auto no-scrollbar`}>
        {categories.map(({ name }) => {
          return (
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
          );
        })}
      </TabList>
      <TabPanels>
        {categories.map(({ name, content }) => (
          <TabPanel key={name}>{content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
