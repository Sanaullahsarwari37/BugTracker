export default function BugForm({ children, onSubmit }) {
  return (
    <div className="p-2 w-full">
      <form className="w-full" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}