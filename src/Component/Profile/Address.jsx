import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress, getUserAddress, deleteAddress } from '../State/Address/Action';

const Address = () => {
    const dispatch = useDispatch();
    const { addresses, loading, error } = useSelector((store) => store.address);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        country: 'India',
        pincode: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch addresses when component mounts
    useEffect(() => {
        dispatch(getUserAddress());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.street.trim()) {
            errors.street = 'Street address is required';
        }
        if (!formData.city.trim()) {
            errors.city = 'City is required';
        }
        if (!formData.state.trim()) {
            errors.state = 'State is required';
        }
        if (!formData.pincode.trim()) {
            errors.pincode = 'Postal code is required';
        }
        
        return errors;
    };

    const handleSaveAddress = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        try {
            await dispatch(createAddress(formData));
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to create address:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await dispatch(deleteAddress(addressId));
            } catch (error) {
                console.error('Failed to delete address:', error);
            }
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({
            street: '',
            city: '',
            state: '',
            country: 'India',
            pincode: ''
        });
        setFormErrors({});
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-0">
                        My Addresses
                    </h2>
                    <button
                        onClick={() => setOpenDialog(true)}
                        disabled={loading}
                        className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
                    >
                        <span className="mr-2 text-xl">+</span>
                        Add New Address
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && !addresses.length ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="text-white text-lg">Loading addresses...</div>
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-lg mb-4">No addresses found</div>
                        <div className="text-gray-500">Add your first address to get started!</div>
                    </div>
                ) : (
                    /* Address Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addresses.map((address) => (
                            <div 
                                key={address.id} 
                                className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-pink-500/50"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="bg-pink-600/20 p-2 rounded-lg mr-3">
                                            <span className="text-pink-400 text-lg">🏠</span>
                                        </div>
                                        <h3 className="font-semibold text-white text-lg">Home</h3>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleDeleteAddress(address.id)}
                                            disabled={loading}
                                            className="text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {address.street}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        {address.city}, {address.state}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        {address.pincode} - India 
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Dialog Modal */}
                {openDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-800">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-800">
                                <h3 className="text-xl font-semibold text-white">
                                    Add New Address
                                </h3>
                            </div>
                            
                            {/* Modal Body */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Enter street address"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                                            formErrors.street ? 'border-red-500' : 'border-gray-700'
                                        }`}
                                        required
                                    />
                                    {formErrors.street && (
                                        <p className="text-red-400 text-sm mt-1">{formErrors.street}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                                            formErrors.city ? 'border-red-500' : 'border-gray-700'
                                        }`}
                                        required
                                    />
                                    {formErrors.city && (
                                        <p className="text-red-400 text-sm mt-1">{formErrors.city}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="Enter state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                                                formErrors.state ? 'border-red-500' : 'border-gray-700'
                                            }`}
                                            required
                                        />
                                        {formErrors.state && (
                                            <p className="text-red-400 text-sm mt-1">{formErrors.state}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Postal Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder="Enter postal code"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                                                formErrors.pincode ? 'border-red-500' : 'border-gray-700'
                                            }`}
                                            required
                                        />
                                        {formErrors.pincode && (
                                            <p className="text-red-400 text-sm mt-1">{formErrors.pincode}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Enter country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            
                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-800 flex justify-end space-x-3">
                                <button
                                    onClick={handleCloseDialog}
                                    disabled={isSubmitting}
                                    className="px-6 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveAddress}
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-pink-500/25"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Address;