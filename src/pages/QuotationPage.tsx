import { useState, useRef } from 'react';
import {
    FileText,
    Phone,
    Mail,
    MapPin,
    Printer,
    Plus,
    Trash2,
    ChevronDown
} from 'lucide-react';
import { products } from '../data/products';

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
    items: QuotationItem[];
    notes: string;
}

// SHA-256 hash of admin password — never store plaintext in bundle
const ADMIN_HASH = '18d3c013b79667d6308dd11c53d33252882832a33c852a6b2992722051951109';

const hashPassword = async (pwd: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pwd + 'bvm_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const QuotationPage = () => {
    const printRef = useRef<HTMLDivElement>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('bvm_quotation_auth') === 'true';
    });
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;

        const hashed = await hashPassword(password);
        if (hashed === ADMIN_HASH) {
            setIsAuthenticated(true);
            sessionStorage.setItem('bvm_quotation_auth', 'true');
            setAuthError('');
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 3) {
                setIsLocked(true);
                setAuthError('Too many attempts. Locked for 30 seconds.');
                setTimeout(() => { setIsLocked(false); setAttempts(0); setAuthError(''); }, 30000);
            } else {
                setAuthError(`Incorrect password. ${3 - newAttempts} attempts remaining.`);
            }
        }
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-bvm-navy flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-bvm-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-bvm-blue" />
                        </div>
                        <h1 className="text-2xl font-display font-bold text-white mb-2">Internal Access</h1>
                        <p className="text-bvm-gray text-sm">This tool is for BVM staff only. Enter your password to continue.</p>
                    </div>
                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                            {authError && <p className="text-red-400 text-sm mt-2">{authError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-bvm-blue text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Access Quotation Tool
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const [formData, setFormData] = useState<QuotationFormData>({
        clientName: '',
        clientCompany: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',
        quotationNumber: `BVM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        quotationDate: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
            { id: '1', description: '', quantity: 1, unitPrice: 0 }
        ],
        notes: ''
    });

    const [showPreview, setShowPreview] = useState(false);

    const calculateSubtotal = () => {
        return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    };

    const calculateGST = () => {
        return calculateSubtotal() * 0.18;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateGST();
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 }]
        }));
    };

    const removeItem = (id: string) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== id)
            }));
        }
    };

    const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="page-container">
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="headline-lg text-gray-900 dark:text-white mb-4">Generate Quotation</h1>
                    <p className="body-text max-w-2xl text-gray-600 dark:text-bvm-gray">
                        Create a professional quotation for your clients. Fill in the details below and preview before printing or downloading.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="card-dark p-6 space-y-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-bvm-blue" />
                            Quotation Details
                        </h2>

                        {/* Client Information */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-bvm-gray uppercase tracking-wider">
                                Client Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Contact Person <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.clientName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                        placeholder="e.g., Mr. John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.clientCompany}
                                        onChange={(e) => setFormData(prev => ({ ...prev, clientCompany: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                        placeholder="e.g., ABC Pharmaceuticals Pvt. Ltd."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={formData.clientAddress}
                                    onChange={(e) => setFormData(prev => ({ ...prev, clientAddress: e.target.value }))}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors resize-none"
                                    placeholder="Full address including city and pincode"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.clientPhone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.clientEmail}
                                        onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                        placeholder="client@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quotation Meta */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-bvm-gray uppercase tracking-wider">
                                Quotation Reference
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Quotation No.
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.quotationNumber}
                                        onChange={(e) => setFormData(prev => ({ ...prev, quotationNumber: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.quotationDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, quotationDate: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                        Valid Until
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.validUntil}
                                        onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-bvm-gray uppercase tracking-wider">
                                    Items / Products
                                </h3>
                                <button
                                    onClick={addItem}
                                    className="flex items-center gap-1 text-bvm-blue hover:text-bvm-blue-dark transition-colors text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Item
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.items.map((item) => (
                                    <div key={item.id} className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4">
                                        <div className="grid md:grid-cols-12 gap-3">
                                            <div className="md:col-span-6">
                                                <label className="block text-gray-900 dark:text-white text-xs font-medium mb-1">
                                                    Description
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            updateItem(item.id, 'description', e.target.value);
                                                        }}
                                                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-bvm-blue transition-colors appearance-none"
                                                    >
                                                        <option value="" className="bg-bvm-navy">Select a product...</option>
                                                        {products.map(product => (
                                                            <option key={product.id} value={product.name} className="bg-bvm-navy">
                                                                {product.name}
                                                            </option>
                                                        ))}
                                                        <option value="custom" className="bg-bvm-navy">Custom Item...</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bvm-gray pointer-events-none" />
                                                </div>
                                                {item.description === 'custom' && (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter custom description"
                                                        className="w-full mt-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                                                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                    />
                                                )}
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-gray-900 dark:text-white text-xs font-medium mb-1">
                                                    Qty
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                                                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-bvm-blue transition-colors"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-gray-900 dark:text-white text-xs font-medium mb-1">
                                                    Unit Price (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.unitPrice}
                                                    onChange={(e) => updateItem(item.id, 'unitPrice', parseInt(e.target.value) || 0)}
                                                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-bvm-blue transition-colors"
                                                />
                                            </div>
                                            <div className="md:col-span-1 flex items-end">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    disabled={formData.items.length === 1}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-right text-sm text-bvm-gray">
                                            Amount: <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(item.quantity * item.unitPrice)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="bg-bvm-blue/10 dark:bg-bvm-blue/10 border border-bvm-blue/20 rounded-lg p-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-500 dark:text-bvm-gray">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900 dark:text-white">{formatCurrency(calculateSubtotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 dark:text-bvm-gray">
                                        <span>GST (18%)</span>
                                        <span className="text-gray-900 dark:text-white">{formatCurrency(calculateGST())}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-900 dark:text-white font-semibold text-lg pt-2 border-t border-gray-200 dark:border-white/10">
                                        <span>Total</span>
                                        <span className="text-bvm-blue">{formatCurrency(calculateTotal())}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-gray-900 dark:text-white text-sm font-medium mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors resize-none"
                                placeholder="Any special terms, conditions, or notes for this quotation..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                {showPreview ? 'Hide Preview' : 'Show Preview'}
                            </button>
                            <button
                                onClick={handlePrint}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <Printer className="w-4 h-4" />
                                Print Quotation
                            </button>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-24">
                            <div
                                ref={printRef}
                                className="bg-white rounded-xl shadow-xl overflow-hidden print:shadow-none"
                                id="quotation-preview"
                            >
                                {/* Quotation Header */}
                                <div className="bg-gradient-to-r from-bvm-blue to-blue-600 text-white p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-2xl font-bold">BVM INDUSTRIES</h1>
                                            <p className="text-yellow-300 text-xs mt-1 italic">When quality matters, choose us!</p>
                                        </div>
                                        <div className="text-right text-sm">
                                            <div className="bg-white/20 rounded-lg px-4 py-2">
                                                <div className="font-semibold text-lg">QUOTATION</div>
                                                <div className="text-blue-100 text-xs">{formData.quotationNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-blue-100">
                                        <div className="flex items-center gap-1">
                                            <Phone className="w-3 h-3" />
                                            7010231499
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            bvmengineeringindustries@gmail.com
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            Baddi, H.P.
                                        </div>
                                    </div>
                                </div>

                                {/* Quotation Body */}
                                <div className="p-6 space-y-6 text-gray-800">
                                    {/* Meta Info */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-gray-500 text-xs mb-1">Date</div>
                                            <div className="font-medium">{formatDate(formData.quotationDate)}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-500 text-xs mb-1">Valid Until</div>
                                            <div className="font-medium">{formatDate(formData.validUntil)}</div>
                                        </div>
                                    </div>

                                    {/* Client Info */}
                                    <div className="border-l-4 border-bvm-blue pl-4">
                                        <div className="text-gray-500 text-xs mb-1">TO:</div>
                                        <div className="font-semibold text-lg">{formData.clientCompany || 'Client Company Name'}</div>
                                        {formData.clientName && (
                                            <div className="text-sm">Attn: {formData.clientName}</div>
                                        )}
                                        {formData.clientAddress && (
                                            <div className="text-sm text-gray-600 mt-1">{formData.clientAddress}</div>
                                        )}
                                    </div>

                                    {/* Subject */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-sm text-gray-500">Subject:</div>
                                        <div className="font-semibold">Quotation for Machinery & Equipment</div>
                                    </div>

                                    {/* Items Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="px-3 py-2 text-left font-semibold">S.No</th>
                                                    <th className="px-3 py-2 text-left font-semibold">Description</th>
                                                    <th className="px-3 py-2 text-center font-semibold">Qty</th>
                                                    <th className="px-3 py-2 text-right font-semibold">Unit Price</th>
                                                    <th className="px-3 py-2 text-right font-semibold">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.items.map((item, index) => (
                                                    <tr key={item.id} className="border-b border-gray-100">
                                                        <td className="px-3 py-2">{index + 1}</td>
                                                        <td className="px-3 py-2">{item.description || '-'}</td>
                                                        <td className="px-3 py-2 text-center">{item.quantity}</td>
                                                        <td className="px-3 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                                                        <td className="px-3 py-2 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="border-t-2 border-gray-200">
                                                    <td colSpan={4} className="px-3 py-2 text-right font-medium">Subtotal</td>
                                                    <td className="px-3 py-2 text-right font-medium">{formatCurrency(calculateSubtotal())}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className="px-3 py-2 text-right text-gray-600">GST @ 18%</td>
                                                    <td className="px-3 py-2 text-right">{formatCurrency(calculateGST())}</td>
                                                </tr>
                                                <tr className="bg-bvm-blue text-white">
                                                    <td colSpan={4} className="px-3 py-3 text-right font-bold">Total Amount</td>
                                                    <td className="px-3 py-3 text-right font-bold text-lg">{formatCurrency(calculateTotal())}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    {/* Terms & Conditions */}
                                    <div className="text-xs text-gray-600 space-y-2">
                                        <div className="font-semibold text-gray-800">Terms & Conditions:</div>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Prices are Ex-Works, Baddi, Himachal Pradesh</li>
                                            <li>GST @ 18% is applicable as per Government norms</li>
                                            <li>Delivery: 120-150 days from order confirmation</li>
                                            <li>Payment: 30% advance, 70% against PI before dispatch</li>
                                            <li>Installation support available on request</li>
                                            <li>This quotation is valid for 30 days from date of issue</li>
                                        </ul>
                                    </div>

                                    {/* Notes */}
                                    {formData.notes && (
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                                            <div className="font-semibold text-yellow-800">Notes:</div>
                                            <div className="text-yellow-700 mt-1">{formData.notes}</div>
                                        </div>
                                    )}

                                    {/* Signature */}
                                    <div className="pt-8 flex justify-between items-end">
                                        <div className="text-xs text-gray-500">
                                            <p>Thank you for your interest in BVM Industries.</p>
                                            <p>We look forward to serving you!</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-32 border-b border-gray-400 mb-2"></div>
                                            <div className="text-xs font-semibold">Authorized Signatory</div>
                                            <div className="text-xs text-gray-500">BVM Industries</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-100 px-6 py-3 text-center text-xs text-gray-500">
                                    Plot No. 774/496/46, Village Gullarwala, Baddi, Distt. Solan, H.P. - 173205 | GST: 02GNLPS7342F1ZS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #quotation-preview, #quotation-preview * {
            visibility: visible;
          }
          #quotation-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
          }
          .page-container {
            padding: 0 !important;
            background: white !important;
          }
        }
      `}</style>
        </div>
    );
};

export default QuotationPage;
