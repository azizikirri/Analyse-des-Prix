import React from 'react';

const PriceResults = ({ results, onDownload }) => {
  return (
    <div className="mt-8 md:mt-0 ">
      <u className='text-orange-700 font-bold mb-2'><h2 className="text-2xl font-bold mb-4 text-center text-red-900">Résultats du Calcul</h2></u>
      <div className="mb-4">
        <p className="text-orange-700 font-bold mb-2 ">Moyenne: {results.moyenne.toFixed(2)} DH</p>
        <p className="text-orange-700 font-bold mb-2 ">Prix de référence: {results.referencePrice.toFixed(2)} DH</p>
        <p className="text-orange-700 font-bold mb-2 ">Valeur Minimale Choisie:<i>{results.lowerThreshold}%</i> </p>
      </div>
      <div >
        <h3 className="text-xl font-bold mb-2 ">Prix plus grands que le prix de référence:</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base border border-collapse">Prix (DH)</th>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base">Nom Société</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.greaterThanReference.map((entry, index) => (
              <tr key={index}>
              <td className="py-2 px-8 sm:px-6 border border-collapse text-center">{entry.price.toFixed(2)}</td>
                <td className="py-2 px-3 text-center sm:px-6">{entry.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 ">
        <h3 className="text-xl font-bold mb-2">Prix plus petits ou égaux au prix de référence:</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base border border-collapse">Prix (DH)</th>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base  ">Nom Société</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.lessThanReference.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-3 text-center sm:px-6 border border-collapse">{entry.price.toFixed(2)}</td>
                <td className="py-2 text-center px-3 sm:px-6">{entry.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2 text-red-500">Prix invalides:</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 ">
            <tr >
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base border border-collapse text-red-500">Prix (DH)</th>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base text-red-500">Nom Société</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {results.invalidEntries.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-3 text-center sm:px-6 border border-collapse text-red-500">{entry.price.toFixed(2)}</td>
                <td className="py-2 px-3 text-center sm:px-6 text-red-500">{entry.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={onDownload}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Télécharger le Rapport
        </button>
      </div>
    </div>
  );
};

export default PriceResults;
