import { PencilIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Box from "./components/Box";
import Title from "./components/Title";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";
import Input from "./components/Input";
import Button from "./components/Button";

export default function BugTracker() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortType, setSortType] = useState("default");

  const shadow = `hover:shadow-md ${isEditing ? "shadow-green-800" : "shadow-indigo-800"} hover:scale-105 transition-transform duration-500`;
  const inputStyle = {
    class: `ring-1 rounded-[6px] p-2 ml-0 sm:ml-2 ${isEditing ? "text-green-400" : "text-indigo-400"} outline-0`
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bugTrackerList");
    if (saved) {
      const parsed = JSON.parse(saved);
      setList(parsed);
      const maxId = parsed.reduce((max, item) => (item.id > max ? item.id : max), 0);
      setId(maxId + 1);
    }
  }, []);

  // Save to or remove from localStorage when list changes
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("bugTrackerList", JSON.stringify(list));
    } else {
      localStorage.removeItem("bugTrackerList"); // clear storage when empty
    }
  }, [list]);

  function handleDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      setList((prev) => prev.filter((item) => item.id !== id));
      resetForm();
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    // const content = description;
    
    const newBug = { id, title, description, resolved: false, priority };
    console.log(newBug)
    // output {id:1 ,title:"sdfjksdhf",content:"lsdjflksdjfsd"}
    setList((prev) => [...prev, newBug]);
    setId(id + 1);
    resetForm();
  }

  function handleResolved(id) {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  }

  function handleEdit(id) {
    const bug = list.find((item) => item.id === id);
    setTitle(bug.title);
    setDescription(bug.description);
    setPriority(bug.priority);
    setIsEditing(true);
    setEditId(id);
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    if (window.confirm("Are you sure to update this record?")) {
      setList((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, title, description, priority } : item
        )
      );
      resetForm();
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("Low");
    setIsEditing(false);
    setEditId(null);
  }

  const filteredList = list
    .filter((bug) =>
      filterStatus === "all"
        ? true
        : filterStatus === "resolved"
        ? bug.resolved
        : !bug.resolved
    )
    .sort((a, b) => {
      if (sortType === "title") return a.title.localeCompare(b.title);
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className="flex flex-col bg-gradient-to-br from-rose-950 via-slate-950 to-rose-950 min-h-screen items-center px-2 sm:px-4 py-6">
      <Box isEditing={isEditing}>
        <Title />
        <BugForm onSubmit={isEditing ? handleUpdate : handleFormSubmit}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            <Input type="text" className={`${shadow} ${inputStyle.class} w-full sm:w-[14rem]`} placeholder="Bug Title" value={title} handleOnChange={(e) => setTitle(e.target.value)} />
            <Input type="text" className={`${shadow} ${inputStyle.class} w-full sm:w-[17rem]`} placeholder="Description" value={description} handleOnChange={(e) => setDescription(e.target.value)} />
            <select className={`${shadow} ${inputStyle.class} w-full sm:w-[10rem]`} value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <Button className={`${isEditing ? "ring-1 ring-green-400 bg-green-600" : "ring-1 ring-indigo-400 bg-indigo-600"} p-2 w-full sm:w-[6rem] text-amber-50 rounded ${shadow} cursor-pointer`}>{isEditing ? "Update" : "Add"}</Button>
          </div>
        </BugForm>
      </Box>

      <Box>
        {filteredList.map((bug) => (
          <BugList bugs={bug} key={bug.id} checkBox={
            <Input type="checkbox" value={bug.resolved} handleOnChange={() => handleResolved(bug.id)} checked={bug.resolved} />
          }>
            <Button className="ring-1 text-orange-400 ml-2 p-2 w-[2.5rem] text-sm rounded-full hover:text-orange-800" onClick={() => handleEdit(bug.id)}>
              <PencilIcon />
            </Button>
            <Button className="ring-1 text-red-600 ml-2 p-2 w-[2.5rem] text-sm rounded-full hover:text-red-800" onClick={() => handleDelete(bug.id)}>
              <Trash />
            </Button>
          </BugList>
        ))}

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 text-white">
          <select className="ring-1 p-2 rounded text-indigo-400" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
          </select>

          {list.length > 0 ? (
            <Button className="ring-1 text-red-600 ml-2 mt-3 p-2 w-[2.5rem] text-sm rounded-full hover:text-red-800" onClick={() => {
              if (window.confirm("Are you sure to clear all bugs?")) {
                localStorage.removeItem("bugTrackerList");
                setList([]);
                setId(1);
                resetForm();
              }
            }}>
              <Trash />
            </Button>
          ) : (
            <span className="text-indigo-400">No bug found</span>
          )}

          <select className="ring-1 p-2 rounded text-indigo-400" value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Sort: None</option>
            <option value="title">Sort by Title</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </Box>
    </div>
  );
}



