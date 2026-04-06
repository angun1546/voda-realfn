import { useState } from "react";
import { useParams } from "react-router";
import { EP } from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import Hero from "../components/Hero";
import Synopsis from "../components/Synopsis-ls";
import CastSection from "../components/CastSection";
import ScoreSummary from "../components/ScoreSummary";
import ReviewCardS from "../components/ReviewCardS";
import Feed from "../components/Feed";
import EpisodeSection from "../components/EpisodeSection";
import useUI from "../hooks/useUI";
import { getTmdbLang } from "../utils/settings";

const AboutPage = () => {
  const ui = useUI();
  const { type, id } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [activeSeason, setActiveSeason] = useState(1);

  const { data, loading, err } = useFetch(() => EP.detail(type, id), [type, id]);
  const { data: enReviewsData } = useFetch(() => EP.reviews(type, id, "en-US"), [type, id]);

  const isTv = type === "tv";
  const { data: seasonData } = useFetch(
    isTv ? () => EP.season(id, activeSeason) : null,
    [isTv, id, activeSeason],
  );

  if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-zinc-400">{ui.loading}</div>;
  if (err || !data) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-red-500">{ui.fetchError || 'Error'}</div>;

  const combinedReviews = [...(data.reviews?.results || []), ...(enReviewsData?.results || [])];
  const uniqueReviews = combinedReviews.filter((r, idx, self) => idx === self.findIndex((t) => t.id === r.id));

  return (
    <main className="bg-neutral-950 min-h-screen pb-20">
      <Hero type="detail" id={id} title={data.title || data.name} backdrop={data.backdrop_path} overview={data.overview} rating={data.vote_average} videos={data.videos?.results} />

      <div className="px-20 space-y-16 mt-12">
        <div id="synopsis">
          <Synopsis
            overview={data.overview}
            genres={data.genres}
            country={data.production_countries?.[0]?.name}
            year={(data.release_date || data.first_air_date)?.slice(0, 4)}
            runtime={data.runtime || (data.episode_run_time && data.episode_run_time[0])}
            director={data.credits?.crew?.find((c) => c.job === "Director")}
            company={data.production_companies?.[0]?.name}
            cast={data.credits?.cast?.slice(0, 5).map((c) => c.name)}
          />
        </div>

        <CastSection cast={data.credits?.cast?.slice(0, 10)} />

        {isTv && seasonData && (
          <EpisodeSection episodes={seasonData.episodes} seasons={data.seasons} activeSeason={activeSeason} onSeasonChange={(num) => setActiveSeason(num)} showTitle={true} />
        )}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-6">
          <div className="lg:col-span-1 flex flex-col justify-start">
            <ScoreSummary avg={data.vote_average} count={data.vote_count} reviews={uniqueReviews} />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            {(showAll ? uniqueReviews : uniqueReviews.slice(0, 2)).map((review) => (
              <ReviewCardS
                key={review.id}
                author={review.author}
                avatar={EP.img(review.author_details?.avatar_path, "w200")}
                date={new Date(review.created_at).toLocaleDateString(getTmdbLang())}
                rating={review.author_details?.rating}
                content={review.content}
              />
            ))}

            {uniqueReviews.length > 2 && (
              <button onClick={() => setShowAll(!showAll)} className="w-full py-5 rounded-4xl border border-white/5 bg-zinc-900/50 text-zinc-400 font-serif text-lg hover:bg-zinc-900 hover:text-primary-400 transition-all cursor-pointer">
                {showAll ? ui.profileHideReviews : ui.profileMoreReviews}
              </button>
            )}

            {uniqueReviews.length === 0 && (
              <div className="bg-zinc-900/30 rounded-4xl p-20 text-center border border-white/5 h-full flex items-center justify-center">
                <p className="text-zinc-500 text-xl font-serif">{ui.detailNoReviews}</p>
              </div>
            )}
          </div>
        </section>

        <Feed type="normal" title={ui.detailSimilar} items={data.similar?.results?.map((item) => ({ ...item, type }))} />
      </div>
    </main>
  );
};

export default AboutPage;
