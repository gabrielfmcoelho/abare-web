import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useCheckboxState } from "@/hooks/useCheckboxState";

export function Calendars({
  calendars,
  onTagsChange,
}: {
  calendars: {
    name: string;
    items: string[];
  }[];
  onTagsChange?: (tags: string[]) => void;
}) {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const toggleTag = (tag: string) => {
    toggleCheckbox(tag);
    console.log("Toggling tag:", tag);
    setSelectedTags((prev) => {
      const isSelected = prev.includes(tag);
      const updatedTags = isSelected
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      if (onTagsChange) {
        onTagsChange(updatedTags); // Notify parent
      }
      return updatedTags;
    });
  };

  // Initialize checkbox states dynamically based on items
  const initialCheckboxState = calendars.reduce((acc, calendar) => {
    calendar.items.forEach((item) => {
      acc[`${calendar.name}/${item}`] = false; // Default to unchecked
    });
    return acc;
  }, {} as Record<string, boolean>);

  const { state: checkboxState, toggleCheckbox } = useCheckboxState(
    initialCheckboxState
  );

  // Example of accessing the selected states
  React.useEffect(() => {
    console.log("Current checkbox state:", checkboxState);
  }, [checkboxState]);

  return (
    <>
      {calendars.map((calendar, index) => (
        <React.Fragment key={calendar.name}>
          <SidebarGroup key={calendar.name} className="py-0">
            <Collapsible className="group/collapsible">
              <SidebarGroupLabel
                asChild
                className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {calendar.name}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {calendar.items.map((item) => (
                      <SidebarMenuItem key={`${calendar.name}/${item}`} onClick={() => toggleTag(`${calendar.name}/${item}`)}>
                        <SidebarMenuButton>
                          <div
                            data-active={checkboxState[`${calendar.name}/${item}`]}
                            className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-abare-primary data-[active=true]:bg-abare-primary cursor-pointer"
                          >
                            {checkboxState[`${calendar.name}/${item}`] && (
                              <Check className="size-3 group-data-[active=true]/calendar-item:block" />
                            )}
                          </div>
                          {item}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator className="mx-0" />
        </React.Fragment>
      ))}
    </>
  );
}
