import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useActivity } from "@/context/store";
import { DatePickerDemo } from "@/components/DatePicker";
import { HexColorPicker } from "react-colorful";
import { LineChartComponent } from "@/components/charts/linechart";
import { PieChartComponent } from "@/components/charts/piechart";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { GrScorecard } from "react-icons/gr";
import Donut from "@/components/charts/donut";
import RadarChartComponent from "@/components/charts/radar";
import BarChartComponent from "@/components/charts/bar";
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
import { count } from "console";
interface Activity {
  weights: number;
  id: number;
  name: string;
  description: string;
  good: Boolean;
  logs: Date[]; // Array of log dates
  lastLogged: Date | null;
  logStrings: String[];
}
interface ActivityData {
  date: String;
  count: number;
  good: boolean;
}
function Index() {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [isGood, setIsgood] = useState(true);
  const [priority, setPriority] = useState(1);

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

  // Today's date

  const {
    activities,
    getGoodLogs,
    getBadLogs,
    incrementLog,
    addActivity,
    mostLoggedActivity,
    currentStreak,
    longestStreak,
    totalLogs,
    leastLoggedActivity,
    getlastLogged,
    getFirstLogged,
  } = useActivity();
  function generateActivityData(activites: Activity[]) {
    const data: { date: String; count: number; good: Boolean }[] = [];

    activites.map((activity, _) => {
      data.push({
        date: activity.logStrings[0], // Format date as "YYYY-MM-DD"
        count: activity.logs.length,
        good: activity.good,
        // Move to next day
      });
    });

    return data;
  }
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6); // Set start date to 6 months ago
  const endDate = new Date(); // Today's date
  const activityData = generateActivityData(activities);

  console.log("activites : ", activities);

  var temp = mostLoggedActivity();
  function generateRandomActivities(
    numActivities: number,
    activities: string[],
    logs: Date[][],
    isGood: Boolean[],
    weights: number[]
  ) {
    const colors = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];

    return Array.from({ length: numActivities }, (_, i) => ({
      name: activities[i],
      count: isGood
        ? logs[i].length * weights[i] * 12
        : logs[i].length * weights[i] * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }
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
  const handlePriority = (e: any) => {
    const id = e.target.id;
    if (id === "low") {
      setPriority(1);
    }
    if (id === "medium") {
      setPriority(2);
    }
    if (id === "high") {
      setPriority(3);
    }
  };
  return (
    <div className="p-10">
      <div className="flex flex-row items-center  justify-center">
        <div className="p-5 text-3xl font-black text-center">
          Track Your Habbits
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center p-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Add a new habbit + </Button>
          </DialogTrigger>
          <DialogContent className="w-[75%] rounded-lg">
            <DialogHeader>
              <DialogTitle>Add a Acitivity</DialogTitle>
              <DialogDescription>you know what to do</DialogDescription>
            </DialogHeader>
            <div className=" gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
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
              <div className="flex flex-col mt-5 items-start gap-4">
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
              <div className="flex flex-col mt-5 items-start gap-4">
                <Label htmlFor="username" className="text-right">
                  is this a good habbit or a bad habbit ?
                </Label>
                <div className="flex flex-row gap-4 justify-between">
                  <Button
                    onClick={() => {
                      setIsgood(true);
                    }}
                    className={`${isGood ? "opacity-1" : "opacity-50"}`}
                    variant={"ghost"}
                  >
                    Good Habbit
                  </Button>
                  <Button
                    className={`${isGood ? "opacity-50" : "opacity-1"}`}
                    onClick={() => {
                      setIsgood(false);
                    }}
                    variant={"ghost"}
                  >
                    Bad Habbit
                  </Button>
                </div>
              </div>
              <div className="flex flex-col mt-5 items-start gap-4">
                <Label htmlFor="username" className="text-right">
                  Priority
                </Label>
                <div className="flex flex-row gap-4 justify-between">
                  <Button
                    id="low"
                    onClick={handlePriority}
                    className={`${
                      priority === 1 ? "opacity-1 " : "opacity-50"
                    } `}
                    variant={"ghost"}
                  >
                    Low
                  </Button>
                  <Button
                    id="medium"
                    onClick={handlePriority}
                    className={`${
                      priority === 2 ? "opacity-1 " : "opacity-50"
                    } `}
                    variant={"ghost"}
                  >
                    Medium
                  </Button>
                  <Button
                    id="high"
                    className={`${
                      priority === 3 ? "opacity-1 " : "opacity-50"
                    } `}
                    onClick={handlePriority}
                    variant={"ghost"}
                  >
                    High
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="flex flex-row gap-5 w-full justify-between">
                <Button variant={"destructive"}>Exit</Button>
                <Button
                  onClick={() => {
                    addActivity({
                      good: isGood,
                      weights: 1,
                      description: des,
                      id: Math.floor(Math.random() * 100),
                      name: name,
                      lastLogged: null,
                      logStrings: [],
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
      <div className="lg:w-1/2 w-full m-auto space-y-5">
        {activities.map((activity) => {
          return (
            <div key={activity.id}>
              <Card
                className={`${
                  activity.good
                    ? "border-green-900 text-green-600"
                    : "border-red-600 text-red-600"
                }`}
              >
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
      <div className="text-4xl text-center font-black p-10">Stats</div>
      <div className="grid gap-4 grid-col-1 lg:grid-col-1 md:grid-cols-2 lg:w-1/2 w-full m-auto">
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
        <Card className="col-span-2">
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

        <Card
          className={`${
            temp?.good
              ? "border-green-700 text-green-600"
              : "border-red-600 text-red-600"
          } `}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium`}>Most Logged</CardTitle>
            <BiArrowToTop
              className={`h-4 w-4  text-muted-foreground ${
                temp?.good
                  ? "border-green-700 text-green-600"
                  : "border-red-600 text-red-600"
              } `}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{temp?.name}</div>
            <p className="text-xs text-muted-foreground">
              {/* {displayDateRange(searchParams)} */}
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${
            leastLoggedActivity()?.good
              ? "border-green-700 text-green-600"
              : "border-red-600 text-red-600"
          } `}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium`}>
              Least Logged
            </CardTitle>
            <BiArrowToBottom
              className={`h-4 w-4  text-muted-foreground ${
                leastLoggedActivity()?.good
                  ? "border-green-700 text-green-600"
                  : "border-red-600 text-red-600"
              } `}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leastLoggedActivity()?.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* {displayDateRange(searchParams)} */}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <GrScorecard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {Math.round(Math.abs(12 * getGoodLogs() - getBadLogs() * 20))}
            </div>

            <BarChartComponent></BarChartComponent>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 mt-4 w-full lg:w-1/2 m-auto">
        {activities.length !== 0 && (
          <>
            <LineChartComponent
              data={activityData.filter((temp, _) => {
                if (temp.good) {
                  return {
                    date: temp.date,
                    count: temp.count,
                  };
                }
              })}
              good={true}
            ></LineChartComponent>
            <LineChartComponent
              data={activityData.filter((temp, _) => {
                if (temp.good === false) {
                  return {
                    date: temp.date,
                    count: temp.count,
                  };
                }
              })}
              good={false}
            ></LineChartComponent>{" "}
          </>
        )}

        <Heatmap data={randomData} params={{ activityId: "3" }}></Heatmap>
      </div>
    </div>
  );
}

export default Index;
