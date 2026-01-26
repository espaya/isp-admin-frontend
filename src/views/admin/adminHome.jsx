export default function AdminHome() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-gray-500">Users</h4>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-gray-500">Packages</h4>
          <p className="text-2xl font-bold">324</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-gray-500">Payments</h4>
          <p className="text-2xl font-bold">567</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-gray-500">Revenue</h4>
          <p className="text-2xl font-bold">$12,450</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="font-semibold mb-4">Revenue (Last 30 days)</h4>
          {/* Chart placeholder */}
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="font-semibold mb-4">Latest Users</h4>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between">
              <span>John Doe</span>
              <span className="text-gray-400">2026-01-25</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Jane Smith</span>
              <span className="text-gray-400">2026-01-24</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
