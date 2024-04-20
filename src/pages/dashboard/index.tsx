import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HexColorPicker } from "react-colorful";
import Link from "next/link";
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

function Index() {
  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  return (
    <div className="p-10">
      <div className="flex flex-row items-center  justify-center">
        <div className="p-5 text-3xl font-black text-center">Habbits</div>
      </div>
      <div className="flex justify-center p-10">
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
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
}

export default Index;
