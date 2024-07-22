import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PriceForm = ({ onCalculate }) => {
  const [estimation, setEstimation] = useState('');
  const [entries, setEntries] = useState([{ name: '', price: '' }]);
  const [minPercentage, setMinPercentage] = useState(20); // 20% by default

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { name: '', price: '' }]);
  };

  const removeEntry = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prices = entries.map(entry => parseFloat(entry.price)).filter(price => !isNaN(price));
    const names = entries.map(entry => entry.name);
    onCalculate(estimation, prices, names, minPercentage);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <label className="mr-2 font-bold text-lg" htmlFor="estimation" >Estimation:</label>
        <input
          type="number"
          id="estimation"
          required
          value={estimation}
          onChange={(e) => setEstimation(e.target.value)}
          className="border border-gray-300 hover:border-blue-500 focus:border-green-500 p-2 rounded w-full sm:w-1/2"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2 font-bold text-lg" htmlFor="fixedPercentage">Valeur Maximale Fixe (20%):</label>
        <input
          type="text"
          id="fixedPercentage"
          value="20%"
          disabled
          className="border border-gray-300 bg-gray-100 p-2 rounded w-full sm:w-1/2"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2 font-bold text-lg" htmlFor="minPercentage">Valeur Minimale (20% ou 25%):</label>
        <select
          id="minPercentage"
          value={minPercentage}
          onChange={(e) => setMinPercentage(parseInt(e.target.value))}
          className="border border-gray-300 hover:border-blue-500 focus:border-green-500 p-2 rounded w-full sm:w-1/2"
        >
          <option value={20}>20%</option>
          <option value={25}>25%</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base border border-collapse">Nom Société</th>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base">Prix (DH)</th>
              <th className="py-2 px-3 sm:px-6 text-sm sm:text-base"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {entries.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-3 sm:px-6 border border-collapse">
                  <input
                    type="text"
                    required
                    value={entry.name}
                    onChange={(e) => handleEntryChange(index, 'name', e.target.value)}
                    className="border border-gray-300 hover:border-blue-500 focus:border-green-500 p-2 rounded w-full"
                  />
                </td>
                <td className="py-2 px-3 sm:px-6">
                  <input
                    type="number"
                    required
                    value={entry.price}
                    onChange={(e) => handleEntryChange(index, 'price', e.target.value)}
                    className="border border-gray-300 hover:border-blue-500 focus:border-green-500 p-2 rounded w-full"
                  />
                </td>
                <td className="py-2 px-3 sm:px-6">
                  <button
                    type="button"
                    onClick={() => removeEntry(index)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addEntry}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Ajouter une entrée
        </button>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Calculer</button>
      </div>
    </form>
  );
};

export default PriceForm;
