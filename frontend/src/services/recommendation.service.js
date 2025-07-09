// getRecommendations.js

/**
 * Prepara os produtos com pontuação de acordo com as preferências e características selecionadas
 * @param {Object} product - Produto RD Station
 * @param {Array} selectedPreferences - Preferências selecionadas pelo usuário
 * @param {Array} selectedFeatures - Funcionalidades selecionadas pelo usuário
 * @returns {Object} Produto, incluíndo sua pontuação total
 */
const scoreProduct = (product, selectedPreferences, selectedFeatures) => {
  const preferenceMatches = selectedPreferences.filter((preference) =>
    product.preferences.includes(preference)
  ).length;
  const featureMatches = selectedFeatures.filter((feature) =>
    product.features.includes(feature)
  ).length;

  return {
    product,
    totalScore: preferenceMatches + featureMatches,
  };
};

/**
 * Ordena por pontuação (maior para menor).
 * Em caso de empate, prioriza o produto com maior ID.
 * @param {Object} x - Produto X
 * @param {Object} y - Produto Y
 */
const sortByScoreAndId = (x, y) => {
  if (x.totalScore !== y.totalScore) {
    return y.totalScore - x.totalScore;
  }
  return Number(y.product.id) - Number(x.product.id);
};

/**
 * Gera recomendações de produtos com base nas preferências e funcionalidades do usuário.
 * @param {Object} formData - Dados do formulário (preferências, funcionalidades e tipo)
 * @param {Array} products - Lista de produtos RD Station
 * @returns {Array} Lista com 1 ou mais produtos recomendados de acordo com o tipo de
 * recomendação selecionado
 */
const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const selectedPreferences = formData.selectedPreferences || [];
  const selectedFeatures = formData.selectedFeatures || [];
  const selectedRecommendationType =
    formData.selectedRecommendationType || 'SingleProduct';

  const validProducts = products
    .map((product) =>
      scoreProduct(product, selectedPreferences, selectedFeatures)
    )
    .filter((productScores) => productScores.totalScore > 0)
    .sort(sortByScoreAndId);

  if (selectedRecommendationType === 'SingleProduct') {
    return [validProducts[0].product];
  } else {
    return validProducts.map((item) => item.product);
  }
};

export default { getRecommendations };
