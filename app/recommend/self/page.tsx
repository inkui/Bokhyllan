import { QuestionScreen } from "@/components/recommendation-flow/QuestionScreen";
import { SiteShell } from "@/components/layout/SiteShell";
import { selfQuestions } from "@/data/recommendationFlow";

export default function SelfRecommendationPage() {
  return (
    <SiteShell>
      <QuestionScreen
        flow="self"
        questions={selfQuestions}
        intro="för dig själv"
      />
    </SiteShell>
  );
}
