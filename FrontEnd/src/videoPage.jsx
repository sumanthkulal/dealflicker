import React, { useState } from 'react';
import {
  Heart,
  Users,
  Eye,
  Share,
  ShoppingBag,
  MoreHorizontal,
  Play
} from 'lucide-react';

export default function ProductLandingPage() {
  const [isLiked, setIsLiked] = useState(false);

  const videoData = {
    title: "Technology continues to evolve rapidly, shaping how we live, work, and communicate. Innovation drives progress, enabling people worldwide to connect, share knowledge, and build brighter futures.",
    brandName: "GlobalTech Solutions",
    subscribers: "2.4M",
    views: "847K",
    likes: "12K",
    uploadTime: "2 days ago",
    description: "Learn advanced React patterns including render props, compound components, and performance optimization techniques that will make your applications faster and more maintainable. patterns including render props, compound components, and performance optimization techniques that will make your applications faster and more maintainable",
    youtubeVideoId: "N1S6_I-d6sM"
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen pt-4 pl-8">
      {/* Main Container for Video + Vertical Up Next */}
      <div className="flex gap-6">
        {/* Main Content Section (Video and Description) */}
        <div className="flex flex-col gap-4">
          {/* Video Player Container */}
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20"
            style={{ width: '1050px', height: '540px' }}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/oZkym6kLGX4?si=89haz6C61-2k8PO7"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info and Actions Section */}
          <div className="p-4" style={{ width: '1050px' }}>
            {/* Main Content */}
            <div className="mb-8">
              {/* Video Title and Views/Time */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h1 className="text-xl font-bold mb-2 sm:mb-0">{videoData.title}</h1>
                <div className="flex items-center text-gray-400 text-sm space-x-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {videoData.views} views
                  </span>
                  <span>•</span>
                  <span>{videoData.uploadTime}</span>
                </div>
              </div>
              
              {/* Brand Info, Follow Button, and Actions */}
              <div className="flex items-center justify-between gap-4 mb-4">
                {/* Brand Info and Follow Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-slate-800/50 to-purple-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      GS
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{videoData.brandName}</h3>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {videoData.subscribers} followers
                      </p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                    Follow
                  </button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Heart Like */}
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:bg-purple-700/50 transition-all duration-300 shadow-lg text-sm ${
                      isLiked ? 'text-red-400' : ''
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke={isLiked ? 'currentColor' : 'white'} />
                    <span>{videoData.likes}</span>
                  </button>

                  {/* Share */}
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 shadow-lg text-sm">
                    <Share className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>

                  {/* Buy Now */}
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">Buy Now</span>
                  </button>

                  {/* More */}
                  <button className="p-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 shadow-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/10 rounded-xl p-4">
                <p className="text-gray-300 leading-relaxed">
                  {videoData.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Up Next Section */}
        <div className="flex-grow p-6 pt-4">
          <h3 className="text-lg font-semibold mb-4">Up next</h3>
          <div className="flex flex-col gap-4 overflow-y-auto pb-4 scrollbar-hide">
            {[1, 2].map((i) => (
              <div key={i} className="flex-shrink-0 w-full bg-gradient-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/10 rounded-lg p-3 hover:from-purple-700/30 hover:to-pink-700/20 cursor-pointer transition-all duration-300">
                <div className="w-full h-44 bg-gradient-to-br from-slate-700 to-purple-700/50 rounded flex items-center justify-center mb-3">
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm line-clamp-2 mb-2">
                    Advanced JavaScript Concepts You Need to Know - Part {i}
                  </h4>
                  <p className="text-gray-400 text-xs mb-1">CodeAcademy Pro</p>
                  <p className="text-gray-400 text-xs">234K views • 1 week ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Up Next Section - NEW */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">You might also like</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 bg-gradient-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/10 rounded-lg p-3 hover:from-purple-700/30 hover:to-pink-700/20 cursor-pointer transition-all duration-300">
              <div className="w-full h-44 bg-gradient-to-br from-slate-700 to-purple-700/50 rounded flex items-center justify-center mb-3">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-2 mb-2">
                  Advanced JavaScript Concepts You Need to Know - Part {i}
                </h4>
                <p className="text-gray-400 text-xs mb-1">CodeAcademy Pro</p>
                <p className="text-gray-400 text-xs">234K views • 1 week ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}