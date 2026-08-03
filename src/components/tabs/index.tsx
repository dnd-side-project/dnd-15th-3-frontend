import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { list, tab } from "./index.css";

export interface TabItem {
  label: string;
  value: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
}

export function Tabs({ items, value, onChange }: TabsProps) {
  return (
    <BaseTabs.Root value={value} onValueChange={(next) => onChange(next as string)}>
      <BaseTabs.List className={list}>
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            className={(state) => tab({ active: state.active })}
          >
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}
