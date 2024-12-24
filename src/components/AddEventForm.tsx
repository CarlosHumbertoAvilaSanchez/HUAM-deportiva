"use client";

import { useState } from "react";
import { Users, MapPin, FileImage, PlusCircle } from "lucide-react";
import { Input } from "@/components/Input";
import AddCategoryForm from "@/components/AddCategoryForm";
import TextArea from "@/components/TextArea";
import addEvent from "@/utils/supabase/addEvent";
import Popup from "@/components/Popup";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Category } from "@/utils/definitions";

export function AddEventForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");

  function handleSubmit(
    e: React.FormEvent,
    name: string,
    date: string,
    participants: number,
    location: string,
    categories: Category[],
    description: string
  ) {
    e.preventDefault();
    addEvent({ name, date, participants, location, categories, description });
    setName("");
    setDate("");
    setParticipants("");
    setLocation("");
    setCategories([]);
    setDescription("");
  }

  function onClose() {
    redirect("/dashboard/add-event");
  }

  return (
    <>
      <Popup title="Agregar categorias" onClose={onClose}>
        <AddCategoryForm
          categories={categories}
          setCategories={setCategories}
        />
      </Popup>
      <form className="space-y-8 bg-white shadow-md rounded-lg p-6">
        <div className="space-y-2 flex flex-col">
          <label htmlFor="name">Event Name</label>
          <Input
            id="name"
            placeholder="Enter event name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="date">Event Date</label>
          <Input
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="participants">Participants Limit</label>
          <div className="relative flex items-center">
            <Users className="text-gray-400 absolute left-2" />
            <Input
              type="number"
              id="participants"
              className="w-full pl-10"
              placeholder="Enter participants limit"
              required
              onChange={(e) => setParticipants(parseInt(e.target.value))}
              value={participants}
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
              value={location}
            />
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="categories">Categories</label>
          <div className="relative flex items-center">
            <Link
              href="/dashboard/add-event?showDialog=y"
              className="flex text-gray-400 bg-slate-50 p-2 rounded-md items-center gap-2 w-full border-[1px] border-slate-300"
            >
              <PlusCircle />
              Add Categories
            </Link>
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
            value={description}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="banner">Event Banner</label>
          <div className="flex items-center">
            <Input
              type="file"
              id="banner"
              accept="image/*"
              className="hidden"
            />
            <button
              className="border-slate-100 border-2 rounded-md flex items-center p-4 m-0"
              onClick={() => console.log(categories)}
            >
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
              typeof participants === "number" ? participants : 0,
              location,
              categories,
              description
            )
          }
        >
          Create Event
        </button>
      </form>
    </>
  );
}
