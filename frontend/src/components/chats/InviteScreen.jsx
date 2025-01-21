function InviteScreen({ activeTab }) {
  const potentialInvites = [
    { id: 6, name: "Tom Harris", email: "tom@example.com" },
    { id: 7, name: "Emma Davis", email: "emma@example.com" },
    { id: 8, name: "Chris Wilson", email: "chris@example.com" },
  ];

  return (
    activeTab === "add" && (
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-4">Invite Users</h2>
        {potentialInvites.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between text-white mb-2 p-2 bg-gray-700 rounded"
          >
            <div>
              <div>{user.name}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
              Invite
            </button>
          </div>
        ))}
      </div>
    )
  );
}

export default InviteScreen;
