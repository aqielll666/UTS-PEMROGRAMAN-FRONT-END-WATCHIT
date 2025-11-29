import React from 'react';
import { Helmet } from 'react-helmet';
import { Settings as SettingsIcon, User, Globe, Shield, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SettingsSection = ({ title, icon: Icon, children }) => (
  <div className="mb-8 bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
    <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
      <Icon className="w-5 h-5 text-emerald-500" />
      <h2 className="font-semibold text-white">{title}</h2>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const SettingRow = ({ label, description, action }) => (
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <div className="text-sm font-medium text-white">{label}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
    {action}
  </div>
);

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Settings - Watch It</title>
      </Helmet>
      <div className="min-h-screen bg-black pt-24 px-4 md:px-8 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" /> Settings
          </h1>
          <p className="text-gray-400 mb-8">Manage your account preferences and application settings.</p>

          <SettingsSection title="Account" icon={User}>
            <SettingRow 
              label="Public Profile" 
              description="Allow others to see your watch lists and reviews."
              action={<Switch defaultChecked />}
            />
             <SettingRow 
              label="Data Usage" 
              description="Reduce data usage on cellular networks."
              action={<Switch />}
            />
          </SettingsSection>

          <SettingsSection title="Notifications" icon={Bell}>
             <SettingRow 
              label="Email Notifications" 
              description="Receive weekly newsletters and new arrival alerts."
              action={<Switch defaultChecked />}
            />
             <SettingRow 
              label="Push Notifications" 
              description="Get instant alerts for new episodes."
              action={<Switch defaultChecked />}
            />
          </SettingsSection>

          <SettingsSection title="Playback & Language" icon={Globe}>
             <SettingRow 
              label="Autoplay" 
              description="Automatically play the next episode."
              action={<Switch defaultChecked />}
            />
            <SettingRow 
              label="Default Subtitles" 
              description="Always show subtitles when available."
              action={<Switch />}
            />
          </SettingsSection>

          <div className="flex justify-end gap-4">
            <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">Cancel</Button>
            <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">Save Changes</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;