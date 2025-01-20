import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Mail, MessageSquare, User } from 'lucide-react';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        alert('Thank you for your message! We will get back to you soon.');
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    return (_jsx("div", { className: "bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Contact Us" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Have questions about Ratso? We're here to help! Send us a message and we'll get back to you as soon as possible." })] }), _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsx("div", { className: "bg-white rounded-2xl shadow-lg p-8", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "name", className: "flex items-center text-sm font-medium text-gray-700 mb-1", children: [_jsx(User, { className: "w-4 h-4 mr-2 text-indigo-600" }), "Your Name"] }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", placeholder: "John Doe" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "email", className: "flex items-center text-sm font-medium text-gray-700 mb-1", children: [_jsx(Mail, { className: "w-4 h-4 mr-2 text-indigo-600" }), "Email Address"] }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", placeholder: "john@example.com" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "message", className: "flex items-center text-sm font-medium text-gray-700 mb-1", children: [_jsx(MessageSquare, { className: "w-4 h-4 mr-2 text-indigo-600" }), "Your Message"] }), _jsx("textarea", { id: "message", name: "message", value: formData.message, onChange: handleChange, required: true, rows: 6, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", placeholder: "How can we help you?" })] }), _jsx("button", { type: "submit", className: "w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200", children: "Send Message" })] }) }), _jsxs("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Email" }), _jsx("p", { className: "mt-2 text-gray-600", children: "support@solrat.xyz" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Location" }), _jsx("p", { className: "mt-2 text-gray-600", children: "San Francisco, CA" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Hours" }), _jsx("p", { className: "mt-2 text-gray-600", children: "Mon-Fri: 9AM - 6PM PST" })] })] })] })] }) }));
};
export default Contact;
