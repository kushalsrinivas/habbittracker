import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useActivity } from "@/context/store";
import { DatePickerDemo } from "@/components/DatePicker";
import { HexColorPicker } from "react-colorful";
import { LineChartComponent } from "@/components/charts/linechart";
import { PieChartComponent } from "@/components/charts/piechart";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsFire } from "react-icons/bs";
import { Heatmap } from "@/components/charts/heatmap";
function Index() {
  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  function generateRandomData() {
    const data = [];
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Generate logs for each day between startDate and currentDate
    for (
      let date = startDate;
      date <= currentDate;
      date.setDate(date.getDate() + 1)
    ) {
      const count = Math.floor(Math.random() * 12); // Random log count between 0 and 11
      if (count !== 0) {
        // Some days might have no logs, simulating inactivity
        data.push({
          id: `log_${date.getTime()}`,
          date: new Date(date), // Clone the date to avoid mutation
          count,
        });
      }
    }

    return data;
  }
  function generateActivityData(startDate: Date, endDate: Date) {
    const data = [];
    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      const count = Math.floor(Math.random() * 100); // Random count between 0 and 99
      data.push({
        date: currentDate.toISOString().split("T")[0], // Format date as "YYYY-MM-DD"
        count: count,
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }

    return data;
  }
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6); // Set start date to 6 months ago
  const endDate = new Date(); // Today's date

  const activityData = generateActivityData(startDate, endDate);

  function generateRandomActivities() {
    return activities.map((activity, id) => ({
      name: activity.name,
      count: activity.logs.length,
      color: activity.color.toLowerCase(),
    }));
  }
  const {
    activities,
    incrementLog,
    addActivity,
    mostLoggedActivity,
    currentStreak,
    longestStreak,
    totalLogs,
  } = useActivity();
  var temp = mostLoggedActivity();
  console.log(temp);
  const randomData = generateRandomData().map((log) => ({
    activity: {
      id: "activity_" + Math.floor(Math.random() * 5),
      name: ["Hiking", "Reading", "Cooking", "Gardening", "Programming"][
        Math.floor(Math.random() * 5)
      ],
    },
    id: log.id,
    date: log.date,
    count: log.count,
  }));
  return (
    <div className="p-10">
      <div className="flex flex-row items-center  justify-center">
        <div className="p-5 text-3xl font-black text-center">Habbits</div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center p-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add a new Activity</Button>
          </DialogTrigger>
          <DialogContent className="w-[75%] rounded-lg">
            <DialogHeader>
              <DialogTitle>Add a Acitivity</DialogTitle>
              <DialogDescription>you know what to do</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="No Smoking"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="desc"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="this is a description of your activity"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Choose a Color
                </Label>
                <HexColorPicker color={color} onChange={setColor} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="flex flex-row gap-5 justify-between">
                <Button variant={"destructive"}>Exit</Button>
                <Button
                  onClick={() => {
                    addActivity({
                      color: color,
                      description: des,
                      id: Math.floor(Math.random() * 100),
                      name: name,
                      lastLogged: null,
                      logs: [],
                    });
                  }}
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DatePickerDemo></DatePickerDemo>
      </div>
      <div className="space-y-5">
        {activities.map((activity) => {
          return (
            <div key={activity.id}>
              <Card>
                <CardHeader className="grid grid-cols-4 items-center  justify-between gap-5">
                  <div className={` h-6 w-6 rounded-md `}>
                    {activity.logs.length}
                  </div>
                  <div className="flex  col-span-2 flex-col">
                    <CardTitle>{activity.name}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </div>
                  <Button onClick={() => incrementLog(activity.id)}>+</Button>
                </CardHeader>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="text-4xl text-center font-black p-10">Stats</div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Streak
            </CardTitle>
            <BsFire className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStreak()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Longest Streak
            </CardTitle>
            <BsFire className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{longestStreak()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <FaHistory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs()}</div>
            <p className="text-xs text-muted-foreground">
              {/* {displayDateRange(searchParams)} */}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Logged</CardTitle>
            <FaHistory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{temp?.name}</div>
            <p className="text-xs text-muted-foreground">
              {/* {displayDateRange(searchParams)} */}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 mt-4">
        <Heatmap data={randomData} params={{ activityId: "1" }}></Heatmap>
        <LineChartComponent data={activityData}></LineChartComponent>
        <PieChartComponent
          data={generateRandomActivities()}
        ></PieChartComponent>
      </div>
    </div>
  );
}

export default Index;
