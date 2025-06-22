import React from 'react';
import { CheckCircle, Trash2, Plus, Pencil } from 'lucide-react';

const TodoApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">My Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Organize your day with style ✨</p>
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="What's next?"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition flex items-center justify-center">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {/* Task 1 */}
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-red-500 w-5 h-5" />
              <span className="text-gray-800 font-medium">Design portfolio website</span>
            </div>
            <div className="flex items-center gap-2">
              <Pencil className="text-blue-500 hover:text-blue-600 cursor-pointer transition w-5 h-5" />
              <Trash2 className="text-red-500 hover:text-red-600 cursor-pointer transition w-5 h-5" />
            </div>
          </li>

          {/* Task 2 (Completed) */}
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <span className="line-through text-gray-400 font-medium">Read a new book</span>
            </div>
            <div className="flex items-center gap-2">
              <Pencil className="text-blue-400 hover:text-blue-500 cursor-pointer transition w-5 h-5" />
              <Trash2 className="text-red-500 hover:text-red-600 cursor-pointer transition w-5 h-5" />
            </div>
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>1 remaining</span>
            <div className="flex gap-3">
              <button className="hover:underline">All</button>
              <button className="hover:underline">Active</button>
              <button className="hover:underline">Completed</button>
            </div>
          </div>

          {/* Clear All Button */}
          <button className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
