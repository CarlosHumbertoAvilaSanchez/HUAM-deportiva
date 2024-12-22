"use client";

import { useState } from "react";
import { Users, MapPin, Tag, FileImage } from "lucide-react";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import addEvent from "@/utils/supabase/addEvent";

function handleCategories(categories: string) {
  return categories.split(",");
}

export function AddEventForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(1);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  function handleSubmit(
    e: React.FormEvent,
    name: string,
    date: string,
    participants: number,
    location: string,
    categories: string[],
    description: string
  ) {
    e.preventDefault();
    addEvent({ name, date, participants, location, categories, description });
  }
  return (
    <form className="space-y-8 bg-white shadow-md rounded-lg p-6">
      <div className="space-y-2 flex flex-col">
        <label htmlFor="name">Event Name</label>
        <Input
          id="name"
          placeholder="Enter event name"
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="date">Event Date</label>
        <Input type="date" required onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="participants">Participants Limit</label>
        <div className="relative flex items-center">
          <Users className="text-gray-400 absolute left-2" />
          <Input
            type="number"
            id="participants"
            min="1"
            className="w-full pl-10"
            placeholder="Enter participants limit"
            required
            onChange={(e) => setParticipants(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="location">Location</label>
        <div className="relative flex items-center">
          <MapPin className="text-gray-400 absolute left-2" />
          <Input
            id="location"
            placeholder="Enter event location"
            className="w-full pl-10"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="categories">Categories</label>
        <div className="relative flex items-center">
          <Tag className="text-gray-400 absolute left-2" />
          <Input
            id="categories"
            placeholder="Enter categories (comma separated)"
            className="w-full pl-10"
            required
            onChange={(e) => setCategories(handleCategories(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="description">Description</label>
        <TextArea
          id="description"
          placeholder="Enter event description"
          rows={4}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="banner">Event Banner</label>
        <div className="flex items-center">
          <Input type="file" id="banner" accept="image/*" className="hidden" />
          <button className="border-slate-100 border-2 rounded-md flex items-center p-4 m-0">
            <FileImage className="mr-2 h-4 w-4" />
            Upload Banner
          </button>
        </div>
      </div>
      <button
        className="w-full bg-[#043364] p-2 text-white rounded-md"
        onClick={(e) =>
          handleSubmit(
            e,
            name,
            date,
            participants,
            location,
            categories,
            description
          )
        }
      >
        Create Event
      </button>
    </form>
  );
}
