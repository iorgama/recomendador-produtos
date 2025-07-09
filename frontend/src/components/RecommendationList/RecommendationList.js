import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">Nenhuma recomendação encontrada.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700 font-medium">
              {recommendation.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendationList;
