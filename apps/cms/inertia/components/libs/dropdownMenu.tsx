import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import "./dropdownMenu.css";

interface CommandItem {
  title: string;
  command: (props: any) => void;
}

interface DropdownMenuProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

type DropdownMenuRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    const selectItem = (index: number) => {
      const item = items[index];

      if (item) {
        command(item);
      }
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="dropdown-menu">
        {items.length > 0 ? (
          items.map((item, index) => (
            <button
              className={index === selectedIndex ? "is-selected" : ""}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item.title}
            </button>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    );
  }
);

export default DropdownMenu;
