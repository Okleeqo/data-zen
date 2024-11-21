import { useState } from 'react';
import { X, Plus, Pencil, Trash2, Check, UserPlus } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  status: 'active' | 'inactive';
  industry: string;
  revenue: number;
  joinedDate: string;
}

interface NewClient extends Partial<Client> {
  status?: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState<NewClient>({ status: 'active' });
  const [editingClient, setEditingClient] = useState<string | null>(null);

  const handleAddClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name || 'Unnamed Client',
      company: newClient.company || '',
      email: newClient.email || '',
      phone: newClient.phone || '',
      website: newClient.website || '',
      status: newClient.status as 'active' | 'inactive' || 'active',
      industry: newClient.industry || '',
      revenue: newClient.revenue || 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setClients([...clients, client]);
    setIsAddingClient(false);
    setNewClient({ status: 'active' });
  };

  const handleEditClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setNewClient(client);
      setEditingClient(id);
    }
  };

  const handleUpdateClient = () => {
    if (!editingClient) return;

    setClients(clients.map(client => 
      client.id === editingClient
        ? { ...client, ...newClient, status: newClient.status as 'active' | 'inactive' }
        : client
    ));
    setEditingClient(null);
    setNewClient({ status: 'active' });
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Clients</h1>
          <p className="text-emerald-600 mt-1">Manage your client relationships</p>
        </div>
        <button
          onClick={() => setIsAddingClient(true)}
          className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
        >
          <UserPlus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-50">
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Client</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Contact</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Industry</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Revenue</th>
                <th className="text-left py-3 px-4 text-emerald-600 font-medium">Status</th>
                <th className="text-right py-3 px-4 text-emerald-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-emerald-900">{client.name}</p>
                      <p className="text-sm text-emerald-600">{client.company}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-emerald-900">{client.email}</p>
                      <p className="text-sm text-emerald-600">{client.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-emerald-900">{client.industry}</td>
                  <td className="py-4 px-4 text-right font-medium text-emerald-900">
                    ${client.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      client.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClient(client.id)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      {(isAddingClient || editingClient) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-emerald-900">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h2>
              <button
                onClick={() => {
                  setIsAddingClient(false);
                  setEditingClient(null);
                  setNewClient({ status: 'active' });
                }}
                className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Client Name <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={newClient.name || ''}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Company <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={newClient.company || ''}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Email <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="email"
                  value={newClient.email || ''}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Phone <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={newClient.phone || ''}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Website <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  value={newClient.website || ''}
                  onChange={(e) => setNewClient({ ...newClient, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter website URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Industry <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={newClient.industry || ''}
                  onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter industry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Annual Revenue <span className="text-emerald-400 text-xs">(optional)</span>
                </label>
                <input
                  type="number"
                  value={newClient.revenue || ''}
                  onChange={(e) => setNewClient({ ...newClient, revenue: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter annual revenue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Status
                </label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsAddingClient(false);
                  setEditingClient(null);
                  setNewClient({ status: 'active' });
                }}
                className="px-4 py-2 text-emerald-700 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingClient ? handleUpdateClient : handleAddClient}
                className="px-4 py-2 text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
              >
                {editingClient ? 'Update Client' : 'Add Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}