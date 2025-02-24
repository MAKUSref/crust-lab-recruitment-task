export default function ListHeader() {
  return (
    <div className="grid grid-cols-12 border-b border-gray-200 px-3 py-2">
      <div className="col-span-4">
        <p className="text-sm">Name</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm">ID</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-right">PLN</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-right">EUR</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-right">USD</p>
      </div>
    </div>
  );
}
