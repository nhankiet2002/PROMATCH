import { useState } from "react";
import { recommendedUsers, teamPosts } from "@db/teamfinder";
import RecommendedCard from "@components/teamfinder/RecommendedCard";
import TeamPostCard from "@components/teamfinder/TeamPostCard";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* AI Recommended Section */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-600 text-white text-sm font-semibold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            AI Recommended for you
          </span>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recommendedUsers.map((user) => (
            <RecommendedCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* Team Posts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Team Posts
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {teamPosts.length} opportunities
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {teamPosts.map((post) => (
            <TeamPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
