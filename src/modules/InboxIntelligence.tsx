import { useState } from 'react';
import { useCreatorOSStore } from '@/store';
import type { InboxItem } from '@/types';
import { 
  Mail, 
  Search, 
  Archive,
  Trash2,
  MoreHorizontal,
  AlertCircle,
  Sparkles,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'All', count: 0 },
  { value: 'unread', label: 'Unread', count: 3 },
  { value: 'needs_response', label: 'Needs Response', count: 2 },
  { value: 'opportunities', label: 'Opportunities', count: 1 },
  { value: 'follow_up', label: 'Follow Up', count: 1 },
];

export function InboxIntelligence() {
  const { inboxItems } = useCreatorOSStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');

  const filteredItems = inboxItems.filter((item: InboxItem) => {
    const matchesSearch = item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.body?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'unread' && !item.is_read) ||
                           (selectedCategory === 'needs_response' && item.requires_response);
    return matchesSearch && matchesCategory;
  });

  const selectedItem = inboxItems.find((i: InboxItem) => i.id === selectedEmail);

  const handleGenerateReply = async () => {
    setIsGeneratingReply(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGeneratedReply(`Hi there,\n\nGreat to hear from you! The conversation has stayed with me, and I'd love to explore this collaboration.\n\nThe project sounds promising, and I'm excited to learn more about your vision.\n\nWould you be open to a call next week to discuss further?\n\nLooking forward to hearing more.\n\nBest regards`);
    setIsGeneratingReply(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Inbox Intelligence</h1>
          <p className="text-[#A0A0B0] mt-1">Smart email management with AI assistance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm">
            <AlertCircle className="w-4 h-4" />
            3 need attention
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="lg:col-span-1 bg-[#12121A] border border-[#2A2A3A] rounded-xl overflow-hidden flex flex-col">
          {/* Search & Filter */}
          <div className="p-4 border-b border-[#2A2A3A]">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606070]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails..."
                className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F0F0F5] placeholder:text-[#606070] focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                    selectedCategory === cat.value
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-[#606070] hover:bg-[#1A1A25]'
                  )}
                >
                  {cat.label}
                  {cat.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-[#1A1A25] rounded-full">{cat.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {filteredItems.map((item) => (
              <EmailListItem 
                key={item.id} 
                item={item}
                isSelected={selectedEmail === item.id}
                onClick={() => setSelectedEmail(item.id)}
              />
            ))}
            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-[#606070]">
                <Mail className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No emails found</p>
              </div>
            )}
          </div>
        </div>

        {/* Email Detail */}
        <div className="lg:col-span-2 bg-[#12121A] border border-[#2A2A3A] rounded-xl overflow-hidden flex flex-col">
          {selectedItem ? (
            <>
              {/* Email Header */}
              <div className="p-4 border-b border-[#2A2A3A]">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#F0F0F5]">{selectedItem.subject}</h2>
                  <div className="flex gap-1">
                    <button className="p-2 text-[#606070] hover:text-[#F0F0F5] hover:bg-[#1A1A25] rounded-lg transition-colors">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-[#606070] hover:text-[#F0F0F5] hover:bg-[#1A1A25] rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-[#606070] hover:text-[#F0F0F5] hover:bg-[#1A1A25] rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {selectedItem.from_email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F0F0F5]">{selectedItem.from_email}</p>
                    <p className="text-xs text-[#606070]">To: {selectedItem.to_email}</p>
                  </div>
                  <span className="text-xs text-[#606070]">
                    {new Date(selectedItem.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {/* AI Insights */}
                {selectedItem.extracted_opportunities && selectedItem.extracted_opportunities.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-400/10 text-green-400 rounded-full">
                      Opportunity Detected
                    </span>
                    <span className="text-xs text-[#606070]">
                      {selectedItem.extracted_opportunities.length} potential opportunity
                    </span>
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#A0A0B0] whitespace-pre-wrap">{selectedItem.body}</p>
                </div>
              </div>

              {/* AI Reply */}
              <div className="p-4 border-t border-[#2A2A3A]">
                {!generatedReply ? (
                  <button
                    onClick={handleGenerateReply}
                    disabled={isGeneratingReply}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors"
                  >
                    <Sparkles className={cn('w-4 h-4', isGeneratingReply && 'animate-pulse')} />
                    {isGeneratingReply ? 'Generating reply...' : 'Generate AI Reply'}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-indigo-400">AI-Generated Reply</span>
                      <button 
                        onClick={() => setGeneratedReply('')}
                        className="text-xs text-[#606070] hover:text-[#A0A0B0]"
                      >
                        Regenerate
                      </button>
                    </div>
                    <textarea
                      value={generatedReply}
                      onChange={(e) => setGeneratedReply(e.target.value)}
                      className="w-full h-32 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-3 text-sm text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
                    />
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors text-sm">
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                      <button className="px-4 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#606070]">
              <Mail className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">Select an email to view</p>
              <p className="text-sm mt-1">Choose from the list on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailListItem({ item, isSelected, onClick }: { item: InboxItem; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 text-left border-b border-[#2A2A3A] transition-colors',
        isSelected ? 'bg-indigo-500/5' : 'hover:bg-[#1A1A25]'
      )}
    >
      <div className="flex items-start gap-3">
        {!item.is_read && (
          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className={cn('text-sm truncate', !item.is_read ? 'font-semibold text-[#F0F0F5]' : 'text-[#A0A0B0]')}>
              {item.from_email}
            </p>
            <span className="text-xs text-[#606070]">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className={cn('text-sm truncate mb-1', !item.is_read ? 'font-medium text-[#F0F0F5]' : 'text-[#A0A0B0]')}>
            {item.subject}
          </p>
          <p className="text-xs text-[#606070] line-clamp-1">{item.body}</p>
          
          {item.requires_response && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">
                Needs Response
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
