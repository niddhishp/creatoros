import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { 
  Search, Bell, Plus, User, LogOut, 
  Settings, ChevronDown, Sparkles, CheckCircle2
} from 'lucide-react';

export default function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const user = useCreatorOSStore((state) => state.user);
  const notifications = useCreatorOSStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markNotificationRead = useCreatorOSStore((state) => state.markNotificationRead);
  const dismissAllNotifications = useCreatorOSStore((state) => state.dismissAllNotifications);
  const setCommandPaletteOpen = useCreatorOSStore((state) => state.setCommandPaletteOpen);
  const setQuickCaptureOpen = useCreatorOSStore((state) => state.setQuickCaptureOpen);
  const logout = useCreatorOSStore((state) => state.logout);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'info':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors w-96"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">Search projects, ideas, agents...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-xs bg-slate-700 rounded">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-slate-700 rounded">K</kbd>
          </div>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Capture */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickCaptureOpen(true)}
          className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Capture
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-slate-400 hover:text-slate-200"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50"
              >
                <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-medium text-slate-200">Notifications</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={dismissAllNotifications}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Mark all read
                  </Button>
                </div>
                <div className="max-h-64 overflow-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-slate-500 text-sm">No notifications</p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationRead(notification.id)}
                        className={`p-3 border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                          !notification.read ? 'bg-slate-800/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div>
                            <p className="text-sm font-medium text-slate-200">
                              {notification.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm text-slate-300 hidden sm:block">{user?.name}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50"
              >
                <div className="p-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <div className="border-t border-slate-800 my-1" />
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
