import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import SearchInput from "./components/SearchInput";
import SearchTabs from "./components/SearchTabs";
import UserResultCard from "./components/UserResultCard";
import TopicResultCard from "./components/TopicResultCard";
import SearchResultSkeleton from "./components/SearchResultSkeleton";
import {
  searchAll,
  searchTopics,
  getUserSuggestions,
  setSearchQuery,
  setSearchMode,
} from "@/features/search/searchSlice";

function Search() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { query, searchMode, topics, users, loading } = useSelector(
    (state) => state.search,
  );

  // Fetch data based on mode
  const fetchData = useCallback(
    (searchQuery, mode) => {
      if (mode === "users") {
        // User suggestions mode - no query needed
        dispatch(getUserSuggestions({ page: 1, perPage: 20 }));
      } else if (searchQuery.trim()) {
        if (mode === "all") {
          dispatch(searchAll({ query: searchQuery, page: 1 }));
        } else if (mode === "topics") {
          dispatch(searchTopics({ query: searchQuery }));
        }
      }
    },
    [dispatch],
  );

  // Handle search
  const handleSearch = useCallback(
    (searchQuery) => {
      dispatch(setSearchQuery(searchQuery));
      fetchData(searchQuery, searchMode);
    },
    [dispatch, searchMode, fetchData],
  );

  // Handle mode change
  const handleModeChange = useCallback(
    (mode) => {
      dispatch(setSearchMode(mode));
      fetchData(query, mode);
    },
    [dispatch, query, fetchData],
  );

  // Initial load for users mode (suggestions)
  useEffect(() => {
    window.scrollTo(0, 0);

    if (searchMode === "users" && users.length === 0) {
      dispatch(getUserSuggestions({ page: 1, perPage: 20 }));
    }
  }, [dispatch, searchMode, users.length]);

  // Render loading skeletons
  const renderLoading = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <SearchResultSkeleton
          key={index}
          type={searchMode === "topics" ? "topic" : "user"}
        />
      ))}
    </>
  );

  // Render topics
  const renderTopics = () => {
    if (topics.length === 0 && query && !loading) {
      return (
        <p className="text-center! text-muted-foreground! py-8!">
          {t("no_result")}
        </p>
      );
    }
    return (
      <div className="flex flex-col gap-1 divide-y! divide-border! h-[calc(100%-110px)]! md:h-[calc(100%-130px)]!">
        <div className="h-full! overflow-y-auto!">
          {topics.map((topic) => (
            <TopicResultCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    );
  };

  // Render users
  const renderUsers = () => {
    if (users.length === 0 && !loading) {
      return (
        <p className="text-center! text-muted-foreground! py-8!">
          {t("no_result")}
        </p>
      );
    }
    return (
      <div className="flex flex-col gap-1 divide-y! divide-border! h-[calc(100%-110px)]! md:h-[calc(100%-130px)]!">
        <div className="h-full! overflow-y-auto!">
          {users.map((user) => (
            <UserResultCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    );
  };

  // Render results based on mode
  const renderResults = () => {
    if (loading) return renderLoading();

    switch (searchMode) {
      case "topics":
        return renderTopics();
      case "users":
        return renderUsers();
      default: {
        // Show both topics and users
        const hasTopics = topics.length > 0;
        const hasUsers = users.length > 0;

        if (!hasTopics && !hasUsers && query) {
          return (
            <p className="text-center text-muted-foreground py-8">
              {t("no_result")}
            </p>
          );
        }

        return (
          <div className="flex flex-col gap-1 divide-y! divide-border! h-[calc(100%-110px)]! md:h-[calc(100%-130px)]!">
            {hasTopics && (
              <h3 className="px-4! py-2! text-sm! font-semibold! text-muted-foreground!">
                {t("topics")}
              </h3>
            )}
            {hasUsers && (
              <h3 className="px-4! py-2! text-sm! font-semibold! text-muted-foreground!">
                {t("users")}
              </h3>
            )}
            <div className="h-full! overflow-y-auto!">
              {hasTopics && (
                <div className="">
                  {topics.slice(0, 3).map((topic) => (
                    <TopicResultCard key={topic.id} topic={topic} />
                  ))}
                </div>
              )}
              {hasUsers && (
                <div className="">
                  {users.map((user) => (
                    <UserResultCard key={user.id} user={user} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div
      id="Search"
      className="w-full md:w-[calc(100%-50px)] max-w-[700px]! h-full! flex justify-center px-6! md:px-0!"
    >
      <div className="w-full! h-full md:min-w-[380px]">
        <SearchInput
          value={query}
          onChange={(val) => dispatch(setSearchQuery(val))}
          onSearch={handleSearch}
        />

        <SearchTabs activeMode={searchMode} onChange={handleModeChange} />

        {renderResults()}
      </div>
    </div>
  );
}

export default Search;
