import React from 'react';
import { Helmet } from 'react-helmet';
import { Bell, Film, Info, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const notifications = [
  {
    id: 1,
    type: 'new_arrival',
    title: 'New Arrival: Dune: Part Two',
    message: 'The saga continues. Watch the latest blockbuster now available in 4K HDR.',
    time: '2 hours ago',
    icon: Film,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 2,
    type: 'system',
    title: 'System Update',
    message: 'We have updated our video player for better streaming performance.',
    time: '1 day ago',
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    id: 3,
    type: 'subscription',
    title: 'Subscription Alert',
    message: 'Your free trial ends in 3 days. Upgrade now to keep watching uninterrupted.',
    time: '2 days ago',
    icon: ShieldAlert,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  }
];

const Notifications = () => {
  return (
    <>
      <Helmet>
        <title>Notifications - Watch It</title>
      </Helmet>
      <div className="min-h-screen bg-black pt-24 px-4 md:px-8 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-emerald-500 w-8 h-8" />
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
          </div>

          <div className="space-y-4">
            {notifications.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex gap-4 hover:bg-zinc-900 transition-colors cursor-pointer group"
              >
                <div className={`p-3 rounded-full h-fit ${item.bg}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="text-sm text-gray-500 hover:text-white transition-colors">
              Clear all notifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;