import UserAvatar from "./UserAvatar";

const RecommendedCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-[var(--widget)] rounded-2xl p-5 min-w-[260px] max-w-[280px] flex flex-col shadow-sm border border-gray-100 dark:border-gray-700 snap-start">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <UserAvatar name={user.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white truncate">
              {user.name}
            </h3>
            <span className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 whitespace-nowrap">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
              </svg>
              {user.matchPercent}%
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {user.major}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {user.level}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
        {user.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action */}
      <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
        Invite to Team
      </button>
    </div>
  );
};

export default RecommendedCard;
