// components/date-picker.tsx
import { Calendar } from "@/components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

interface DatePickerProps {
  selectedDate?: Date;
  onSelectDate: (date: Date | undefined) => void;
}

export function DatePicker({
  selectedDate,
  onSelectDate,
}: DatePickerProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <Calendar
          mode='single'
          selected={selectedDate}
          onDayClick={onSelectDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          className="[&_[role=gridcell].bg-accent]:bg-abare-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
