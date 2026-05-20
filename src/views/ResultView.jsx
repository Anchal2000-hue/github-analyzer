import ProfileCard from "../components/ProfileCard";
import PersonalityCard from "../components/PersonalityCard";
import LanguageChart from "../components/LanguageChart";
import ActivityChart from "../components/ActivityChart";
import StatsRow from "../components/StatsRow";
import TopRepos from "../components/TopRepos";
import "../styles/result.css";

export default function ResultView({ data }) {
  const { user, repos, languages, activity, personality } = data;

  return (
    <div className="result-view fade-up">
      <div className="result-top">
        <ProfileCard user={user} />
        <PersonalityCard personality={personality} />
      </div>

      <StatsRow user={user} repos={repos} />

      <div className="result-mid">
        <LanguageChart languages={languages} />
        <ActivityChart activity={activity} />
      </div>

      <TopRepos repos={repos} />
    </div>
  );
}
