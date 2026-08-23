import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";

import { indicator, list, root, tab } from "./index.css";

export interface TabItem {
  label: string;
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function Tabs({ items, value, onChange, label }: TabsProps) {
  return (
    <BaseTabs.Root
      className={root}
      value={value}
      onValueChange={(next) => onChange(next as string)}
    >
      <BaseTabs.List aria-label={label} className={list}>
        <BaseTabs.Indicator className={indicator} />
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
      {items.map((item) => (
        <BaseTabs.Panel keepMounted key={item.value} value={item.value}>
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
