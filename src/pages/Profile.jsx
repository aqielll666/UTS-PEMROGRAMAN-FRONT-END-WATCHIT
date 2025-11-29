import React from 'react';
import { Helmet } from 'react-helmet';
import { User, Edit2, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { toast } = useToast();

  const handleEdit = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing is currently disabled in demo mode.",
    });
  };

  return (
    <>
      <Helmet>
        <title>My Profile - Watch It</title>
      </Helmet>
      <div className="min-h-screen bg-black pt-24 px-4 md:px-8 lg:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          <div className="h-48 md:h-64 rounded-xl bg-gradient-to-r from-emerald-900 to-black relative overflow-hidden">
             <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-4 md:px-8 -mt-12 md:-mt-16 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-800 border-4 border-black flex items-center justify-center overflow-hidden shadow-2xl">
                <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
              </div>
              
              <div className="flex-1 pt-2 md:pt-0 space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Demo User</h1>
                <p className="text-emerald-500 font-medium">@demouser • Premium Member</p>
              </div>

              <Button onClick={handleEdit} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10">
                <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-emerald-500">watchit.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Joined January 2025</span>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xl font-bold text-white">142</div>
                    <div className="text-xs text-gray-500">Movies Watched</div>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xl font-bold text-white">48</div>
                    <div className="text-xs text-gray-500">Reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">About</h3>
                <p className="text-gray-400 leading-relaxed">
                  Movie enthusiast and sci-fi lover. Always looking for the next great space opera or mind-bending thriller.
                </p>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {['Sci-Fi', 'Thriller', 'Action', 'Documentary', 'Cyberpunk'].map(genre => (
                    <span key={genre} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;