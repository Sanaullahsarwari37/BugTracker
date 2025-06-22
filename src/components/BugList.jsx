export default function BugList({ children, bugs, checkBox }) {
  return (
    <div className="flex flex-col w-full max-w-[90%] sm:max-w-[32rem] md:max-w-[38rem] lg:max-w-[42rem] ring-1 ring-indigo-600 rounded-[6px] p-4 bg-gray-800 text-white mt-4">
      <ul className="list-disc list-inside space-y-3">
        <li className="flex flex-col">
          <h2 className="text-lg font-semibold text-yellow-600">
            <span>🐛</span> Bug {bugs.id}: {bugs.title}
            <span className={`ml-3 text-sm p-1 px-2 rounded text-white ${bugs.priority === "High" ? "bg-red-600" : bugs.priority === "Medium" ? "bg-yellow-600" : "bg-blue-600"}`}>
              {bugs.priority}
            </span>
          </h2>
          <div className="text-sm text-gray-300 flex justify-between items-center">
            {bugs.description}
            <span className={`${bugs.resolved ? "bg-green-600" : "bg-rose-900"} p-[8px] text-center rounded-3xl font-sans text-amber-50`}>
              <span className="m-1">{checkBox}</span> {bugs.resolved ? "resolved" : "unsolved"}
            </span>
            <div className="justify-end">{children}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
