import { useState } from "react";
import { Calendar, Plus, Star, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Priority = "critical" | "high" | "medium" | "low";

interface DateTask {
  id: string;
  title: string;
  priority: Priority;
  date: string;
  completed: boolean;
}

const priorityConfig: Record<Priority, { label: string; color: string; bar: string; stars: number }> = {
  critical: { label: "💖 Can't Wait", color: "text-primary", bar: "bg-primary", stars: 4 },
  high: { label: "❤️ Important", color: "text-destructive", bar: "bg-destructive/80", stars: 3 },
  medium: { label: "💛 Soon", color: "text-accent-foreground", bar: "bg-accent", stars: 2 },
  low: { label: "💚 Someday", color: "text-muted-foreground", bar: "bg-muted-foreground/40", stars: 1 },
};

const defaultTasks: DateTask[] = [
  { id: "1", title: "Anniversary Dinner 🕯️", priority: "critical", date: "2026-03-14", completed: false },
  { id: "2", title: "Movie Marathon Night 🎬", priority: "high", date: "2026-03-01", completed: false },
  { id: "3", title: "Sunset Picnic 🌅", priority: "medium", date: "2026-04-10", completed: false },
  { id: "4", title: "A Really Long Hug 🤗", priority: "critical", date: "2026-02-15", completed: false },
  { id: "5", title: "Cook Together Night 👨‍🍳", priority: "high", date: "2026-03-20", completed: false },
];

export const DateScheduler = () => {
  const [tasks, setTasks] = useState<DateTask[]>(defaultTasks);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("high");
  const [showAdd, setShowAdd] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: DateTask = {
      id: Date.now().toString(),
      title: newTask,
      priority: newPriority,
      date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      completed: false,
    };
    setTasks((prev) => [...prev, task].sort((a, b) => {
      const order: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    }));
    setNewTask("");
    setShowAdd(false);
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const sorted = [...tasks].sort((a, b) => {
    const order: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  // Gantt-like width based on days from now
  const today = new Date();
  const maxDays = 90;

  return (
    <div className="space-y-8">
      {/* Gantt Chart Visualization */}
      <Card className="bg-gradient-card shadow-soft overflow-hidden">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4 font-mono">
            // Priority Scheduler v1.0 — Your time is my highest priority process
          </p>
          <div className="space-y-3">
            {sorted.map((task) => {
              const taskDate = new Date(task.date);
              const daysAway = Math.max(0, Math.ceil((taskDate.getTime() - today.getTime()) / 86400000));
              const widthPercent = Math.min(100, Math.max(15, (daysAway / maxDays) * 100));
              const config = priorityConfig[task.priority];

              return (
                <div key={task.id} className="group flex items-center gap-3">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`shrink-0 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                      task.completed
                        ? "bg-primary border-primary"
                        : "border-primary/40 hover:border-primary"
                    }`}
                  >
                    {task.completed && <Heart className="w-3 h-3 text-primary-foreground" fill="currentColor" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium truncate ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.title}
                      </span>
                      <span className="shrink-0 flex">
                        {[...Array(config.stars)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${config.color}`} fill="currentColor" />
                        ))}
                      </span>
                    </div>
                    <div className="h-6 bg-muted/30 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full ${config.bar} rounded-full transition-all duration-700 flex items-center px-3`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        <span className="text-[10px] text-white font-medium whitespace-nowrap">
                          {daysAway === 0 ? "Today!" : `${daysAway}d away`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Task */}
      {showAdd ? (
        <Card className="bg-gradient-card shadow-soft p-6">
          <CardContent className="p-0 space-y-4">
            <Input
              placeholder="What's our next date idea? 💡"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="bg-background/50"
            />
            <div className="flex flex-wrap gap-2">
              {(Object.keys(priorityConfig) as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setNewPriority(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    newPriority === p
                      ? `${priorityConfig[p].bar} text-white shadow-glow`
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {priorityConfig[p].label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={addTask} size="sm" className="rounded-full">
                <Plus className="w-4 h-4 mr-1" /> Add Date
              </Button>
              <Button onClick={() => setShowAdd(false)} size="sm" variant="ghost" className="rounded-full">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowAdd(true)} variant="outline" className="w-full rounded-full border-dashed border-primary/30 hover:border-primary/60">
          <Plus className="w-4 h-4 mr-2" /> Schedule a New Date
        </Button>
      )}
    </div>
  );
};
