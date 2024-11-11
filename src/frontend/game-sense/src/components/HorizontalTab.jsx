import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

export default function HorizontalTab({ categories }) {
  return (
    <TabGroup>
      <TabList className="mx-4 bg-base-300 rounded-lg text-white font-semibold flex flex-row justify-between">
        {categories.map(({ name }) => {
          return (
            <Tab
              key={name}
              className={({ selected }) =>
                selected
                  ? "rounded-lg bg-primary h-full flex-1 p-1"
                  : "rounded-lg h-full flex-1 p-1"
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
