// Form.js
import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsUpdate }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const isSubmitDisabled =
    formData.selectedPreferences.length === 0 ||
    formData.selectedFeatures.length === 0 ||
    !formData.selectedRecommendationType;

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) {
      return;
    }

    const dataRecommendations = getRecommendations(formData);

    if (onRecommendationsUpdate) {
      onRecommendationsUpdate(dataRecommendations);
    }
  };

  return (
    <form
      className="w-full p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      {isSubmitDisabled && (
        <div className="text-red-600 text-sm mb-4">
          Por favor, selecione ao menos uma funcionalidade, uma preferência e um
          tipo de recomendação para habilitar o botão.
        </div>
      )}
      <SubmitButton disabled={isSubmitDisabled} text="Obter recomendação" />
    </form>
  );
}

export default Form;
