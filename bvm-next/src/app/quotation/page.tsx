"use client";
import { useState, useRef } from 'react';
import {
    FileText, Phone, Mail, MapPin, Printer, Plus, Trash2, ChevronDown, Settings, Building, Info, FileSpreadsheet
} from 'lucide-react';
import { products } from '@/data/products';

interface QuotationItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

interface QuotationFormData {
    clientName: string;
    clientCompany: string;
    clientAddress: string;
    clientPhone: string;
    clientEmail: string;

    quotationNumber: string;
    quotationDate: string;
    validUntil: string;

    productName: string;
    projectScope: string;
    modelNumber: string;

    productionApp: string;
    fillVolume: string;
    containerType: string;
    mouldMaterial: string;
    productOutput: string;
    packagingMaterial: string;
    productCharacteristics: string;

    items: QuotationItem[];
    notes: string;
}

const QuotationPage = () => {
    const printRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<QuotationFormData>({
        clientName: '',
        clientCompany: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',

        quotationNumber: `BVM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        quotationDate: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],

        productName: 'Automatic Form Fill Seal Machine',
        projectScope: 'Design, Manufacturing, Supply & Commissioning',
        modelNumber: 'BVM-FFS-9105',

        productionApp: 'IV FLUID / OPHTHALMIC',
        fillVolume: '100 ml - 500 ml',
        containerType: 'BOTTLE',
        mouldMaterial: 'ALUMINIUM BRONZE',
        productOutput: 'Approx. 4000 BPH',
        packagingMaterial: 'LDPE / PP',
        productCharacteristics: 'STERILE FREE FLOWING',

        items: [
            { id: '1', description: '', quantity: 1, unitPrice: 0 }
        ],
        notes: ''
    });

    const [showPreview, setShowPreview] = useState(false);
    const [activeTab, setActiveTab] = useState<'client' | 'specs' | 'pricing'>('client');

    const calculateSubtotal = () => formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const calculateGST = () => calculateSubtotal() * 0.18;
    const calculateTotal = () => calculateSubtotal() + calculateGST();

    const addItem = () => setFormData(prev => ({ ...prev, items: [...prev.items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 }] }));
    const removeItem = (id: string) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));
        }
    };

    const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
        setFormData(prev => ({ ...prev, items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item) }));
    };

    const handlePrint = () => window.print();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    return (
        <div className="page-container bg-gray-50 dark:bg-[#080d1a] min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8 pt-24">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Build Techno-Commercial Offer</h1>
                    <p className="text-gray-600 dark:text-bvm-gray">Generate an authoritative engineering proposal for your clients.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Tabs */}
                        <div className="flex bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-1">
                            <button
                                onClick={() => setActiveTab('client')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'client' ? 'bg-bvm-blue text-white' : 'text-gray-500 hover:text-gray-900 dark:text-bvm-gray dark:hover:text-white'}`}
                            >
                                <Building className="w-4 h-4" /> Client Info
                            </button>
                            <button
                                onClick={() => setActiveTab('specs')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'specs' ? 'bg-bvm-blue text-white' : 'text-gray-500 hover:text-gray-900 dark:text-bvm-gray dark:hover:text-white'}`}
                            >
                                <Settings className="w-4 h-4" /> Technical Specs
                            </button>
                            <button
                                onClick={() => setActiveTab('pricing')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'pricing' ? 'bg-bvm-blue text-white' : 'text-gray-500 hover:text-gray-900 dark:text-bvm-gray dark:hover:text-white'}`}
                            >
                                <FileSpreadsheet className="w-4 h-4" /> Pricing & Terms
                            </button>
                        </div>

                        <div className="card-dark p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl space-y-6 h-[75vh] overflow-y-auto custom-scrollbar">

                            {/* TAB: CLIENT INFO */}
                            {activeTab === 'client' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Quotation No.</label>
                                            <input type="text" value={formData.quotationNumber} onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })} className="form-input w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Date</label>
                                            <input type="date" value={formData.quotationDate} onChange={(e) => setFormData({ ...formData, quotationDate: e.target.value })} className="form-input w-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Client Company <span className="text-red-500">*</span></label>
                                        <input type="text" value={formData.clientCompany} onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })} className="form-input w-full" placeholder="Company Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Contact Person</label>
                                        <input type="text" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="form-input w-full" placeholder="Attn: Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Address</label>
                                        <textarea value={formData.clientAddress} onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })} rows={2} className="form-input w-full resize-none" placeholder="Full address" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Phone</label>
                                            <input type="tel" value={formData.clientPhone} onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })} className="form-input w-full" placeholder="+91..." />
                                        </div>
                                        <div>
                                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Email</label>
                                            <input type="email" value={formData.clientEmail} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} className="form-input w-full" placeholder="email" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: TECHNICAL SPECS */}
                            {activeTab === 'specs' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="bg-bvm-blue/10 dark:bg-bvm-blue/20 text-bvm-blue p-3 rounded-lg flex gap-2 text-sm mb-4">
                                        <Info className="w-5 h-5 shrink-0" />
                                        <p>These details populate the "Production / Application Details" section of the proposal.</p>
                                    </div>
                                    <div>
                                        <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Main Product Name</label>
                                        <input type="text" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="form-input w-full" placeholder="e.g. Form Fill Seal Machine" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Model Number</label>
                                            <input type="text" value={formData.modelNumber} onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })} className="form-input w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Project Scope</label>
                                            <input type="text" value={formData.projectScope} onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })} className="form-input w-full" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-white/10 space-y-4">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Application Params</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-600 dark:text-bvm-gray text-xs mb-1">Product/App</label>
                                                <input type="text" value={formData.productionApp} onChange={(e) => setFormData({ ...formData, productionApp: e.target.value })} className="form-input w-full text-sm py-2" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600 dark:text-bvm-gray text-xs mb-1">Fill Volume</label>
                                                <input type="text" value={formData.fillVolume} onChange={(e) => setFormData({ ...formData, fillVolume: e.target.value })} className="form-input w-full text-sm py-2" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600 dark:text-bvm-gray text-xs mb-1">Container Type</label>
                                                <input type="text" value={formData.containerType} onChange={(e) => setFormData({ ...formData, containerType: e.target.value })} className="form-input w-full text-sm py-2" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600 dark:text-bvm-gray text-xs mb-1">Mould Material</label>
                                                <input type="text" value={formData.mouldMaterial} onChange={(e) => setFormData({ ...formData, mouldMaterial: e.target.value })} className="form-input w-full text-sm py-2" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600 dark:text-bvm-gray text-xs mb-1">Output Rate</label>
                                                <input type="text" value={formData.productOutput} onChange={(e) => setFormData({ ...formData, productOutput: e.target.value })} className="form-input w-full text-sm py-2" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-600 dark:text-bvm-gray text-xs mb-1">Packaging Mat.</label>
                                                <input type="text" value={formData.packagingMaterial} onChange={(e) => setFormData({ ...formData, packagingMaterial: e.target.value })} className="form-input w-full text-sm py-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: PRICING */}
                            {activeTab === 'pricing' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Commercial Items</h3>
                                        <button onClick={addItem} className="flex items-center gap-1 text-bvm-blue hover:text-bvm-blue-dark text-xs font-semibold px-3 py-1 bg-bvm-blue/10 rounded-md">
                                            <Plus className="w-3 h-3" /> Add Item
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {formData.items.map((item) => (
                                            <div key={item.id} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3">
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-gray-600 dark:text-bvm-gray text-xs font-medium mb-1">Description</label>
                                                        <input type="text" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} placeholder="Main machinery or service..." className="form-input w-full py-2 text-sm" />
                                                    </div>
                                                    <div className="grid grid-cols-12 gap-3">
                                                        <div className="col-span-3">
                                                            <label className="block text-gray-600 dark:text-bvm-gray text-xs font-medium mb-1">Qty</label>
                                                            <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)} className="form-input w-full py-2 text-sm" />
                                                        </div>
                                                        <div className="col-span-7">
                                                            <label className="block text-gray-600 dark:text-bvm-gray text-xs font-medium mb-1">Unit Price (₹)</label>
                                                            <input type="number" min="0" value={item.unitPrice} onChange={(e) => updateItem(item.id, 'unitPrice', parseInt(e.target.value) || 0)} className="form-input w-full py-2 text-sm" />
                                                        </div>
                                                        <div className="col-span-2 flex items-end">
                                                            <button onClick={() => removeItem(item.id)} disabled={formData.items.length === 1} className="w-full h-[38px] flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20 disabled:opacity-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-white/10 space-y-2 text-sm">
                                        <div className="flex justify-between text-gray-600 dark:text-bvm-gray"><span>Subtotal Price</span><span>{formatCurrency(calculateSubtotal())}</span></div>
                                        <div className="flex justify-between text-gray-600 dark:text-bvm-gray"><span>GST (18%)</span><span>{formatCurrency(calculateGST())}</span></div>
                                        <div className="flex justify-between text-gray-900 dark:text-white font-bold text-base pt-2"><span>Total Commercial Base</span><span className="text-bvm-blue">{formatCurrency(calculateTotal())}</span></div>
                                    </div>

                                    <div className="pt-4">
                                        <label className="block text-gray-900 dark:text-white text-sm font-medium mb-1">Custom Notes / Payment Terms</label>
                                        <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={2} className="form-input w-full resize-none text-sm" placeholder="Any special terms..." />
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button onClick={() => setShowPreview(!showPreview)} className="btn-secondary flex-1 py-3 justify-center lg:hidden">
                                {showPreview ? 'Hide Preview' : 'Show Document'}
                            </button>
                            <button onClick={handlePrint} className="btn-primary flex-1 py-3 justify-center">
                                <Printer className="w-5 h-5 mr-2" /> Print Proposal
                            </button>
                        </div>
                    </div>

                    {/* Preview Section (Document Renderer) */}
                    <div className={`lg:col-span-7 ${showPreview ? 'block' : 'hidden lg:block'}`}>
                        <div className="h-[85vh] overflow-y-auto custom-scrollbar rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 shadow-inner p-4 md:p-8">

                            <div ref={printRef} className="bg-white mx-auto shadow-sm print:shadow-none print:m-0" id="quotation-document" style={{ width: '100%', maxWidth: '210mm', minHeight: '297mm' }}>

                                {/* A4 Page 1: Cover Header */}
                                <div className="page-break-after p-8 md:p-12 border-b-8 border-bvm-blue">
                                    <div className="flex justify-between items-start mb-12">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">BVM INDUSTRIES</h1>
                                            <p className="text-bvm-blue font-medium mt-1">Precision Engineering for Aseptic Packaging Solutions</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-12">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center underline">TECHNO-COMMERCIAL OFFER</h2>
                                        <table className="w-full text-sm text-gray-800">
                                            <tbody>
                                                <tr><td className="py-2 font-semibold w-32">Client</td><td className="py-2">: {formData.clientCompany || '[CLIENT COMPANY]'}</td></tr>
                                                <tr><td className="py-2 font-semibold">Date</td><td className="py-2">: {formatDate(formData.quotationDate)}</td></tr>
                                                <tr><td className="py-2 font-semibold">Scope</td><td className="py-2">: {formData.projectScope}</td></tr>
                                                <tr><td className="py-2 font-semibold">Offer No.</td><td className="py-2">: {formData.quotationNumber}</td></tr>
                                                <tr><td className="py-2 font-semibold">Model</td><td className="py-2">: {formData.modelNumber}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="space-y-4 text-gray-800 text-sm leading-relaxed">
                                        <h3 className="font-bold underline pb-2">Subject: Quotation for {formData.productName}</h3>
                                        <p>Dear Sir / Madam,</p>
                                        <p>We thank you for your interest in BVM Industries and for the opportunity to submit our techno-commercial offer for your requirement of {formData.productName}.</p>
                                        <p>We are pleased to submit our technical and commercial proposal for your review. This offer has been prepared based on the available requirement details and applicable project scope. In case of any clarification, our team will be glad to assist.</p>
                                        <br />
                                        <p>Regards,</p>
                                        <p className="font-bold pt-4">For BVM Industries</p>
                                        <p className="font-bold">Authorized Signatory</p>
                                    </div>
                                </div>

                                {/* A4 Page 2: Table of Contents & Intro */}
                                <div className="page-break-after p-8 md:p-12">
                                    <h2 className="text-lg font-bold bg-bvm-blue text-white p-2 mb-6">Contents</h2>
                                    <table className="w-full text-sm text-gray-800 mb-12 border border-gray-200">
                                        <thead><tr className="bg-gray-100"><th className="text-left p-2 border-b">Sr. No.</th><th className="text-left p-2 border-b">Item</th></tr></thead>
                                        <tbody>
                                            <tr className="border-b"><td className="p-2">1</td><td className="p-2">Introduction – BVM Industries</td></tr>
                                            <tr className="border-b"><td className="p-2">2</td><td className="p-2">Production / Application Details</td></tr>
                                            <tr className="border-b"><td className="p-2">3</td><td className="p-2">Utility / Environment Requirements</td></tr>
                                            <tr className="border-b"><td className="p-2">4</td><td className="p-2">Machine / Product Details & Specifications</td></tr>
                                            <tr className="border-b"><td className="p-2">5</td><td className="p-2">Commercial Quotation</td></tr>
                                            <tr><td className="p-2">6</td><td className="p-2">Terms and Conditions</td></tr>
                                        </tbody>
                                    </table>

                                    <h2 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-bvm-blue text-gray-900">1. Introduction – BVM Industries</h2>
                                    <p className="text-sm text-gray-800 mb-8 leading-relaxed">
                                        BVM Industries is a manufacturer of pharmaceutical packaging machinery and precision engineering solutions. We design and supply Blow Fill Seal Machines, Form Fill Seal Machines, Euro Cap Sealing Machines, precision moulds, refurbishment solutions, and turnkey project systems for regulated production environments.
                                    </p>

                                    <h2 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-bvm-blue text-gray-900">2. Production / Application Details</h2>
                                    <ul className="list-disc pl-5 text-sm text-gray-800 space-y-2 mb-8">
                                        <li><strong>Product / Application:</strong> {formData.productionApp}</li>
                                        <li><strong>Fill Volume:</strong> {formData.fillVolume}</li>
                                        <li><strong>Container Type:</strong> {formData.containerType}</li>
                                        <li><strong>Mould Design:</strong> As per approved URS / drawing / final customer confirmation</li>
                                        <li><strong>Mould Material:</strong> {formData.mouldMaterial}</li>
                                        <li><strong>Product Output:</strong> {formData.productOutput}</li>
                                        <li><strong>Packaging Material:</strong> {formData.packagingMaterial}</li>
                                        <li><strong>Product Characteristics:</strong> {formData.productCharacteristics}</li>
                                    </ul>
                                </div>

                                {/* A4 Page 3: Technical Specs */}
                                <div className="page-break-after p-8 md:p-12">
                                    <h2 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-bvm-blue text-gray-900">3. Utility / Environment Requirements</h2>
                                    <table className="w-full text-sm text-gray-800 border border-gray-300 mb-8 font-mono text-xs">
                                        <thead><tr className="bg-gray-100 border-b"><th className="p-2 text-left w-12 border-r">No.</th><th className="p-2 text-left border-r">Description</th><th className="p-2 text-left">Requirement</th></tr></thead>
                                        <tbody>
                                            <tr className="border-b"><td className="p-2 border-r">1</td><td className="p-2 border-r">Compressed Air Supply with FRL</td><td className="p-2 text-gray-400">Client spec</td></tr>
                                            <tr className="border-b"><td className="p-2 border-r">2</td><td className="p-2 border-r">Chiller for mould</td><td className="p-2 text-gray-400">Client spec</td></tr>
                                            <tr className="border-b"><td className="p-2 border-r">3</td><td className="p-2 border-r">Cooling water for barrel cooling</td><td className="p-2 text-gray-400">Client spec</td></tr>
                                            <tr className="border-b"><td className="p-2 border-r">4</td><td className="p-2 border-r">Electricity</td><td className="p-2 text-gray-400">415V, 3-Phase, 50Hz</td></tr>
                                            <tr><td className="p-2 border-r">5</td><td className="p-2 border-r">Pure Steam / SIP (If applicable)</td><td className="p-2 text-gray-400">Process dependent</td></tr>
                                        </tbody>
                                    </table>

                                    <h2 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-bvm-blue text-gray-900">4. Material of Construction</h2>
                                    <table className="w-full text-sm text-gray-800 border border-gray-300 mb-8 font-mono text-xs">
                                        <thead><tr className="bg-gray-100 border-b"><th className="p-2 text-left w-12 border-r">No.</th><th className="p-2 text-left border-r">Item</th><th className="p-2 text-left">Material / Specification</th></tr></thead>
                                        <tbody>
                                            <tr className="border-b"><td className="p-2 border-r">1</td><td className="p-2 border-r">Machine Frame</td><td className="p-2">SS304 Covered</td></tr>
                                            <tr className="border-b"><td className="p-2 border-r">2</td><td className="p-2 border-r">Filling Unit and Nozzles</td><td className="p-2 font-bold text-bvm-blue">SS316L</td></tr>
                                            <tr className="border-b"><td className="p-2 border-r">3</td><td className="p-2 border-r">CIP / SIP / Product Contact Pipes</td><td className="p-2 font-bold text-bvm-blue">SS316L</td></tr>
                                            <tr className="border-b"><td className="p-2 border-r">4</td><td className="p-2 border-r">Non-Product Contact Parts</td><td className="p-2">SS304</td></tr>
                                            <tr><td className="p-2 border-r">5</td><td className="p-2 border-r">Moulds</td><td className="p-2">{formData.mouldMaterial}</td></tr>
                                        </tbody>
                                    </table>

                                    <h2 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-bvm-blue text-gray-900">5. Commercial Quotation</h2>
                                    <table className="w-full text-sm text-gray-800 border border-gray-300 mb-4">
                                        <thead>
                                            <tr className="bg-gray-100 border-b text-left">
                                                <th className="p-2 border-r">S.No</th>
                                                <th className="p-2 border-r">Description</th>
                                                <th className="p-2 border-r text-center">Qty</th>
                                                <th className="p-2 border-r text-right">Unit Price</th>
                                                <th className="p-2 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.items.map((item, idx) => (
                                                <tr key={item.id} className="border-b">
                                                    <td className="p-2 border-r">{idx + 1}</td>
                                                    <td className="p-2 border-r">{item.description || '-'}</td>
                                                    <td className="p-2 border-r text-center">{item.quantity}</td>
                                                    <td className="p-2 border-r text-right">{formatCurrency(item.unitPrice)}</td>
                                                    <td className="p-2 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                                                </tr>
                                            ))}
                                            <tr className="border-t-2 border-gray-400">
                                                <td colSpan={4} className="p-2 text-right font-bold">Subtotal</td>
                                                <td className="p-2 text-right font-bold">{formatCurrency(calculateSubtotal())}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4} className="p-2 text-right">GST @ 18%</td>
                                                <td className="p-2 text-right">{formatCurrency(calculateGST())}</td>
                                            </tr>
                                            <tr className="bg-gray-100">
                                                <td colSpan={4} className="p-3 text-right font-extrabold">GRAND TOTAL</td>
                                                <td className="p-3 text-right font-extrabold text-bvm-blue">{formatCurrency(calculateTotal())}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <h2 className="text-lg font-bold bg-gray-100 p-2 mt-8 mb-4 border-l-4 border-bvm-blue text-gray-900">6. Terms and Conditions</h2>
                                    <ul className="list-disc pl-5 text-xs text-gray-700 space-y-2">
                                        <li><strong>Prices:</strong> Ex-Works Baddi, Himachal Pradesh.</li>
                                        <li><strong>Taxes:</strong> GST/IGST extra as applicable (Calculated at 18%).</li>
                                        <li><strong>Payment:</strong> 30% advance along with PO, 70% against PI before dispatch.</li>
                                        <li><strong>Delivery:</strong> 12-16 weeks from receipt of advance and approved drawings.</li>
                                        <li><strong>Warranty:</strong> 12 months from commissioning against manufacturing defects.</li>
                                        {formData.notes && <li className="text-red-700 mt-2 font-medium"><strong>Special Note:</strong> {formData.notes}</li>}
                                    </ul>
                                </div>

                                {/* A4 Footer (Repeats internally if printed, but statically placed at bottom for web preview) */}
                                <div className="border-t-2 border-gray-200 p-6 flex flex-wrap gap-4 text-xs justify-between text-gray-500 bg-white">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Plot No. 774/496/46, Village Gullarwala, Baddi, H.P. 173205</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 7018231499</span>
                                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> sales@mybvm.in</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Specific CSS to make it look like an actual A4 document */}
            <style>{`
                .form-input {
                    padding: 0.625rem 0.875rem;
                    border-radius: 0.5rem;
                    border: 1px solid rgba(156, 163, 175, 0.3);
                    background-color: rgb(243 244 246);
                    color: #111827;
                    transition: all 0.2s;
                }
                .form-input:focus {
                    outline: none;
                    border-color: #0c51cf;
                    ring: 2px;
                }
                .dark .form-input {
                    background-color: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                @media print {
                    body * { visibility: hidden; }
                    #quotation-document, #quotation-document * { visibility: visible; }
                    #quotation-document {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        max-width: none !important;
                    }
                    .page-break-after {
                        page-break-after: always;
                    }
                }
                
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.5); border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); }
            `}</style>
        </div>
    );
};

export default QuotationPage;
