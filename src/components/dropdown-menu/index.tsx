import {
  Menu,
  type MenuTriggerProps,
  type MenuRootProps,
  type MenuItemProps,
} from "@base-ui/react";
import type { ReactNode } from "react";

import * as styles from "./index.css";

export function createMenuHandle() {
  return Menu.createHandle();
}

interface TriggerProps extends MenuTriggerProps {
  children: ReactNode;
  className?: string;
}

export function Trigger({ children, className, handle }: TriggerProps) {
  return (
    <Menu.Trigger className={className} handle={handle}>
      {children}
    </Menu.Trigger>
  );
}

interface ItemProps extends MenuItemProps {
  children: ReactNode;
  size?: "sm" | "md";
  selected?: boolean;
}
export function Item({ children, selected, ...props }: ItemProps) {
  return (
    <Menu.Item {...props} className={styles.item({ selected })}>
      {children}
    </Menu.Item>
  );
}

interface DropdownProps extends MenuRootProps {
  children: ReactNode;
  size?: "sm" | "md";
}
export function Dropdown({ children, size, ...props }: DropdownProps) {
  return (
    <Menu.Root {...props}>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup className={styles.dropdown({ size })}>{children}</Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
