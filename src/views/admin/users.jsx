export default function UsersPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-3">John Doe</td>
            <td className="p-3">john@example.com</td>
            <td className="p-3">User</td>
            <td className="p-3">Active</td>
            <td className="p-3 space-x-2">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
