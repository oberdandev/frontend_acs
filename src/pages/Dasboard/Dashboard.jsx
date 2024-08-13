import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faImage, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PageFormManager() {
    const [selectedCharts, setSelectedCharts] = useState({
        chart1: true,
        chart2: true,
        chart3: true,
    });

    const data1 = {
        labels: ['18 a 30 anos', '31 a 40 anos', 'Acima de 40 anos'],
        datasets: [{
            label: 'Faixa Etária',
            data: [15, 8, 50],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };

    const data2 = {
        labels: ['Alvenaria', 'Madeira', 'Blocos de Concreto'],
        datasets: [{
            label: 'Imóveis Visitados',
            data: [200, 150, 300],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const data3 = {
        labels: ['Grupo A', 'Grupo B', 'Grupo C'],
        datasets: [{
            label: 'Checklist Implantados',
            data: [500, 300, 200],
            backgroundColor: [
                'rgba(128, 128, 128, 0.2)',
                'rgba(169, 169, 169, 0.2)',
                'rgba(211, 211, 211, 0.2)'
            ],
            borderColor: [
                'rgba(128, 128, 128, 1)',
                'rgba(169, 169, 169, 1)',
                'rgba(211, 211, 211, 1)'
            ],
            borderWidth: 1
        }]
    };

    const handleCheckboxChange = (event) => {
        setSelectedCharts({
            ...selectedCharts,
            [event.target.name]: event.target.checked,
        });
    };

    const saveAsPDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        const charts = [
            { id: 'Grafico-Faixa-Etaria', selected: selectedCharts.chart1 },
            { id: 'Grafico-Imoveis', selected: selectedCharts.chart2 },
            { id: 'Grafico-Checklist-Implantados', selected: selectedCharts.chart3 }
        ];

        const promises = charts.map((chart, index) => {
            if (chart.selected) {
                return html2canvas(document.getElementById(chart.id)).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 210;
                    const imgHeight = canvas.height * imgWidth / canvas.width;

                    if (index > 0) {
                        pdf.addPage();
                        position = 0;
                    }

                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                });
            }
            return Promise.resolve();
        });

        Promise.all(promises).then(() => {
            pdf.save('dashboard.pdf');
        });
    };

    const saveAsImagesZip = () => {
        const zip = new JSZip();
        const charts = [
            { id: 'Grafico-Faixa-Etaria', selected: selectedCharts.chart1 },
            { id: 'Grafico-Imoveis', selected: selectedCharts.chart2 },
            { id: 'Grafico-Checklist-Implantados', selected: selectedCharts.chart3 }
        ];

        const promises = charts.map(chart => {
            if (chart.selected) {
                return html2canvas(document.getElementById(chart.id)).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgName = `${chart.id}.png`;
                    zip.file(imgName, imgData.split('base64,')[1], { base64: true });
                });
            }
            return Promise.resolve();
        });

        Promise.all(promises).then(() => {
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, 'tabelas-Form-ACS.zip');
            });
        });
    };

    const exportToCSV = () => {
        let combinedData = [];
        
        // Function to format data for CSV
        const formatDataForCSV = (data, label) => {
            return data.labels.map((label, index) => ({
                Categoria: label,
                Valor: data.datasets[0].data[index],
                Tipo: label
            }));
        };

        if (selectedCharts.chart1) {
            combinedData = combinedData.concat(formatDataForCSV(data1, 'Faixa Etária'));
        }
        if (selectedCharts.chart2) {
            combinedData = combinedData.concat(formatDataForCSV(data2, 'Imóveis Visitados'));
        }
        if (selectedCharts.chart3) {
            combinedData = combinedData.concat(formatDataForCSV(data3, 'Checklist Implantados'));
        }

        const csv = Papa.unparse(combinedData, {
            header: true,
            columns: ["Categoria", "Valor", "Tipo"]
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'dados.csv');
    };

    return (
        <div className='grid w-full min-h-screen h-full' style={{ 'gridTemplateRows': 'auto' }} id="dashboard">
            <h1 className="text-center" style={{ fontSize: '2.5rem' }}>Dashboard</h1>
            <div className='flex flex-wrap gap-4 mt-4 ml-4'>
                <div className='w-full md:w-1/3' id="Grafico-Faixa-Etaria">
                    <h2>
                        <input 
                            type="checkbox" 
                            name="chart1" 
                            checked={selectedCharts.chart1} 
                            onChange={handleCheckboxChange}
                        /> Faixa Etária
                    </h2>
                    <Bar data={data1} />
                </div>
                <div className='w-full md:w-1/3' id="Grafico-Imoveis">
                    <h2>
                        <input 
                            type="checkbox" 
                            name="chart2" 
                            checked={selectedCharts.chart2} 
                            onChange={handleCheckboxChange}
                        /> Imóveis Visitados
                    </h2>
                    <Bar data={data2} />
                </div>
                <div className='w-full md:w-1/3' id="Grafico-Checklist-Implantados">
                    <h2>
                        <input 
                            type="checkbox" 
                            name="chart3" 
                            checked={selectedCharts.chart3} 
                            onChange={handleCheckboxChange}
                        /> Checklist Implantados
                    </h2>
                    <Bar data={data3} />
                </div>
            </div>
            <div className='text-center mt-4'>
                <button 
                    onClick={saveAsPDF} 
                    style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px' }} />
                    Salvar como PDF
                </button>
                <button 
                    onClick={saveAsImagesZip} 
                    style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px' }} />
                    Salvar Imagens (ZIP)
                </button>
                <button 
                    onClick={exportToCSV} 
                    style={{ backgroundColor: '#FF9800', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faFileCsv} style={{ marginRight: '8px' }} />
                    Exportar Dados (CSV)
                </button>
            </div>
        </div>
    );
}
