import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

interface Event {
  id?: number;
  title: string;
  date: Date;
  type: "meeting" | "task" | "reminder";
}

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(),
      type: "meeting",
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(),
      type: "task",
    },
    {
      id: 3,
      title: "Client Call",
      date: new Date(),
      type: "meeting",
    },
    {
      id: 4,
      title: "Code Review",
      date: new Date(),
      type: "task",
    },
    {
      id: 5,
      title: "Daily Standup",
      date: new Date(),
      type: "meeting",
    },
    {
      id: 6,
      title: "Submit Reports",
      date: new Date(),
      type: "reminder",
    },
    {
      id: 7,
      title: "Team Lunch",
      date: new Date(),
      type: "reminder",
    },
    {
      id: 8,
      title: "Sprint Planning",
      date: new Date(),
      type: "meeting",
    },
    {
      id: 9,
      title: "Review Designs",
      date: new Date(),
      type: "task",
    },
    {
      id: 10,
      title: "Client Presentation",
      date: new Date(),
      type: "meeting",
    },
  ]);

  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    date: new Date(),
    type: "meeting",
  });

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        id: events.length + 1,
        ...newEvent,
      },
    ]);
    setNewEvent({
      title: "",
      date: new Date(),
      type: "meeting",
    });
  };

  const todayEvents = events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    placeholder="Enter event title"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: "meeting" | "task" | "reminder") =>
                      setNewEvent({ ...newEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddEvent} className="w-full">
                  Add Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="flex flex-col md:flex-row gap-6 p-6">
            <div className="sm:w-[250px] w-[250px] mx-auto">
              <CalendarPicker
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border w-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold mb-6 text-lg">
                Schedule for {format(date, "MMMM d, yyyy")}
              </h2>
              <div className="space-y-4 max-h-[250px] overflow-y-auto thin-scrollbar p-4">
                {todayEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      No events scheduled for today
                    </p>
                  </div>
                ) : (
                  todayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div
                        className={`w-2 h-12 rounded-full ${
                          event.type === "meeting"
                            ? "bg-blue-500"
                            : event.type === "task"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(event.date, "h:mm a")}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.type === "meeting"
                            ? "bg-blue-50 text-blue-700"
                            : event.type === "task"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
              {/* Week day headers */}
              <div className="col-span-7 grid grid-cols-7 bg-card">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-sm font-medium"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar days - Fixed height */}
              <div className="col-span-7 grid grid-cols-7 gap-px">
                {Array.from({ length: 35 }, (_, i) => {
                  const firstDayOfMonth = new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    1
                  );
                  const startDate = new Date(firstDayOfMonth);
                  startDate.setDate(1 - firstDayOfMonth.getDay());

                  const currentDate = new Date(startDate);
                  currentDate.setDate(startDate.getDate() + i);

                  const dayEvents = events.filter(
                    (event) =>
                      event.date.toDateString() === currentDate.toDateString()
                  );

                  const isCurrentMonth =
                    currentDate.getMonth() === currentMonth.getMonth();

                  return (
                    <div
                      key={i}
                      className={`h-[150px] p-2 bg-card ${
                        currentDate.toDateString() === new Date().toDateString()
                          ? "bg-accent/5"
                          : ""
                      }`}
                    >
                      <div
                        className={`font-medium text-sm mb-1 ${
                          !isCurrentMonth ? "text-muted-foreground" : ""
                        }`}
                      >
                        {format(currentDate, "d")}
                      </div>
                      <div className="space-y-1 h-[110px] overflow-y-auto no-scrollbar">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs px-1.5 py-0.5 rounded truncate ${
                              event.type === "meeting"
                                ? "bg-blue-50 text-blue-700"
                                : event.type === "task"
                                ? "bg-green-50 text-green-700"
                                : "bg-orange-50 text-orange-700"
                            }`}
                            title={`${event.title} - ${format(
                              event.date,
                              "h:mm a"
                            )}`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PrivateLayout>
  );
}