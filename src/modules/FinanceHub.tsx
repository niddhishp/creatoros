import { useState } from 'react';
import { useCreatorOSStore } from '@/store';
import type { FinanceEntry } from '@/types';
import { 
  Wallet, 
  Plus, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expenses' },
];

const expenseCategories = [
  'Software',
  'Equipment',
  'Travel',
  'Marketing',
  'Office',
  'Freelancers',
  'Other',
];

const incomeCategories = [
  'Project Fee',
  'Retainer',
  'Consulting',
  'Royalties',
  'Other',
];

export function FinanceHub() {
  const { financeEntries, addFinanceEntry } = useCreatorOSStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);

  const filteredEntries = financeEntries.filter((entry: FinanceEntry) => {
    return selectedCategory === 'all' || entry.entry_type === selectedCategory;
  });

  const totalIncome = financeEntries
    .filter((e: FinanceEntry) => e.entry_type === 'income')
    .reduce((sum: number, e: FinanceEntry) => sum + e.amount, 0);

  const totalExpenses = financeEntries
    .filter((e: FinanceEntry) => e.entry_type === 'expense')
    .reduce((sum: number, e: FinanceEntry) => sum + e.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Finance Hub</h1>
          <p className="text-[#A0A0B0] mt-1">Track income, expenses, and financial health</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Entry</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox 
          label="Total Income" 
          value={`₹${(totalIncome / 100000).toFixed(1)}L`} 
          trend="+12%"
          trendUp={true}
          icon={TrendingUp}
        />
        <StatBox 
          label="Total Expenses" 
          value={`₹${(totalExpenses / 100000).toFixed(1)}L`} 
          trend="+5%"
          trendUp={false}
          icon={TrendingDown}
        />
        <StatBox 
          label="Net Income" 
          value={`₹${(netIncome / 100000).toFixed(1)}L`} 
          trend="+18%"
          trendUp={true}
          icon={Wallet}
        />
        <StatBox 
          label="Monthly Burn" 
          value={`₹${(420000 / 100000).toFixed(1)}L`} 
          trend="8 months runway"
          trendUp={true}
          icon={Calendar}
        />
      </div>

      {/* Charts & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Charts */}
        <div className="lg:col-span-2 space-y-4">
          {/* Cash Flow Chart Placeholder */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#F0F0F5]">Cash Flow</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs bg-indigo-500/10 text-indigo-400 rounded-lg">Monthly</button>
                <button className="px-3 py-1.5 text-xs text-[#606070] hover:bg-[#1A1A25] rounded-lg">Quarterly</button>
                <button className="px-3 py-1.5 text-xs text-[#606070] hover:bg-[#1A1A25] rounded-lg">Yearly</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 70, 80].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-indigo-500/20 rounded-t-lg relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg"
                      style={{ height: `${height * 0.6}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#606070]">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#F0F0F5]">Recent Transactions</h2>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                      selectedCategory === cat.value
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-[#606070] hover:bg-[#1A1A25]'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredEntries.length > 0 ? (
                filteredEntries.slice(0, 10).map((entry) => (
                  <TransactionItem key={entry.id} entry={entry} />
                ))
              ) : (
                <div className="text-center py-8 text-[#606070]">
                  <Wallet className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">No transactions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Summary */}
        <div className="space-y-4">
          {/* Expense Breakdown */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#F0F0F5] mb-4">Expense Breakdown</h3>
            <div className="space-y-3">
              <ExpenseBar label="Software" amount={85000} total={totalExpenses} color="bg-indigo-500" />
              <ExpenseBar label="Equipment" amount={45000} total={totalExpenses} color="bg-violet-500" />
              <ExpenseBar label="Travel" amount={35000} total={totalExpenses} color="bg-pink-500" />
              <ExpenseBar label="Marketing" amount={25000} total={totalExpenses} color="bg-amber-500" />
              <ExpenseBar label="Other" amount={15000} total={totalExpenses} color="bg-[#606070]" />
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#F0F0F5]">Upcoming</h3>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="space-y-3">
              <UpcomingItem 
                title="Adobe Subscription"
                amount={4500}
                date="Tomorrow"
                type="expense"
              />
              <UpcomingItem 
                title="Project Payment - Studio X"
                amount={250000}
                date="In 5 days"
                type="income"
              />
              <UpcomingItem 
                title="Office Rent"
                amount={35000}
                date="In 12 days"
                type="expense"
              />
            </div>
          </div>

          {/* Subscriptions */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#F0F0F5] mb-4">Monthly Subscriptions</h3>
            <div className="space-y-2">
              <SubscriptionItem name="Adobe Creative Cloud" amount={4500} />
              <SubscriptionItem name="Notion" amount={800} />
              <SubscriptionItem name="Figma" amount={1200} />
              <SubscriptionItem name="OpenAI API" amount={2500} />
            </div>
            <div className="mt-4 pt-4 border-t border-[#2A2A3A]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#606070]">Total Monthly</span>
                <span className="text-sm font-semibold text-[#F0F0F5]">₹9,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewModal && (
        <NewEntryModal onClose={() => setShowNewModal(false)} addFinanceEntry={addFinanceEntry} />
      )}
    </div>
  );
}

function StatBox({ 
  label, 
  value, 
  trend, 
  trendUp,
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  trend: string;
  trendUp: boolean;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#606070]">{label}</p>
          <p className="text-2xl font-bold text-[#F0F0F5] mt-1">{value}</p>
        </div>
        <div className="w-10 h-10 bg-[#1A1A25] rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
      </div>
      <p className={cn('text-sm mt-3', trendUp ? 'text-green-400' : 'text-red-400')}>
        {trend}
      </p>
    </div>
  );
}

function TransactionItem({ entry }: { entry: FinanceEntry }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#1A1A25] rounded-lg">
      <div className="flex items-center gap-3">
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center',
          entry.entry_type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'
        )}>
          {entry.entry_type === 'income' ? (
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          )}
        </div>
        <div>
          <p className="text-sm text-[#F0F0F5]">{entry.description || entry.category}</p>
          <p className="text-xs text-[#606070]">{new Date(entry.entry_date).toLocaleDateString()}</p>
        </div>
      </div>
      <span className={cn(
        'text-sm font-medium',
        entry.entry_type === 'income' ? 'text-green-400' : 'text-red-400'
      )}>
        {entry.entry_type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString()}
      </span>
    </div>
  );
}

function ExpenseBar({ label, amount, total, color }: { label: string; amount: number; total: number; color: string }) {
  const percentage = total > 0 ? (amount / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#A0A0B0]">{label}</span>
        <span className="text-xs text-[#606070]">₹{amount.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-[#1A1A25] rounded-full overflow-hidden">
        <div 
          className={cn('h-full rounded-full', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function UpcomingItem({ title, amount, date, type }: { title: string; amount: number; date: string; type: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-[#F0F0F5]">{title}</p>
        <p className="text-xs text-[#606070]">{date}</p>
      </div>
      <span className={cn('text-sm font-medium', type === 'income' ? 'text-green-400' : 'text-red-400')}>
        {type === 'income' ? '+' : '-'}₹{amount.toLocaleString()}
      </span>
    </div>
  );
}

function SubscriptionItem({ name, amount }: { name: string; amount: number }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-[#A0A0B0]">{name}</span>
      <span className="text-sm text-[#606070]">₹{amount.toLocaleString()}/mo</span>
    </div>
  );
}

function NewEntryModal({ onClose, addFinanceEntry }: { onClose: () => void; addFinanceEntry: (entry: Omit<FinanceEntry, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = () => {
    addFinanceEntry({
      user_id: '1',
      entry_type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount) || 0,
      currency: 'INR',
      entry_date: formData.date,
      description: formData.description,
      created_at: new Date().toISOString(),
    });
    onClose();
  };

  const categoryOptions = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A3A]">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">Add Transaction</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium transition-colors',
                formData.type === 'income'
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-[#1A1A25] text-[#606070]'
              )}
            >
              Income
            </button>
            <button
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium transition-colors',
                formData.type === 'expense'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-[#1A1A25] text-[#606070]'
              )}
            >
              Expense
            </button>
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Amount (₹)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="What was this for?"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#2A2A3A]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5]">Cancel</button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.category || !formData.amount}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-sm"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
