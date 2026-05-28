import { QuestionScreen } from "@/components/recommendation-flow/QuestionScreen";
import { SiteShell } from "@/components/layout/SiteShell";
import { giftQuestions } from "@/data/recommendationFlow";

export default function GiftRecommendationPage() {
  return (
    <SiteShell>
      <QuestionScreen
        flow="gift"
        questions={giftQuestions}
        intro="för någon annan"
      />
    </SiteShell>
  );
}
