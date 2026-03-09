import { useState } from 'react';
import { useCreatorOSStore } from '@/store';
import type { Opportunity, Contact, OpportunityType } from '@/types';
import { 
  Briefcase, 
  Plus, 
  Clock,
  Mail,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  { value: 'all', label: 'All' },
  { value: 'lead', label: 'Lead' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'pitching', label: 'Pitching' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'closed_won', label: 'Won' },
  { value: 'closed_lost', label: 'Lost' },
];

const opportunityTypes = [
  { value: 'film_pitch', label: 'Film Pitch' },
  { value: 'campaign_pitch', label: 'Campaign Pitch' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'investment', label: 'Investment' },
  { value: 'consulting', label: 'Consulting' },
];

export function OpportunityCRM() {
  const { opportunities, contacts } = useCreatorOSStore();
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const filteredOpportunities = opportunities.filter((opp: Opportunity) => {
    return selectedStage === 'all' || opp.status === selectedStage;
  });

  const totalValue = opportunities
    .filter((o: Opportunity) => o.status !== 'closed_lost')
    .reduce((sum: number, o: Opportunity) => sum + (o.estimated_value || 0), 0);

  const weightedValue = opportunities
    .filter((o: Opportunity) => o.status !== 'closed_lost')
    .reduce((sum: number, o: Opportunity) => sum + ((o.estimated_value || 0) * (o.probability / 100)), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Opportunity CRM</h1>
          <p className="text-[#A0A0B0] mt-1">Track pitches, leads, and opportunities</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Opportunity</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Total Pipeline" value={`₹${(totalValue / 100000).toFixed(1)}L`} color="indigo" />
        <StatBox label="Weighted Value" value={`₹${(weightedValue / 100000).toFixed(1)}L`} color="green" />
        <StatBox label="Active Opportunities" value={opportunities.filter((o: Opportunity) => o.status !== 'closed_won' && o.status !== 'closed_lost').length} color="blue" />
        <StatBox label="Win Rate" value="60%" color="amber" />
      </div>

      {/* Pipeline */}
      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">Pipeline</h2>
          <div className="flex gap-2">
            {stages.map((stage) => (
              <button
                key={stage.value}
                onClick={() => setSelectedStage(stage.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  selectedStage === stage.value
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-[#606070] hover:bg-[#1A1A25]'
                )}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOpportunities.map((opp: Opportunity) => (
            <OpportunityCard 
              key={opp.id} 
              opportunity={opp}
              contact={contacts.find((c: Contact) => c.id === opp.contact_id)}
              isSelected={selectedOpportunity === opp.id}
              onClick={() => setSelectedOpportunity(selectedOpportunity === opp.id ? null : opp.id)}
            />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12 text-[#606070]">
            <Briefcase className="w-12 h-12 mx-auto mb-4" />
            <p>No opportunities in this stage</p>
          </div>
        )}
      </div>

      {showNewModal && (
        <NewOpportunityModal onClose={() => setShowNewModal(false)} />
      )}
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    indigo: 'text-indigo-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
  };

  return (
    <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-4">
      <p className="text-sm text-[#606070]">{label}</p>
      <p className={cn('text-2xl font-bold mt-1', colors[color])}>{value}</p>
    </div>
  );
}

function OpportunityCard({ 
  opportunity, 
  contact,
  isSelected, 
  onClick 
}: { 
  opportunity: Opportunity;
  contact?: Contact;
  isSelected: boolean;
  onClick: () => void;
}) {
  const statusColors: Record<string, string> = {
    lead: 'text-amber-400 bg-amber-400/10',
    qualified: 'text-blue-400 bg-blue-400/10',
    pitching: 'text-purple-400 bg-purple-400/10',
    negotiation: 'text-indigo-400 bg-indigo-400/10',
    closed_won: 'text-green-400 bg-green-400/10',
    closed_lost: 'text-red-400 bg-red-400/10',
  };

  const probabilityColor = opportunity.probability >= 70 ? 'text-green-400' : 
                          opportunity.probability >= 40 ? 'text-amber-400' : 'text-red-400';

  return (
    <div 
      onClick={onClick}
      className={cn(
        'bg-[#1A1A25] border rounded-xl p-5 cursor-pointer transition-all',
        isSelected ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-transparent hover:border-[#3A3A4A]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[#F0F0F5]">{opportunity.name}</h3>
          <p className="text-xs text-[#606070]">{opportunity.type.replace('_', ' ')}</p>
        </div>
        <span className={cn('text-xs px-2 py-1 rounded-full', statusColors[opportunity.status])}>
          {opportunity.status.replace('_', ' ')}
        </span>
      </div>

      {contact && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{contact.name.charAt(0)}</span>
          </div>
          <span className="text-xs text-[#A0A0B0]">{contact.name}</span>
          <span className="text-xs text-[#606070]">• {contact.organization}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-[#606070]">Estimated Value</p>
          <p className="text-lg font-bold text-[#F0F0F5]">
            ₹{(opportunity.estimated_value / 100000).toFixed(1)}L
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#606070]">Probability</p>
          <p className={cn('text-lg font-bold', probabilityColor)}>{opportunity.probability}%</p>
        </div>
      </div>

      {opportunity.next_action && (
        <div className="flex items-center gap-2 p-2 bg-[#12121A] rounded-lg">
          <Clock className="w-3 h-3 text-[#606070]" />
          <span className="text-xs text-[#A0A0B0]">{opportunity.next_action}</span>
          {opportunity.next_action_date && (
            <span className="text-xs text-amber-400">
              {new Date(opportunity.next_action_date).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      {isSelected && (
        <div className="flex gap-2 pt-4 mt-4 border-t border-[#2A2A3A]">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
            <Mail className="w-4 h-4" />
            Follow Up
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors text-sm">
            <CheckCircle2 className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function NewOpportunityModal({ onClose }: { onClose: () => void }) {
  const { addOpportunity, contacts } = useCreatorOSStore();
  const [formData, setFormData] = useState({
    name: '',
    type: 'film_pitch' as OpportunityType,
    contact_id: '',
    estimated_value: '',
    probability: 50,
    description: '',
    next_action: '',
  });

  const handleSubmit = () => {
    addOpportunity({
      id: Math.random().toString(36).substr(2, 9),
      user_id: '1',
      contact_id: formData.contact_id || undefined,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      estimated_value: parseFloat(formData.estimated_value) || 0,
      probability: formData.probability,
      status: 'lead',
      next_action: formData.next_action,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A3A]">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">New Opportunity</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Opportunity Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="e.g., Film Pitch with Studio X"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as OpportunityType })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
            >
              {opportunityTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Contact</label>
            <select
              value={formData.contact_id}
              onChange={(e) => setFormData({ ...formData, contact_id: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select contact</option>
              {contacts.map((contact: Contact) => (
                <option key={contact.id} value={contact.id}>{contact.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#A0A0B0] mb-1">Estimated Value (₹)</label>
              <input
                type="number"
                value={formData.estimated_value}
                onChange={(e) => setFormData({ ...formData, estimated_value: e.target.value })}
                className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
                placeholder="5000000"
              />
            </div>
            <div>
              <label className="block text-sm text-[#A0A0B0] mb-1">Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full h-20 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Additional details..."
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Next Action</label>
            <input
              type="text"
              value={formData.next_action}
              onChange={(e) => setFormData({ ...formData, next_action: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="e.g., Send follow-up email"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#2A2A3A]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5]">Cancel</button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.name}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-sm"
          >
            Create Opportunity
          </button>
        </div>
      </div>
    </div>
  );
}
