import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType } from 'docx';
import PriceForm from './Components/PriceForm';
import PriceResults from './Components/PriceResults';

const App = () => {
  const [results, setResults] = useState(null);

  const handleCalculate = (estimation, prices, names, lowerThreshold) => {
    const lowerThresholdPercentage = lowerThreshold / 100;

    const validEntries = prices
      .map((price, index) => ({ price, name: names[index] }))
      .filter(entry => {
        const referencePrice = estimation;
        return entry.price <= referencePrice * 1.25 && entry.price >= referencePrice * (1 - lowerThresholdPercentage);
      });

    if (validEntries.length === 0) {
      setResults(null);
      return;
    }

    const moyenne = validEntries.reduce((sum, entry) => sum + entry.price, 0) / validEntries.length;
    const referencePrice = (Number(estimation) + moyenne) / 2;

    const greaterThanReference = validEntries
      .filter(entry => entry.price > referencePrice)
      .sort((a, b) => b.price - a.price);

    const lessThanReference = validEntries
      .filter(entry => entry.price <= referencePrice)
      .sort((a, b) => b.price - a.price);

    const invalidEntries = prices
      .map((price, index) => ({ price, name: names[index] }))
      .filter(entry => entry.price > Number(estimation) * 1.25 || entry.price < Number(estimation) * (1 - lowerThresholdPercentage));

    setResults({
      referencePrice,
      moyenne,
      greaterThanReference,
      lessThanReference,
      invalidEntries,
      lowerThreshold,
    });
  };

  const handleDownload = () => {
    if (results) {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Moyenne : ${results.moyenne.toFixed(2)} DH`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Prix de référence : ${results.referencePrice.toFixed(2)} DH`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Valeur Minimale Choisie : ${results.lowerThreshold}%`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Prix plus grands que le prix de référence:',
                    bold: true,
                    color: '0000FF',
                    size: 28,
                  }),
                ],
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph('Prix (DH)')],
                        shading: { fill: 'E0E0E0' },
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph('Institution')],
                        shading: { fill: 'E0E0E0' },
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                  ...results.greaterThanReference.map(entry =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph(entry.price.toFixed(2))] }),
                        new TableCell({ children: [new Paragraph(entry.name)] }),
                      ],
                    })
                  ),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Prix plus petits ou égaux au prix de référence:',
                    bold: true,
                    color: '0000FF',
                    size: 28,
                  }),
                ],
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph('Prix (DH)')],
                        shading: { fill: 'E0E0E0' },
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph('Institution')],
                        shading: { fill: 'E0E0E0' },
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                  ...results.lessThanReference.map(entry =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph(entry.price.toFixed(2))] }),
                        new TableCell({ children: [new Paragraph(entry.name)] }),
                      ],
                    })
                  ),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Prix invalides:',
                    bold: true,
                    color: 'FF0000',
                    size: 28,
                  }),
                ],
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph('Prix (DH)')],
                        shading: { fill: 'E0E0E0' },
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph('Institution')],
                        shading: { fill: 'E0E0E0' },
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                  ...results.invalidEntries.map(entry =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph(entry.price.toFixed(2))] }),
                        new TableCell({ children: [new Paragraph(entry.name)] }),
                      ],
                    })
                  ),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'Prix_Analyse.docx');
      });
    }
  };

  return (
    <div className="App bg-cyan-50 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Analyse des Prix</h1>
      <div className="bg-slate-300 p-4 rounded-lg shadow-md  w-[100%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <PriceForm onCalculate={handleCalculate} />
        {results && <PriceResults results={results} onDownload={handleDownload} />}
      </div>
    </div>
  );
};

export default App;
