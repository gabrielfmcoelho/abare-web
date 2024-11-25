// src/components/FeatureList.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileAlt, faCommentDots, faClock } from "@fortawesome/free-solid-svg-icons";
import { TEXT } from "@/app/texts";

const features = [
  { icon: faEye, label: TEXT.description.features.realTimeMonitoring },
  { icon: faFileAlt, label: TEXT.description.features.personalizedReports },
  { icon: faCommentDots, label: TEXT.description.features.facilitatedCommunication },
  { icon: faClock, label: TEXT.description.features.anytimeAccess },
];

const FeatureList: React.FC = () => (
  <div className="grid grid-cols-2 gap-8">
    {features.map((feature, index) => (
      <div key={index} className="flex flex-row items-center justify-center space-x-4">
        <FontAwesomeIcon icon={feature.icon} className="text-[#23a4c5] w-5 h-5" />
        <p className="font-semibold text-sm">{feature.label}</p>
      </div>
    ))}
  </div>
);

export default FeatureList;
