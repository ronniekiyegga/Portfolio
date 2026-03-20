"use client";
import ImagesBadge from "@/app/components/ui/images-badge";

const PROJECT_IMAGES = [
  "/images/projects/edufeedbackpro/numerix-ai/NUMERIX_AI.svg",
  "/images/projects/edufeedbackpro/DMI.svg",
  "/images/projects/knn-classifier/google-teachable/GOOGLE_TEACHABLE.svg",
];

export default function ImageBadgeFolder() {
  return (
    <span className="inline-flex items-center align-middle ">
      <ImagesBadge
        text=""
        images={PROJECT_IMAGES}
        folderSize={{ width: 23, height: 16 }}
        teaserImageSize={{ width: 16, height: 8 }}
        hoverImageSize={{ width: 34, height: 24 }}
        hoverTranslateY={-22}
        hoverSpread={20}
      />
    </span>
  );
}
