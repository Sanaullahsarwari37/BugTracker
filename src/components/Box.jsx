export default function Box({ children, isEditing }) {
  return (
    <div className={`flex flex-col justify-center items-center shadow-2xl bg-gray-900 ${isEditing ? "border border-green-500 shadow-green-700" : "border border-indigo-500 shadow-indigo-700"} py-6 rounded-2xl w-full max-w-[90%] sm:max-w-[32rem] md:max-w-[38rem] lg:max-w-[42rem] mt-4 px-4`}>
      {children}
    </div>
  );
}