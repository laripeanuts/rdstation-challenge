// Form.js

import { useMemo, useState } from "react";

import { useForm, useProducts, useRecommendations } from "../../hooks";
import { validateFormData } from "../../validators";
import { Features, Preferences, RecommendationType } from "./Fields";
import SubmitButton from "./SubmitButton/SubmitButton.jsx";

function Form({
  onRecommend,
  onPreferencesChange,
  onFeaturesChange,
  onLoadingChange,
}) {
  const { preferences, features, products } = useProducts();
  const { getRecommendations } = useRecommendations(products);
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const hasAnySelection = useMemo(
    () =>
      formData.selectedPreferences.length > 0 ||
      formData.selectedFeatures.length > 0,
    [formData.selectedPreferences, formData.selectedFeatures]
  );

  const handleTogglePreference = (preference) => {
    const current = formData.selectedPreferences;
    const updated = current.includes(preference)
      ? current.filter((p) => p !== preference)
      : [...current, preference];
    handleChange("selectedPreferences", updated);
    if (onPreferencesChange) {
      onPreferencesChange(updated);
    }
  };

  const handleToggleFeature = (feature) => {
    const current = formData.selectedFeatures;
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    handleChange("selectedFeatures", updated);
    if (onFeaturesChange) {
      onFeaturesChange(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateFormData(formData);

    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    setIsLoading(true);
    if (onLoadingChange) {
      onLoadingChange(true);
    }

    // Simulate a delay to mimic a real API call delay and show a loading state for testing purposes
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const dataRecommendations = getRecommendations(formData);

      if (onRecommend) {
        onRecommend(dataRecommendations);
      }
    } finally {
      setIsLoading(false);
      if (onLoadingChange) {
        onLoadingChange(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onTogglePreference={handleTogglePreference}
      />

      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onToggleFeature={handleToggleFeature}
      />

      <RecommendationType
        selectedRecommendationType={formData.selectedRecommendationType}
        onChange={(value) => handleChange("selectedRecommendationType", value)}
      />

      <SubmitButton
        isLoading={isLoading}
        disabled={
          isLoading || !hasAnySelection || !formData.selectedRecommendationType
        }
      />
    </form>
  );
}

export default Form;
